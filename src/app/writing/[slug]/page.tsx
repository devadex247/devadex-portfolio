import { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/content/writing";
import { ArticlePageContent } from "./ArticlePageContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((art) => ({ slug: art.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((art) => art.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: `${article.title} | Adekunle AbdulMuheez`,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((art) => art.slug === slug);
  if (!article) notFound();
  return <ArticlePageContent article={article} />;
}
