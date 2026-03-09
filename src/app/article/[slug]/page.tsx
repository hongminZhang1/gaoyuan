import { articles } from "@/lib/articles";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: PageProps) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-[740px] mx-auto py-2">
      <div className="bg-white rounded-sm overflow-hidden border border-gray-200 shadow-sm">
        {/* 顶部蓝色装饰条 */}
        <div className="h-[3px] bg-[#1c3c66]" />
        <div className="px-6 md:px-14 py-8 md:py-10 article-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
