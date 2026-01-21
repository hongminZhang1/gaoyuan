import Link from "next/link";

export default function TravelPage() {
  const sections = [
    { title: "高原风光", bg: "bg-[#FFDEAD]", href: "/travel/scenery" }, // navajowhite
    { title: "环境特点", bg: "bg-white", href: "/travel/environment" },
    { title: "线路指南", bg: "bg-[#FFDEAD]", href: "/travel/route" },
    { title: "交通选择", bg: "bg-white", href: "/travel/traffic" },
  ];

  return (
    <div className="flex flex-col space-y-2 h-full">
      {sections.map((section, idx) => (
        <Link 
            key={idx} 
            href={section.href}
            className={`block w-full h-[200px] md:h-[300px] flex items-center justify-center text-3xl font-bold text-gray-800 ${section.bg} hover:opacity-90 transition-opacity shadow-sm border border-gray-100`}
        >
          {section.title}
        </Link>
      ))}
    </div>
  );
}
