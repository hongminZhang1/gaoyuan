import { WordCloud3D } from "@/components/3d-word-cloud";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "高原知识库 - 3D图谱",
  description: "探索高原相关的词云和知识图谱数据展示。",
};

export default function KnowledgePage() {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden text-white pattern-dots pb-20 pt-16">
      {/* Background decorations for sci-tech theme */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0088ff] opacity-10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00e676] opacity-10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#b2ff59] opacity-[0.05] rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
      
      <div className="z-10 text-center mb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#0088ff] drop-shadow-[0_0_15px_rgba(0,136,255,0.4)] relative inline-block">
          数据知识图谱
          <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#00f3ff] shadow-[0_0_10px_#00f3ff]" />
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-light mt-6 max-w-2xl mx-auto tracking-wide">
          拖拽以旋转视角，大小反映其提及频率。直观地探索青藏高原核心概念。
        </p>
      </div>
      
      <div className="z-10 w-full max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-3xl shadow-[0_0_40px_-10px_rgba(0,136,255,0.2)]">
        <WordCloud3D />
      </div>

      <div className="mt-12 text-slate-500 text-sm flex gap-4 gap-y-2 flex-wrap justify-center border-t border-slate-800 pt-6 max-w-lg mx-auto">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00f3ff] shadow-[0_0_8px_#00f3ff]" /> 高频核心</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#4db8ff] shadow-[0_0_8px_#4db8ff]" /> 次级节点</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00e676] shadow-[0_0_8px_#00e676]" /> 生态关联</span>
      </div>
    </div>
  );
}
