"use client";

import { useState, useRef } from "react";
import { 
  User, Mountain, Activity, AlertTriangle, 
  ChevronRight, ChevronLeft, ShieldCheck, 
  RefreshCcw, Info, HeartPulse, Gauge, Stethoscope
} from "lucide-react";

export default function EvaluatePage() {
  const [step, setStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<{
    age: string; gender: string; residenceAlt: string; isNative: string;
    pastExposure: string; pastAMSList: string[]; preDays: string;
    vetoList: string[]; symptomHeadache: string; symptomOthers: string;
    startAlt: string; maxAlt: string; ascentType: string; travelDays: string;
    sysBP: string; diaBP: string; spo2: string; preventMed: string; bpMed: string;
  }>({
    age: "", gender: "male", residenceAlt: "", isNative: "false",
    pastExposure: "false", pastAMSList: [], preDays: "",
    vetoList: [], symptomHeadache: "0", symptomOthers: "0",
    startAlt: "", maxAlt: "", ascentType: "active", travelDays: "",
    sysBP: "", diaBP: "", spo2: "", preventMed: "", bpMed: ""
  });

  const [report, setReport] = useState<{ level: string; score: number } | null>(null);

  const inputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: "pastAMSList" | "vetoList", value: string, checked: boolean) => {
    setFormData((prev) => {
      const list = prev[field];
      if (checked) {
        return { ...prev, [field]: [...list, value] };
      } else {
        return { ...prev, [field]: list.filter((item) => item !== value) };
      }
    });
  };

  const changeStep = (newStep: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(newStep);
      setIsTransitioning(false);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }, 300); // 300ms fade duration
  };

  const executeAssessment = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      const d = formData;
      const sysBP = Number(d.sysBP);
      const diaBP = Number(d.diaBP);

      const hasVeto = d.vetoList.some((item) => ["bp3", "heart", "copd", "preg"].includes(item));
      const hasSevereHistory = d.pastAMSList.some((item) => ["hace", "hape"].includes(item));

      if (hasVeto || hasSevereHistory || sysBP >= 180 || diaBP >= 110) {
        setReport({ level: "高风险", score: 100 });
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      let score = 0;
      const alt = Number(d.residenceAlt);
      if (alt < 1500 && d.residenceAlt !== "") score += 2;
      else if (alt >= 1500 && alt < 2500) score += 1;

      const age = Number(d.age);
      if (age > 65) score += 2;
      else if ((age > 0 && age < 20) || (age >= 50 && age <= 65)) score += 1;

      if (d.gender === "female") score += 1;
      if (d.pastAMSList.includes("ams")) score += 1;

      const pre = Number(d.preDays);
      if (pre < 3 && d.preDays !== "") score += 2;
      else if (pre >= 3 && pre <= 6) score += 1;

      if (d.maxAlt && d.startAlt && d.travelDays) {
        const speed = (Number(d.maxAlt) - Number(d.startAlt)) / Number(d.travelDays);
        if (speed > 500) score += 2;
        else if (speed >= 300 && speed <= 500) score += 1;
      }

      const spo2 = Number(d.spo2);
      if (spo2 > 0 && spo2 < 85) score += 2;
      else if (spo2 >= 85 && spo2 <= 89) score += 1;

      if (sysBP >= 160 || diaBP >= 100) score += 2;
      else if (sysBP >= 140 || diaBP >= 90) score += 1;

      if (score >= 8) setReport({ level: "高风险", score });
      else if (score >= 4) setReport({ level: "中风险", score });
      else setReport({ level: "低风险", score });

      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 400);
  };

  const currentProgress = (step / 4) * 100;

  // Render Form Steps
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className={`transition-all duration-300 transform ${isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#1976D2]">
                <User w-6 h-6 />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">基础生理特征</h2>
                <p className="text-slate-500 text-sm mt-1">为您定制基线参数</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[14px] font-semibold text-slate-700">真实年龄</label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] focus:border-[#42A5F5] focus:ring-4 focus:ring-[#42A5F5]/10 rounded-xl px-4 h-14 text-[16px] text-slate-800 outline-none transition-all"
                    placeholder="您的年龄"
                    value={formData.age}
                    onChange={(e) => inputChange("age", e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">岁</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[14px] font-semibold text-slate-700">生理性别</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => inputChange("gender", "male")}
                    className={`flex-1 h-14 rounded-xl font-semibold transition-all duration-200 border-2 ${
                      formData.gender === "male" ? "bg-blue-50 border-[#1976D2] text-[#1976D2] shadow-sm" : "bg-[#F8FAFC] border-transparent text-slate-500 hover:bg-slate-100"
                    }`}
                  >男性</button>
                  <button
                    type="button"
                    onClick={() => inputChange("gender", "female")}
                    className={`flex-1 h-14 rounded-xl font-semibold transition-all duration-200 border-2 ${
                      formData.gender === "female" ? "bg-blue-50 border-[#1976D2] text-[#1976D2] shadow-sm" : "bg-[#F8FAFC] border-transparent text-slate-500 hover:bg-slate-100"
                    }`}
                  >女性</button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[14px] font-semibold text-slate-700">常住地海拔 <span className="text-slate-400 font-normal">(大致)</span></label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] focus:border-[#42A5F5] focus:ring-4 focus:ring-[#42A5F5]/10 rounded-xl px-4 h-14 text-[16px] text-slate-800 outline-none transition-all placeholder:text-slate-300"
                    placeholder="例如：50"
                    value={formData.residenceAlt}
                    onChange={(e) => inputChange("residenceAlt", e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">m</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[14px] font-semibold text-slate-700 flex justify-between items-center">
                  <span>高原世居者暴露</span>
                  <span className="bg-slate-100 text-slate-500 text-[11px] px-2 py-0.5 rounded">&gt; 2500m</span>
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => inputChange("isNative", "true")}
                    className={`flex-1 h-14 rounded-xl font-semibold transition-all duration-200 border-2 ${
                      formData.isNative === "true" ? "bg-[#1976D2] border-[#1976D2] text-white shadow-md shadow-blue-500/20" : "bg-[#F8FAFC] border-transparent text-slate-500 hover:bg-slate-100"
                    }`}
                  >是</button>
                  <button
                    type="button"
                    onClick={() => inputChange("isNative", "false")}
                    className={`flex-1 h-14 rounded-xl font-semibold transition-all duration-200 border-2 ${
                      formData.isNative === "false" ? "bg-[#1976D2] border-[#1976D2] text-white shadow-md shadow-blue-500/20" : "bg-[#F8FAFC] border-transparent text-slate-500 hover:bg-slate-100"
                    }`}
                  >否 / 未知</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={`transition-all duration-300 transform ${isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Mountain w-6 h-6 />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">高原经历与预适应</h2>
                <p className="text-slate-500 text-sm mt-1">评估基础缺氧耐受度</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[15px] font-bold text-slate-800">您以往是否有过前往高原(&gt;2500m)的经历？</label>
                <div className="flex gap-3 w-full md:w-2/3">
                  <button type="button" onClick={() => inputChange("pastExposure", "true")} className={`flex-1 h-12 rounded-xl font-medium transition-all duration-200 border-2 ${formData.pastExposure === "true" ? "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm" : "bg-[#F8FAFC] border-transparent text-slate-500 hover:bg-slate-100"}`}>有经历</button>
                  <button type="button" onClick={() => inputChange("pastExposure", "false")} className={`flex-1 h-12 rounded-xl font-medium transition-all duration-200 border-2 ${formData.pastExposure === "false" ? "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm" : "bg-[#F8FAFC] border-transparent text-slate-500 hover:bg-slate-100"}`}>无经历 (初次)</button>
                </div>
              </div>

              {formData.pastExposure === "true" && (
                <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
                  <label className="text-[14px] font-bold text-orange-800 flex items-center gap-2 mb-4">
                    <Info className="w-4 h-4" /> 如果在既往经历中发生过以下不良反应，请务必勾选：
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: "轻中度高反 (AMS)", value: "ams", color: "text-orange-700 focus:ring-orange-500" },
                      { label: "严重脑水肿 (HACE)", value: "hace", color: "text-red-600 focus:ring-red-500" },
                      { label: "严重肺水肿 (HAPE)", value: "hape", color: "text-red-600 focus:ring-red-500" },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-orange-100 hover:border-orange-300 hover:shadow-sm cursor-pointer transition-all group">
                        <input
                          type="checkbox"
                          value={item.value}
                          checked={formData.pastAMSList.includes(item.value)}
                          onChange={(e) => handleCheckboxChange("pastAMSList", e.target.value, e.target.checked)}
                          className={`w-5 h-5 rounded border-gray-300 cursor-pointer ${item.color}`}
                        />
                        <span className={`text-[14px] font-medium transition-colors group-hover:${item.color.split(" ")[0]} text-slate-700`}>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-[15px] font-bold text-slate-800 flex justify-between">
                  <span>短期预适应评估：近2个月内在3000m以上高原停留天数</span>
                </label>
                <p className="text-sm text-slate-500 mb-2">预适应机制可极大降低心肺急性反应的爆发率。</p>
                <div className="relative w-full md:w-1/2">
                  <input
                    type="number"
                    className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 h-14 text-[16px] text-slate-800 outline-none transition-all placeholder:text-slate-300"
                    placeholder="停留天数，没有填 0"
                    value={formData.preDays}
                    onChange={(e) => inputChange("preDays", e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">天</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`transition-all duration-300 transform ${isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                <Activity w-6 h-6 />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">行程及基础体征</h2>
                <p className="text-slate-500 text-sm mt-1">评估上升曲线与生理响应</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-6 relative overflow-hidden">
                 <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-100 to-transparent pointer-events-none" />
                 <h3 className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">预计落差与上升规划 (必须项)</h3>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-slate-600">起始海拔点</label>
                      <div className="relative">
                        <input type="number" className="w-full bg-white border border-[#E2E8F0] focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl pl-3 pr-8 h-12 text-[15px] outline-none transition-all" placeholder="例如: 2000" value={formData.startAlt} onChange={(e) => inputChange("startAlt", e.target.value)} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">m</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-slate-600">行程至高点</label>
                      <div className="relative">
                        <input type="number" className="w-full bg-white border border-[#E2E8F0] focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl pl-3 pr-8 h-12 text-[15px] outline-none transition-all" placeholder="例如: 4500" value={formData.maxAlt} onChange={(e) => inputChange("maxAlt", e.target.value)} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">m</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-slate-600">从起点到至高用时</label>
                      <div className="relative">
                        <input type="number" className="w-full bg-white border border-[#E2E8F0] focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl pl-3 pr-8 h-12 text-[15px] outline-none transition-all" placeholder="预计天数" value={formData.travelDays} onChange={(e) => inputChange("travelDays", e.target.value)} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">天</span>
                      </div>
                    </div>
                 </div>
                 
                 <div className="mt-6 space-y-2">
                   <label className="text-[13px] font-semibold text-slate-600">主要上升方式</label>
                   <div className="flex gap-2 p-1 bg-slate-200/50 rounded-xl w-full sm:w-[300px]">
                      <button type="button" onClick={() => inputChange("ascentType", "active")} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${formData.ascentType === "active" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:bg-white/50"}`}>徒步行进</button>
                      <button type="button" onClick={() => inputChange("ascentType", "passive")} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${formData.ascentType === "passive" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:bg-white/50"}`}>乘车/乘机</button>
                   </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-teal-100 shadow-sm rounded-2xl p-6">
                   <h3 className="text-sm font-bold text-teal-800 mb-4 flex items-center gap-2"><HeartPulse className="w-4 h-4"/> 当前安静下血压 (选填)</h3>
                   <div className="flex items-center gap-2">
                      <input type="number" className="w-[100px] text-center bg-[#F8FAFC] border border-[#E2E8F0] focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl h-12 text-[15px] outline-none transition-all" placeholder="收缩压" value={formData.sysBP} onChange={(e) => inputChange("sysBP", e.target.value)} />
                      <span className="text-slate-400 font-light text-xl">/</span>
                      <input type="number" className="w-[100px] text-center bg-[#F8FAFC] border border-[#E2E8F0] focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl h-12 text-[15px] outline-none transition-all" placeholder="舒张压" value={formData.diaBP} onChange={(e) => inputChange("diaBP", e.target.value)} />
                      <span className="text-slate-400 text-sm ml-2">mmHg</span>
                   </div>
                </div>
                <div className="bg-white border border-teal-100 shadow-sm rounded-2xl p-6">
                   <h3 className="text-sm font-bold text-teal-800 mb-4 flex items-center gap-2"><Activity className="w-4 h-4"/> 当前血氧饱和度 (选填)</h3>
                   <div className="flex items-center gap-4">
                      <div className="relative">
                        <input type="number" className="w-[120px] bg-[#F8FAFC] border border-[#E2E8F0] focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl pl-4 pr-8 h-12 text-[15px] outline-none transition-all" placeholder="SpO2数值" value={formData.spo2} onChange={(e) => inputChange("spo2", e.target.value)} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">%</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={`transition-all duration-300 transform ${isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">医学红线排查与反馈</h2>
                <p className="text-slate-500 text-sm mt-1">STAR标准指南的一票否决系统</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 overflow-hidden relative">
                 <div className="absolute -right-4 -top-4 opacity-5"><AlertTriangle className="w-40 h-40" /></div>
                 <h3 className="text-[15px] font-bold text-rose-800 mb-4 tracking-wide">若存在以下情况，您的行程将被强烈建议终止：</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
                    {[
                      { val: 'bp3', label: '高血压达3级 (≥180/110) 且药物未控' },
                      { val: 'heart', label: '近3月内心脑血管急症 (心梗/卒中等)' },
                      { val: 'copd', label: '慢阻肺/哮喘急性活动期发作' },
                      { val: 'preg', label: '孕妇 (极易流产及心肺负荷超限)' },
                      { val: 'alz', label: '伴重度器质性认知障碍 (如晚期阿尔茨海默)' }
                    ].map(ck => (
                       <label key={ck.val} className="flex items-center gap-3 p-3 bg-white/60 hover:bg-white rounded-xl border border-rose-100 hover:border-rose-300 hover:shadow-sm cursor-pointer transition-all group">
                         <input type="checkbox" value={ck.val} checked={formData.vetoList.includes(ck.val)} onChange={(e) => handleCheckboxChange("vetoList", e.target.value, e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-rose-600 focus:ring-rose-500 cursor-pointer" />
                         <span className="text-[14px] font-semibold text-rose-900 group-hover:text-rose-600 transition-colors">{ck.label}</span>
                       </label>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                   <h3 className="text-sm font-bold text-slate-800 mb-4 flex justify-between">
                     <span>现有头痛程度 (路易斯湖量表)</span>
                     <span className="text-[#1976D2] font-black text-xl">{formData.symptomHeadache}</span>
                   </h3>
                   <input type="range" min="0" max="3" value={formData.symptomHeadache} onChange={e => inputChange('symptomHeadache', e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1976D2]/30 accent-[#1976D2]" />
                   <div className="flex justify-between text-xs text-slate-400 mt-3 font-medium">
                     <span>0 正常无感</span>
                     <span>3 撕裂样剧痛</span>
                   </div>
                 </div>

                 <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                   <h3 className="text-sm font-bold text-slate-800 mb-4 flex justify-between">
                     <span>疲劳/胃肠/头晕 综合体感分</span>
                     <span className="text-[#1976D2] font-black text-xl">{formData.symptomOthers}</span>
                   </h3>
                   <input type="range" min="0" max="9" value={formData.symptomOthers} onChange={e => inputChange('symptomOthers', e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1976D2]/30 accent-[#1976D2]" />
                   <div className="flex justify-between text-xs text-slate-400 mt-3 font-medium">
                     <span>0 精神饱满</span>
                     <span>9 极度濒死感</span>
                   </div>
                 </div>
              </div>

            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Render Report
  const renderDashboardReport = () => {
    if (!report) return null;
    const { level, score } = report;

    // Report config mapping
    let themeColor = "#10B981"; // Emerald
    let iconBg = "bg-emerald-50 text-emerald-600";
    let message = "";
    let tips: { title: string; desc: string }[] = [];
    let gaugePercentage = Math.min((score / 15) * 100, 100);

    if (level === "低风险") {
      themeColor = "#10B981";
      iconBg = "bg-emerald-50 text-emerald-600";
      message = "评估显示您的基础参数和行程具备安全适应性，请保持良好心态，循序渐进。";
      tips = [
        { title: "行程管控", desc: "建议每日海拔上升控制在300m-500m内，多喝水，避免到达后立即洗澡。" },
        { title: "防范未然", desc: "可提前1天服用角鲨烯或红景天等辅助药物，必备防寒与高倍防晒。" }
      ];
    } else if (level === "中风险") {
      themeColor = "#F59E0B"; // Amber
      iconBg = "bg-amber-50 text-amber-600";
      message = "系统识别出您的行程或体征存在易发高反暴露，需采取积极医学干预。";
      tips = [
        { title: "医疗介入", desc: "强烈建议行前咨询医生获取处方，如乙酰唑胺(预防AMS)；且需随身携带便携血氧仪。" },
        { title: "阶梯适应", desc: "不要直接飞跃极高海拔，在3000m级别地区强制缓冲停留 1~2 天。" },
        { title: "伴随就医与下撤", desc: "路途若发觉血氧持续 <85% 并伴头痛不缓解，须立刻吸氧并强制下撤。" }
      ];
      gaugePercentage = Math.max(gaugePercentage, 50);
    } else if (level === "高风险") {
      themeColor = "#EF4444"; // Red
      iconBg = "bg-red-50 text-red-600";
      message = "【医疗特级警告】您严重违背了医学安全指南（因血压超限、重疾禁忌或过往重症等）。严重建议取消行程！";
      tips = [
        { title: "严酷禁令", desc: "极高海拔可能立即诱发原有心肺隐患突变或导致肺水肿脑水肿致死，切勿以身犯险。" },
        { title: "复检通道", desc: "若职业需强制前往，需三甲医院全面诊断并获取专科医生签字放行，沿途必须配置制氧急救设施。" }
      ];
      gaugePercentage = 100;
    }

    // SVG Gauge Dash config
    const radius = 80;
    const circumference = Math.PI * radius; // Half circle
    const strokeDashoffset = circumference - (gaugePercentage / 100) * circumference;

    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 animate-in fade-in zoom-in-95 duration-500">
         <div className="max-w-4xl mx-auto flex flex-col gap-6">
            
            {/* Top Dashboard Status */}
            <div className="bg-white rounded-[24px] shadow-sm overflow-hidden flex flex-col md:flex-row items-center">
               {/* Left: Gauge */}
               <div className="w-full md:w-[320px] bg-slate-800 p-8 flex flex-col items-center justify-center shrink-0 relative overflow-hidden">
                 {/* Decorative radar lines */}
                 <div className="absolute inset-0 opacity-10 background-radar pointer-events-none" />
                 
                 <h2 className="text-white/60 font-bold tracking-widest text-xs mb-6 uppercase">STAR 动态风险指数</h2>
                 <div className="relative w-[200px] h-[100px] flex items-end justify-center">
                    {/* Background Arc */}
                    <svg className="absolute top-0 left-0 w-full h-[200px]" viewBox="0 0 200 200">
                      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#1E293B" strokeWidth="16" strokeLinecap="round" />
                      {/* Interactive Arc */}
                      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={themeColor} strokeWidth="16" strokeLinecap="round" 
                            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
                            style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.1, 0, 0.2, 1)' }} />
                    </svg>
                    <div className="text-center translate-y-3">
                       <p className="text-5xl font-black text-white drop-shadow-md" style={{ color: themeColor }}>{score === 100 ? "Max" : score}</p>
                       <p className="text-white/80 font-medium text-lg mt-1 tracking-widest">{level}</p>
                    </div>
                 </div>
               </div>

               {/* Right: Status Text */}
               <div className="p-8 md:p-12 border-b md:border-b-0 md:border-l border-slate-100 flex-1">
                 <div className="flex items-center gap-4 mb-4">
                   <div className={`p-3 rounded-2xl ${iconBg}`}>
                      {level === "低风险" ? <ShieldCheck className="w-8 h-8" /> : (level === "高风险" ? <AlertTriangle className="w-8 h-8" /> : <Stethoscope className="w-8 h-8" />)}
                   </div>
                   <h3 className="text-2xl font-bold text-slate-800">医学评估结论</h3>
                 </div>
                 <div className="w-12 h-1 bg-slate-200 rounded-full mb-6">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: '40%', backgroundColor: themeColor}}></div>
                 </div>
                 <p className="text-[17px] text-slate-600 leading-relaxed font-medium">
                   {message}
                 </p>
               </div>
            </div>

            {/* Bottom Advice Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {tips.map((tip, index) => (
                 <div key={index} className="bg-white p-6 md:p-8 rounded-[20px] shadow-sm border border-slate-100 border-l-[6px] transition-transform hover:-translate-y-1" style={{ borderLeftColor: themeColor }}>
                    <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                       <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: themeColor }}>{index + 1}</span>
                       {tip.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">{tip.desc}</p>
                 </div>
               ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-200 pt-8">
               <button onClick={() => { setReport(null); setStep(1); window.scrollTo(0,0); }} className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 font-bold rounded-xl shadow-sm transition-all">
                  <RefreshCcw className="w-5 h-5" /> 重新开始评估
               </button>
               <button className="flex items-center gap-2 px-8 py-4 font-bold rounded-xl shadow-md transition-all text-white hover:scale-105" style={{ backgroundColor: themeColor }}>
                  将报告保存至档案
               </button>
            </div>
            
            <p className="text-center text-xs text-slate-400 mt-6 max-w-xl mx-auto leading-relaxed uppercase tracking-wide">
              Data based on STAR altitude medical guidelines. Not a substitute for hospital prescriptions.
            </p>
         </div>

         <style dangerouslySetInnerHTML={{__html:`
           .background-radar {
              background-image: repeating-radial-gradient(circle at bottom center, transparent, transparent 15px, #ffffff 16px);
           }
         `}} />
      </div>
    );
  };

  // Main Return Statement for the Form Wizard
  if (report) {
    return renderDashboardReport();
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-24 font-sans selection:bg-[#1976D2] selection:text-white">
      {/* Wizard Header Hero */}
      <div className="bg-[#0D47A1] bg-[url('https://pic.homgzha.cc/pic/gy2.jpg')] bg-cover bg-center w-full relative h-[320px]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D47A1]/95 to-[#1976D2]/95 mix-blend-multiply" />
        <div className="absolute inset-0 flex flex-col justify-center max-w-5xl mx-auto px-6 md:px-8 z-10 pt-10">
           <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
             医疗级高原风险筛查
           </h1>
           <p className="text-blue-100 text-[15px] md:text-[17px] font-medium max-w-xl leading-relaxed">
             摒弃粗浅的主观猜测，系统全面结合「极高海拔多中心STAR模型」，在四步之内给与您最精准的出行干预指导与心肺风险量化。
           </p>
        </div>
      </div>

      {/* Main Wizard Form */}
      <div className="-mt-16 relative z-20 max-w-4xl mx-auto px-4 md:px-0">
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col min-h-[600px] border border-slate-100" ref={contentRef}>
           
           {/* Form Header & Progress */}
           <div className="px-6 md:px-12 py-8 border-b border-slate-100 bg-white sticky top-0 z-30">
              <div className="flex justify-between items-end mb-4">
                 <div>
                   <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">STEP {step} OF 4</p>
                   <h3 className="text-xl font-bold text-slate-800">
                     {step === 1 ? "建立医学档案" : step === 2 ? "病史与习惯" : step === 3 ? "行程极限与体征" : "危机因子扫描"}
                   </h3>
                 </div>
                 <div className="text-[#1976D2] font-black text-2xl">
                    {Math.round(currentProgress)}%
                 </div>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex shadow-inner">
                <div className="h-full bg-gradient-to-r from-[#42A5F5] to-[#1976D2] transition-all duration-700 ease-out rounded-full relative" style={{ width: `${currentProgress}%` }}>
                   <div className="absolute inset-0 bg-white/20 transform skew-x-12 translate-x-[-100%] animate-pulse" />
                </div>
              </div>
           </div>

           {/* Dynamic Step Content */}
           <div className="flex-1 p-6 md:p-12 overflow-x-hidden bg-slate-50/30">
              {renderStepContent()}
           </div>

           {/* Form Footer / Controls */}
           <div className="px-6 md:px-12 py-6 bg-white border-t border-slate-100 flex items-center justify-between">
              <button 
                type="button"
                onClick={() => step > 1 && changeStep(step - 1)}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all ${step === 1 ? 'opacity-0 cursor-default' : 'text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-slate-800'}`}
              >
                <ChevronLeft className="w-5 h-5" /> 上一步
              </button>

              {step < 4 ? (
                 <button 
                   type="button"
                   onClick={() => changeStep(step + 1)}
                   className="flex items-center gap-2 px-8 py-3 bg-[#1976D2] hover:bg-[#0D47A1] text-white font-bold rounded-xl shadow-[0_8px_20px_-6px_rgba(25,118,210,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(25,118,210,0.6)] transform hover:-translate-y-1 transition-all"
                 >
                   下一步 <ChevronRight className="w-5 h-5" />
                 </button>
              ) : (
                 <button 
                   type="button"
                   onClick={executeAssessment}
                   className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#1976D2] to-[#0D47A1] text-white font-black rounded-xl shadow-[0_8px_20px_-6px_rgba(25,118,210,0.5)] hover:-translate-y-1 transition-all group overflow-hidden relative"
                 >
                   <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-[shimmer_1.5s_infinite]" />
                   <Gauge className="w-5 h-5" /> 一键生成面诊报告
                 </button>
              )}
           </div>

        </div>
      </div>
    </div>
  );
}
