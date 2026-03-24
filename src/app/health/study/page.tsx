import Link from "next/link";

const articles = [
  { href: "/article/cold",   title: "高原地区感冒",           desc: "感冒在高原地区的高发原因、症状表现与主动健康管理" },
  { href: "/article/oxygen", title: "高反吸氧，你要知道这些",  desc: "何时吸氧、去哪里吸氧以及吸氧的注意事项" },
  { href: "/article/asthma", title: "哮喘患者能不能去高原旅游", desc: "高原环境对哮喘的影响与哮喘患者出行建议" },
];

export default function StudyPage() {
  return (
    <div className="flex flex-col p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold border-b-2 pb-2 mb-6 border-[#3b82f6] text-[#2563eb]">
        高原反应研究文献汇集
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
