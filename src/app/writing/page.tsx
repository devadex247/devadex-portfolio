import { Metadata } from "next";
import { WritingPageContent } from "./WritingPageContent";

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical writing, tutorials, and engineering deep dives by Adekunle AbdulMuheez.",
};

export default function WritingPage() {
  return <WritingPageContent />;
}
