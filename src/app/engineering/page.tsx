import { Metadata } from "next";
import { EngineeringSection } from "@/components/sections/EngineeringSection";
import { AIEngineeringLab } from "@/components/sections/AIEngineeringLab";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Engineering",
  description: "AI engineering, backend software systems, and active laboratory experiments by Adekunle AbdulMuheez.",
};

export default function EngineeringPage() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <div className="container" style={{ paddingBottom: "40px" }}>
        <SectionHeader
          eyebrow="// engineering-manifesto"
          title="Intelligent systems."
          subtitle="I design software around data flows, robust backends, and modular AI integrations. Clean interfaces, sound infrastructure."
        />
      </div>

      <EngineeringSection />
      <AIEngineeringLab />
    </div>
  );
}
