import Link from "next/link";

export default function HealthPage() {
  const sections = [
    { title: "高原反应研究文献汇集", bg: "bg-[#e6f0ff]", href: "/health/study" },
    { title: "高原反应与救治", bg: "bg-white", href: "/health/cure" },
    { title: "身体健康评估", bg: "bg-[#e6f0ff]", href: "/health/evaluate" },
  ];

  return (
    <div className="flex flex-col space-y-2 h-full">
      {sections.map((section, idx) => (
        <Link 
            key={idx} 
            href={section.href}
            className={`block w-full h-[200px] md:h-[300px] flex items-center justify-center text-2xl md:text-3xl font-bold text-gray-800 ${section.bg} hover:opacity-90 transition-opacity shadow-sm border border-gray-100 p-4 text-center`}
        >
          {section.title}
        </Link>
      ))}
    </div>
  );
}
