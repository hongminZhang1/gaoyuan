import Image from "next/image";
import Link from "next/link";
import { Activity, Map, ShieldCheck, Mountain, BookOpen, HeartPulse } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full flex-col flex items-center bg-gray-50 pb-20">
      {/* 1. Hero 顶部大图区域 */}
      <div className="w-full relative h-[400px] md:h-[600px] flex items-center justify-center">
         <Image 
            src="/img/01.webp.jpg" 
            alt="高原壮美风光" 
            fill 
            priority 
            sizes="100vw" 
            className="object-cover" 
         />
         <div className="absolute inset-0 bg-black/40 z-10" /> {/* 深色遮罩提升文字可读性 */}
         
         <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              云端之境，安全随行
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-10 drop-shadow-md">
              探索青藏高原的绝美风光，从科学、专业的健康评估开始。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/health/evaluate" className="bg-[#d9bb79] hover:bg-[#c6a765] text-[#1c3c66] font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center">
                <HeartPulse className="w-5 h-5 mr-2" />
                健康评估
              </Link>
              <Link href="/travel/route" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center">
                <Mountain className="w-5 h-5 mr-2" />
                探索路线
              </Link>
            </div>
         </div>
      </div>

      {/* 2. 核心功能服务区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-50px] relative z-30 w-full mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-xl p-8 transform transition-transform hover:-translate-y-2 border-t-4 border-[#d9bb79]">
            <div className="bg-[#1c3c66] w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Activity className="w-8 h-8 text-[#d9bb79]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1c3c66] mb-4">科学健康评估</h3>
            <p className="text-gray-600 mb-6">
              结合多项医学参考指标与您的身体状况，系统分析您前往高海拔地区的潜在风险，提供专业的出行建议。
            </p>
            <Link href="/health/evaluate" className="text-[#1c3c66] font-semibold flex items-center group">
              开始自测 <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 transform transition-transform hover:-translate-y-2 border-t-4 border-[#d9bb79]">
            <div className="bg-[#1c3c66] w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8 text-[#d9bb79]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1c3c66] mb-4">行前防范指南</h3>
            <p className="text-gray-600 mb-6">
              从体能储备、物资准备到防风保暖，为您提供最实用的高原旅行防备常识，最大程度降低高反发生率。
            </p>
            <Link href="/health/study" className="text-[#1c3c66] font-semibold flex items-center group">
              学习指南 <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 transform transition-transform hover:-translate-y-2 border-t-4 border-[#d9bb79]">
            <div className="bg-[#1c3c66] w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Map className="w-8 h-8 text-[#d9bb79]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1c3c66] mb-4">深度定级路线</h3>
            <p className="text-gray-600 mb-6">
              根据海拔爬升规律与身体适应周期，精选并对多条西藏/川西路线进行难度分级，助您匹配最适合的旅程。
            </p>
            <Link href="/travel/route" className="text-[#1c3c66] font-semibold flex items-center group">
              查看路线 <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. 为什么选择我们（专业性信任背书） */}
      <div className="w-full bg-[#1c3c66] py-16 text-center text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#d9bb79]">专为高原出行设计的防护保障</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 突出路线地图 */}
            <Link href="/travel/route" className="flex flex-col items-center text-left group bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition-all border border-white/10 hover:border-[#d9bb79]/50 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#d9bb79]/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform"></div>
              <div className="bg-[#d9bb79]/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                 <Map className="w-8 h-8 text-[#d9bb79]" />
              </div>
              <h4 className="font-bold text-xl mb-3 text-white group-hover:text-[#d9bb79] transition-colors w-full text-center">海拔阶梯与路线地图</h4>
              <p className="text-sm text-gray-300 mb-6 text-center leading-relaxed flex-1">
                所有推荐路线均打磨过海拔跨度，结合交互式地图精湛引导，避免急剧拉升导致的重度高反。
              </p>
              <span className="text-[#d9bb79] text-sm font-semibold flex items-center mt-auto">
                探索路线地图 <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            {/* 突出量化评估 */}
            <Link href="/health/evaluate" className="flex flex-col items-center text-left group bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition-all border border-white/10 hover:border-[#d9bb79]/50 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#d9bb79]/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform"></div>
              <div className="bg-[#d9bb79]/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                 <Activity className="w-8 h-8 text-[#d9bb79]" />
              </div>
              <h4 className="font-bold text-xl mb-3 text-white group-hover:text-[#d9bb79] transition-colors w-full text-center">量化指标评估</h4>
              <p className="text-sm text-gray-300 mb-6 text-center leading-relaxed flex-1">
                细化BMI、年龄、血压等多项个人常规指标，为您提供独一无二的专属出行定制参考。
              </p>
              <span className="text-[#d9bb79] text-sm font-semibold flex items-center mt-auto">
                立即进行评估 <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            {/* 突出疾病干预（指向指南）*/}
            <Link href="/health/cure" className="flex flex-col items-center text-left group bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition-all border border-white/10 hover:border-[#d9bb79]/50 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#d9bb79]/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform"></div>
              <div className="bg-[#d9bb79]/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                 <ShieldCheck className="w-8 h-8 text-[#d9bb79]" />
              </div>
              <h4 className="font-bold text-xl mb-3 text-white group-hover:text-[#d9bb79] transition-colors w-full text-center">疾病一票否决</h4>
              <p className="text-sm text-gray-300 mb-6 text-center leading-relaxed flex-1">
                严格区分高原旅行的心血管、呼吸道等禁忌人群，用极其科学严谨的态度为您的生命安全兜底。
              </p>
              <span className="text-[#d9bb79] text-sm font-semibold flex items-center mt-auto">
                查看安全禁忌 <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            {/* 突出医疗文章 */}
            <Link href="/health/study" className="flex flex-col items-center text-left group bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition-all border border-white/10 hover:border-[#d9bb79]/50 shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-16 h-16 bg-[#d9bb79]/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform"></div>
              <div className="bg-[#d9bb79]/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                 <BookOpen className="w-8 h-8 text-[#d9bb79]" />
              </div>
              <h4 className="font-bold text-xl mb-3 text-white group-hover:text-[#d9bb79] transition-colors w-full text-center">医疗文献与干预</h4>
              <p className="text-sm text-gray-300 mb-6 text-center leading-relaxed flex-1">
                查集中外最新高原病干预研究文献，了解深层次致病机理，提供权威的用药指引与就医建议。
              </p>
              <span className="text-[#d9bb79] text-sm font-semibold flex items-center mt-auto">
                研读医疗文章 <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
