import { Wind, Thermometer, Droplets, Sun } from "lucide-react";

export default function EnvironmentPage() {
  const envData = [
    { title: "低氧含量", value: "≈13%", desc: "海平面氧含量的 60% 左右", icon: <Wind className="w-10 h-10 text-cyan-500" /> },
    { title: "平均气温", value: "-4℃ ~ 14℃", desc: "昼夜温差极大，年均温较低", icon: <Thermometer className="w-10 h-10 text-orange-500" /> },
    { title: "年降水量", value: "100~300mm", desc: "自东南向西北递减", icon: <Droplets className="w-10 h-10 text-blue-500" /> },
    { title: "太阳辐射", value: "强紫外线", desc: "海拔高导致大气透明度高", icon: <Sun className="w-10 h-10 text-yellow-500" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-[#0b3b60] text-white py-16 md:py-20 px-4 text-center border-b-[4px] border-[#1976D2]">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-wider">环境特点监测</h1>
        <p className="text-blue-100/80 text-lg max-w-2xl mx-auto font-light">
          基于国家级气象及环境地理数据，汇总高原极端自然环境特征。
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {envData.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-lg">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-3xl font-black text-[#1976D2] mb-4">{item.value}</p>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <div className="md:w-1/2 pr-0 md:pr-8 mb-6 md:mb-0">
             <h2 className="text-2xl font-bold text-slate-800 mb-4">气候概貌</h2>
             <p className="text-slate-600 leading-relaxed text-justify">
               青藏高原气候总体呈现辐射强烈、日照多、气温低、积温少、气温随高度和纬度的升高而降低。西北干寒，东南暖湿；无霜期短。光照和地热资源充足，是我国太阳辐射最强地区之一。受地形影响，不同海拔和区域由于山地切断，呈现复杂的局部小气候。
             </p>
          </div>
          <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">应对建议</h2>
            <ul className="space-y-4 text-slate-600">
               <li className="flex items-start"><span className="text-[#1976D2] font-bold mr-2">1.</span> 携带高等级防晒霜(SPF50+)，墨镜。</li>
               <li className="flex items-start"><span className="text-[#1976D2] font-bold mr-2">2.</span> 昼夜温差大，需要随身准备抓绒冲锋衣或羽绒服。</li>
               <li className="flex items-start"><span className="text-[#1976D2] font-bold mr-2">3.</span> 低氧环境切忌奔跑与剧烈运动，保持慢节奏。</li>
               <li className="flex items-start"><span className="text-[#1976D2] font-bold mr-2">4.</span> 空气相对干燥，建议使用唇膏并注意大量补水。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
