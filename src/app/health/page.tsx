import Link from "next/link";
import { Stethoscope, FileText, HeartPulse } from "lucide-react";

export default function HealthPage() {
  const sections = [
    {
      title: "高原反应研究文献",
      desc: "汇编最新关于高原缺氧环境下的生理机制及适应性研究的学术文献，为临床救治提供科学依据。",
      icon: <FileText className="w-12 h-12 text-[#1976D2] mb-6" />,
      href: "/health/study",
      bg: "bg-white",
    },
    {
      title: "高原反应与救治",
      desc: "针对急性高原病（AMS）、高原肺水肿（HAPE）等常见症状的预防、诊断标准及标准应急救治方案。",
      icon: <Stethoscope className="w-12 h-12 text-[#1976D2] mb-6" />,
      href: "/health/cure",
      bg: "bg-gray-50",
    },
    {
      title: "身体健康评估",
      desc: "基于多项生理指标（血氧、心率、血压）进入高原前后的健康动态评估模型预测系统。",
      icon: <HeartPulse className="w-12 h-12 text-[#1976D2] mb-6" />,
      href: "/health/evaluate",
      bg: "bg-white",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 头部专业蓝色背景横幅 */}
      <div className="bg-[#0b3b60] text-white py-20 px-4 md:px-8 border-b-4 border-[#1976D2] shadow-inner">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider text-white">高原健康守护</h1>
          <p className="text-blue-100 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            秉承严谨、科学、专业的医学态度，聚焦高原特殊环境下的生命健康，提供权威的研究数据与健康指导。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-[-40px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {sections.map((section, idx) => (
            <Link 
              key={idx} 
              href={section.href}
              className={`block rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${section.bg} overflow-hidden group`}
            >
              <div className="h-2 w-full bg-gradient-to-r from-[#1976D2] to-[#42A5F5]" />
              <div className="p-8 md:p-10 flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#0b3b60] mb-4">{section.title}</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {section.desc}
                </p>
                <div className="mt-8 text-sm font-semibold text-[#1976D2] flex items-center gap-1 group-hover:gap-2 transition-all">
                  进入专题 <span aria-hidden="true">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
