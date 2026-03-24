import Link from "next/link";

const articles = [
  { href: "/article/symptoms", title: "高原反应有哪些症状？", desc: "急性与慢性高原反应的典型症状及中医五脏分类归纳" },
];

export default function CurePage() {
  return (
    <div className="flex flex-col p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold border-b-2 pb-2 mb-6 border-[#3b82f6] text-[#2563eb]">
        高原反应与救治
      </h1>
      <ul className="flex flex-col space-y-3">
        {articles.map((a, i) => (
          <li key={i}>
            <Link
              href={a.href}
              className="group flex items-start gap-4 px-5 py-4 rounded border border-gray-200 bg-white hover:border-[#3b82f6] hover:shadow-md transition-all duration-200"
            >
              <span className="mt-1 shrink-0 w-2 h-2 rounded-full bg-[#2563eb] group-hover:bg-[#3b82f6] transition-colors" />
              <div className="flex flex-col min-w-0">
                <span className="text-base font-semibold text-[#2563eb] group-hover:text-[#3b82f6] transition-colors leading-snug">
                  {a.title}
                </span>
                <span className="mt-1 text-sm text-gray-500 leading-relaxed">{a.desc}</span>
              </div>
              <svg className="ml-auto shrink-0 mt-1 w-4 h-4 text-gray-300 group-hover:text-[#3b82f6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
