import { Metadata } from "next";
import { CareerTimeline } from "@/components/timeline/CareerTimeline";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Experience",
  description: "Career timeline, software deployments, and system integration history of Adekunle AbdulMuheez.",
};

export default function ExperiencePage() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <div className="container" style={{ paddingBottom: "40px" }}>
        <SectionHeader
          eyebrow="// system-log"
          title="Career progression."
          subtitle="A chronicle of deployed systems, production architectures, and roles initialized since 2022."
        />
      </div>

      <CareerTimeline />
      
      <div style={{ marginTop: "40px", borderBottom: "1px solid var(--border)" }}>
        <CredibilityStrip />
      </div>
    </div>
  );
}
