import Link from "next/link";
import { Mountain, Wind, Map, Bus } from "lucide-react";

export default function TravelPage() {
  const categories = [
    {
      title: "高原风光",
      desc: "收录青藏高原独特的地形地貌、冰川雪山与湖泊湿地的自然景观资源数据。",
      icon: <Mountain className="w-10 h-10 text-[#2E7D32]" />,
      href: "/travel/scenery",
      bgFrom: "from-[#F1F8E9]",
      bgTo: "to-white"
    },
    {
      title: "环境特点",
      desc: "气象、海拔、含氧量变化等关键环境指标的监测数据及空间分布特征。",
      icon: <Wind className="w-10 h-10 text-[#0288D1]" />,
      href: "/travel/environment",
      bgFrom: "from-[#E1F5FE]",
      bgTo: "to-white"
    },
    {
      title: "线路指南",
      desc: "推荐经典高原科考与旅游路线，结合海拔高度上升曲线保障行程安全。",
      icon: <Map className="w-10 h-10 text-[#F57C00]" />,
      href: "/travel/route",
      bgFrom: "from-[#FFF3E0]",
      bgTo: "to-white"
    },
    {
      title: "交通选择",
      desc: "全地形交通方式、航空与铁路交通节点的专业数据与高原适应性建议。",
      icon: <Bus className="w-10 h-10 text-[#5E35B1]" />,
      href: "/travel/traffic",
      bgFrom: "from-[#EDE7F6]",
      bgTo: "to-white"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 头部专业深邃风横幅 - 科技白蓝相间 */}
      <div className="bg-[#1E293B] text-white py-24 px-4 md:px-8 bg-[url('https://pic.homgzha.cc/pic/gy1.jpg')] bg-cover bg-center relative z-0">
        <div className="absolute inset-0 bg-[#0b2038]/80 mix-blend-multiply z-10"></div>
        <div className="max-w-6xl mx-auto relative z-20 border-l-4 border-[#4fc3f7] pl-6 md:pl-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider text-white">
            高原旅游与地理数据中心
          </h1>
          <p className="text-blue-100/90 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            依托国家级环境监测网络，提供精准的地理、气候、生态科学数据，助力安全探索自然之巅。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.href}
              className="group block rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 overflow-hidden bg-white"
            >
              <div className={`p-8 bg-gradient-to-b ${cat.bgFrom} ${cat.bgTo} h-full flex flex-col`}>
                <div className="mb-6 p-4 bg-white/60 rounded-full w-20 h-20 flex items-center justify-center shadow-sm border border-white/80 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  {cat.desc}
                </p>
                <div className="mt-auto text-sm font-semibold text-slate-500 flex items-center gap-1 group-hover:text-blue-600 transition-all">
                  查看详细 <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
