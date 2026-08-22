import { HeroSection } from "@/components/hero/HeroSection";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhatIBuild } from "@/components/sections/WhatIBuild";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { EngineeringSection } from "@/components/sections/EngineeringSection";
import { AIEngineeringLab } from "@/components/sections/AIEngineeringLab";
import { CareerTimeline } from "@/components/timeline/CareerTimeline";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CredibilityStrip />
      <AboutSection />
      <WhatIBuild />
      <ProjectsSection />
      <EngineeringSection />
      <AIEngineeringLab />
      <CareerTimeline />
      <GitHubSection />
      <ContactSection />
    </>
  );
}
