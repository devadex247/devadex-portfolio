import { Metadata } from "next";
import { WorkPageContent } from "./WorkPageContent";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects built by Adekunle AbdulMuheez — AI systems, full-stack platforms, and intelligent software.",
};

export default function WorkPage() {
  return <WorkPageContent />;
}
