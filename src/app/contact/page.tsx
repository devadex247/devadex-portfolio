import { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Adekunle AbdulMuheez — Software + AI Engineer.",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <div className="container" style={{ paddingBottom: "40px" }}>
        <SectionHeader
          eyebrow="// connect"
          title="Start a system."
          subtitle="Deploy a message to my inbox, or check out my handles on GitHub, LinkedIn, and Twitter."
        />
      </div>

      <ContactSection />
    </div>
  );
}
