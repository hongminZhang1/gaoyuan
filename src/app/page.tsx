import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { Activity, Map, ShieldCheck, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full flex-col flex items-center bg-gray-50 pb-20">
      <HeroCarousel />

      {/* 2. 核心功能服务区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-30px] sm:mt-[-50px] relative z-30 w-full mb-10 sm:mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 transform transition-transform hover:-translate-y-2 border-t-2 sm:border-t-4 border-blue-200 col-span-2 md:col-span-1 flex flex-row md:flex-col items-center md:items-start text-left">
            <div className="bg-blue-500 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center md:mb-6 mr-4 md:mr-0 shrink-0">
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-blue-600 mb-1 sm:mb-4">科学健康评估</h3>
              <p className="text-xs sm:text-base text-gray-600 mb-2 sm:mb-6 line-clamp-2 md:line-clamp-none">
                结合多项医学参考指标与您的身体状况，系统分析您前往高海拔地区的潜在风险，提供专业的出行建议。
              </p>
              <Link href="/health/evaluate" className="text-xs sm:text-base text-blue-600 font-semibold flex items-center group">
                开始自测 <span className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 transform transition-transform hover:-translate-y-2 border-t-2 sm:border-t-4 border-blue-200 flex flex-col items-start text-left">
            <div className="bg-blue-500 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-6">
              <BookOpen className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-base sm:text-2xl font-bold text-blue-600 mb-2 sm:mb-4">行前防范指南</h3>
            <p className="text-xs sm:text-base text-gray-600 mb-3 sm:mb-6 line-clamp-3 md:line-clamp-none flex-1">
              为您提供最实用的高原旅行防备常识，降低高反发生率。
            </p>
            <Link href="/health/study" className="text-xs sm:text-base text-blue-600 font-semibold flex items-center group mt-auto">
              学习指南 <span className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 transform transition-transform hover:-translate-y-2 border-t-2 sm:border-t-4 border-blue-200 flex flex-col items-start text-left">
            <div className="bg-blue-500 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-6">
              <Map className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-base sm:text-2xl font-bold text-blue-600 mb-2 sm:mb-4">深度定级路线</h3>
            <p className="text-xs sm:text-base text-gray-600 mb-3 sm:mb-6 line-clamp-3 md:line-clamp-none flex-1">
              结合适应周期，精选并对多条西藏/川西路线进行难度分级。
            </p>
            <Link href="/travel/route" className="text-xs sm:text-base text-blue-600 font-semibold flex items-center group mt-auto">
              查看路线 <span className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. 为什么选择我们（专业性信任背书） */}
      <div className="w-full bg-blue-50 py-6 sm:py-16 text-center text-slate-800">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-12 text-blue-800">专为高原出行设计的防护保障</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
            
            {/* 突出路线地图 */}
            <Link href="/travel/route" className="flex flex-col items-center text-center sm:text-left group bg-white p-3 sm:p-8 rounded-xl sm:rounded-2xl hover:bg-blue-50 transition-all border border-blue-100 hover:border-blue-300 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 sm:w-16 sm:h-16 bg-blue-100 rounded-bl-full -z-10 group-hover:scale-150 transition-transform"></div>
              <div className="bg-blue-500 p-2 sm:p-4 rounded-full mb-2 sm:mb-6 group-hover:scale-110 transition-transform">
                 <Map className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-bold text-sm sm:text-xl mb-1 sm:mb-3 text-slate-800 group-hover:text-blue-600 transition-colors w-full sm:text-center">路线地图</h4>
              <p className="text-[11px] sm:text-sm text-slate-600 mb-2 sm:mb-6 leading-tight sm:leading-relaxed flex-1 line-clamp-2 sm:line-clamp-none">
                所有推荐路线均打磨过海拔跨度，结合交互式地图精湛引导，避免重度高反。
              </p>
              <span className="text-blue-600 text-[11px] sm:text-sm font-semibold flex items-center mt-auto whitespace-nowrap">
                探索地图 <span className="ml-1 group-hover:translate-x-1 transition-transform hidden sm:inline-block">→</span>
              </span>
            </Link>

            {/* 突出量化评估 */}
            <Link href="/health/evaluate" className="flex flex-col items-center text-center sm:text-left group bg-white p-3 sm:p-8 rounded-xl sm:rounded-2xl hover:bg-blue-50 transition-all border border-blue-100 hover:border-blue-300 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 sm:w-16 sm:h-16 bg-blue-100 rounded-bl-full -z-10 group-hover:scale-150 transition-transform"></div>
              <div className="bg-blue-500 p-2 sm:p-4 rounded-full mb-2 sm:mb-6 group-hover:scale-110 transition-transform">
                 <Activity className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-bold text-sm sm:text-xl mb-1 sm:mb-3 text-slate-800 group-hover:text-blue-600 transition-colors w-full sm:text-center">量化评估</h4>
              <p className="text-[11px] sm:text-sm text-slate-600 mb-2 sm:mb-6 leading-tight sm:leading-relaxed flex-1 line-clamp-2 sm:line-clamp-none">
                细化多项个人常规及生化指标，为您提供独一无二的专属定制参考。
              </p>
              <span className="text-blue-600 text-[11px] sm:text-sm font-semibold flex items-center mt-auto whitespace-nowrap">
                立即评估 <span className="ml-1 group-hover:translate-x-1 transition-transform hidden sm:inline-block">→</span>
              </span>
            </Link>

            {/* 突出疾病干预 */}
            <Link href="/health/cure" className="flex flex-col items-center text-center sm:text-left group bg-white p-3 sm:p-8 rounded-xl sm:rounded-2xl hover:bg-blue-50 transition-all border border-blue-100 hover:border-blue-300 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 sm:w-16 sm:h-16 bg-blue-100 rounded-bl-full -z-10 group-hover:scale-150 transition-transform"></div>
              <div className="bg-blue-500 p-2 sm:p-4 rounded-full mb-2 sm:mb-6 group-hover:scale-110 transition-transform">
                 <ShieldCheck className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-bold text-sm sm:text-xl mb-1 sm:mb-3 text-slate-800 group-hover:text-blue-600 transition-colors w-full sm:text-center">疾病干预</h4>
              <p className="text-[11px] sm:text-sm text-slate-600 mb-2 sm:mb-6 leading-tight sm:leading-relaxed flex-1 line-clamp-2 sm:line-clamp-none">
                严格区分心血管等禁忌人群，用极科学严谨的态度为您的安全兜底。
              </p>
              <span className="text-blue-600 text-[11px] sm:text-sm font-semibold flex items-center mt-auto whitespace-nowrap">
                查看安全禁忌 <span className="ml-1 group-hover:translate-x-1 transition-transform hidden sm:inline-block">→</span>
              </span>
            </Link>

            {/* 突出医疗文章 */}
            <Link href="/health/study" className="flex flex-col items-center text-center sm:text-left group bg-white p-3 sm:p-8 rounded-xl sm:rounded-2xl hover:bg-blue-50 transition-all border border-blue-100 hover:border-blue-300 shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-8 h-8 sm:w-16 sm:h-16 bg-blue-100 rounded-bl-full -z-10 group-hover:scale-150 transition-transform"></div>
              <div className="bg-blue-500 p-2 sm:p-4 rounded-full mb-2 sm:mb-6 group-hover:scale-110 transition-transform">
                 <BookOpen className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-bold text-sm sm:text-xl mb-1 sm:mb-3 text-slate-800 group-hover:text-blue-600 transition-colors w-full sm:text-center">防范指南</h4>
              <p className="text-[11px] sm:text-sm text-slate-600 mb-2 sm:mb-6 leading-tight sm:leading-relaxed flex-1 line-clamp-2 sm:line-clamp-none">
                查集中外最新研究文献，了解深层致病机理，提供权威用药指引。
              </p>
              <span className="text-blue-600 text-[11px] sm:text-sm font-semibold flex items-center mt-auto whitespace-nowrap">
                研读文献 <span className="ml-1 group-hover:translate-x-1 transition-transform hidden sm:inline-block">→</span>
              </span>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
