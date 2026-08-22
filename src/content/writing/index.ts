export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string; // Markdown formatted content
}

export const articles: Article[] = [
  {
    slug: "agentic-rag-langgraph-fastapi",
    title: "Architecting Agentic RAG Systems with LangGraph and FastAPI",
    description: "A deep dive into building retrieval-augmented generation pipelines that use state charts to handle fallback retrieval, routing, and tool-calling loop controls.",
    date: "August 15, 2026",
    readTime: "8 min read",
    tags: ["AI", "RAG", "LangGraph", "FastAPI", "Python"],
    content: `
# Architecting Agentic RAG Systems with LangGraph and FastAPI

Retrieval-Augmented Generation (RAG) has evolved beyond simple vector search and single-prompt generation. Production-grade systems require decision-making loops, fallback strategies, and self-correcting mechanisms. 

In this deep dive, we'll build an **Agentic RAG Pipeline** using **LangGraph** for orchestration and control flow, combined with a **FastAPI** backend for a production-ready API.

---

## Why Agentic RAG?

Standard RAG architectures assume the search query is perfect and the retrieved documents are always relevant. When these assumptions fail, standard systems generate hallucinations or unhelpful answers.

Agentic RAG introduces loop controls:
1. **Query Router:** Decides whether Vector Search, Web Search, or direct LLM reasoning is needed.
2. **Document Grader:** Checks retrieved document chunks for relevance.
3. **Hallucination Grader:** Evaluates the generated response against document facts.
4. **Answer Grader:** Assesses whether the response answers the user query.

---

## Orchestrating the Graph with LangGraph

LangGraph models stateful, multi-actor applications as a graph (nodes and edges). This makes loops and conditional routing straightforward to define and test.

Let's look at the state definition and routing graph:

\`\`\`python
from typing import List, TypedDict
from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    question: str
    generation: str
    documents: List[str]
    web_search: bool

# Define nodes
workflow = StateGraph(AgentState)
workflow.add_node("retrieve", retrieve_docs)
workflow.add_node("grade_documents", grade_docs)
workflow.add_node("generate", generate_answer)
workflow.add_node("web_search", web_search_fallback)

# Build edges
workflow.set_entry_point("retrieve")
workflow.add_edge("retrieve", "grade_documents")
workflow.add_conditional_edges(
    "grade_documents",
    decide_to_generate,
    {
        "generate": "generate",
        "web_search": "web_search"
    }
)
workflow.add_edge("web_search", "generate")
workflow.add_conditional_edges(
    "generate",
    grade_generation,
    {
        "hallucination": "generate", # Retry generation
        "useful": END,
        "not_useful": "web_search"
      }
)
app = workflow.compile()
\`\`\`

### Step-by-Step Node Execution

- **\`retrieve\`**: Performs vector similarity search on our database (using Cosine Similarity on pgvector).
- **\`grade_documents\`**: Loops through all chunks and prompts an LLM to output \`yes\` or \`no\` depending on relevance. If any chunks are irrelevant, we trigger a \`web_search\` fallback.
- **\`generate\`**: Generates response based on valid document chunks.
- **\`grade_generation\`**: Double checks if generated output is factually grounded in the documents. If a hallucination is detected, the graph retraces its steps.

---

## Setting up FastAPI for Streaming Output

To deliver a premium UI experience, we want to stream our LLM response token-by-token. FastAPI supports Server-Sent Events (SSE) via the \`StreamingResponse\` wrapper.

\`\`\`python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

app = FastAPI()

class QueryRequest(BaseModel):
    question: str

@app.post("/api/chat")
async def chat_endpoint(req: QueryRequest):
    async def response_generator():
        # Iterate through graph steps asynchronously
        async for event in graph_app.astream({"question": req.question}):
            for node_name, state in event.items():
                if "generation" in state:
                    yield f"data: {state['generation']}\\n\\n"
                    
    return StreamingResponse(response_generator(), media_type="text/event-stream")
\`\`\`

---

## Production Takeaways

1. **Evaluation is Key:** Always run regression tests using tools like Ragas to evaluate retrieval accuracy and generation quality before deploying graph modifications.
2. **Context Compression:** Instead of dumping raw documents, use LLM compressors to extract key facts first, optimizing context window usage and reducing latency.
3. **Structured Tool Outputs:** Leverage Pydantic schemas in LangChain tool calling to ensure reliable inputs and outputs.
`,
  },
  {
    slug: "ai-augmented-healthcare-mews-audit-trails",
    title: "Building MEWS AI: Healthcare Integrity & Cryptographic Audit Trails",
    description: "How to engineer clinical decision systems that combine the Modified Early Warning Score (MEWS) with AI triage and tamper-proof audit histories.",
    date: "July 28, 2026",
    readTime: "10 min read",
    tags: ["Healthcare", "AI", "MEWS", "Cryptography", "Audit Trails"],
    content: `
# Building MEWS AI: Healthcare Integrity & Cryptographic Audit Trails

Clinical software systems demand absolute integrity. When an AI triages a patient or calculates health deterioration risks, the decision-making pipeline must be fully auditable, verifiable, and tamper-proof.

Here, we explore the architecture of **MedOS AI**, focusing on the integration of the **Modified Early Warning Score (MEWS)** engine, **AI clinical notes triage**, and a cryptographic **audit log system**.

---

## The Core MEWS Algorithm

The Modified Early Warning Score (MEWS) is a simple, clinically-validated score computed from vital signs:
- Systolic Blood Pressure
- Heart Rate
- Respiratory Rate
- Temperature
- Consciousness Level (AVPU)

A score $\\ge 5$ indicates high clinical risk, needing urgent clinical attention.

Here is the exact TypeScript implementation of the MEWS engine:

\`\`\`typescript
export interface Vitals {
  systolicBP: number;
  heartRate: number;
  respiratoryRate: number;
  temperature: number;
  consciousLevel: "A" | "V" | "P" | "U"; // Alert, Voice, Pain, Unresponsive
}

export function calculateMEWS(vitals: Vitals): number {
  let score = 0;

  // Systolic Blood Pressure
  if (vitals.systolicBP <= 70) score += 3;
  else if (vitals.systolicBP <= 80) score += 2;
  else if (vitals.systolicBP <= 100) score += 1;
  else if (vitals.systolicBP >= 200) score += 2;

  // Heart Rate
  if (vitals.heartRate <= 40) score += 3;
  else if (vitals.heartRate <= 50) score += 1;
  else if (vitals.heartRate >= 101 && vitals.heartRate <= 110) score += 1;
  else if (vitals.heartRate >= 111 && vitals.heartRate <= 129) score += 2;
  else if (vitals.heartRate >= 130) score += 3;

  // Respiratory Rate
  if (vitals.respiratoryRate < 9) score += 3;
  else if (vitals.respiratoryRate >= 15 && vitals.respiratoryRate <= 20) score += 1;
  else if (vitals.respiratoryRate >= 21 && vitals.respiratoryRate <= 29) score += 2;
  else if (vitals.respiratoryRate >= 30) score += 3;

  // Temperature
  if (vitals.temperature < 35.0) score += 2;
  else if (vitals.temperature >= 38.5) score += 2;

  // Conscious Level (AVPU)
  if (vitals.consciousLevel === "V") score += 1;
  else if (vitals.consciousLevel === "P") score += 2;
  else if (vitals.consciousLevel === "U") score += 3;

  return score;
}
\`\`\`

---

## AI-Augmented Triage Integration

While the vitals yield a numeric MEWS score, doctors' notes contain unstructured insights (e.g., "patient shows signs of mild confusion", "intermittent chest pain").

We run these clinical notes through a lightweight classification model or structured LLM tool to identify underlying indicators:

\`\`\`typescript
interface ClinicalTriageResult {
  criticalSymptoms: string[];
  severity: "LOW" | "MEDIUM" | "HIGH";
  suggestedDepartment: string;
  reasoning: string;
}

// Structured output configuration using LangChain Zod schemas
const triageSchema = z.object({
  criticalSymptoms: z.array(z.string()).describe("Symptoms suggesting urgent issues"),
  severity: z.enum(["LOW", "MEDIUM", "HIGH"]),
  suggestedDepartment: z.string(),
  reasoning: z.string(),
});
\`\`\`

---

## Cryptographic Audit Trails for Safety

To ensure that AI suggestions and MEWS inputs cannot be altered retrospectively (e.g., to shift liability after an adverse clinical event), every single decision is cryptographically chained.

We create a **linear blockchain audit trail** where each audit block includes:
1. **Timestamp** of the decision.
2. **Patient Identifier**.
3. **Input Data** (vitals, notes).
4. **Calculated MEWS** and AI triage decisions.
5. **Previous Block Hash**.
6. **SHA-256 Hash** of current block properties.

\`\`\`typescript
import { createHash } from "crypto";

export interface AuditBlock {
  index: number;
  timestamp: string;
  patientId: string;
  data: {
    mewsScore: number;
    aiSeverity: string;
    vitals: Vitals;
  };
  previousHash: string;
  hash: string;
}

export function calculateBlockHash(block: Omit<AuditBlock, "hash">): string {
  const payload = JSON.stringify({
    index: block.index,
    timestamp: block.timestamp,
    patientId: block.patientId,
    data: block.data,
    previousHash: block.previousHash,
  });
  return createHash("sha256").update(payload).digest("hex");
}
\`\`\`

## Compliance & Integration

By combining numeric indicators with AI triage and pinning them down under cryptographic hashing, this system meets **HIPAA audit logs standard** and establishes complete trust in automated critical warning platforms.
`,
  },
];
