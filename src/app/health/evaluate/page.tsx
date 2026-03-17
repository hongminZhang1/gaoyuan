'use client';

import { useState } from 'react';

export default function EvaluatePage() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    residenceAlt: '',
    isNative: 'false',
    pastExposure: 'false',
    pastAMSList: [] as string[],
    preDays: '',
    vetoList: [] as string[],
    symptomHeadache: '0',
    symptomOthers: '0',
    startAlt: '',
    maxAlt: '',
    ascentType: 'active',
    travelDays: '',
    sysBP: '',
    diaBP: '',
    spo2: '',
    preventMed: '',
    bpMed: ''
  });

  const [report, setReport] = useState<{ level: string; score: number } | null>(null);

  const inputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: 'pastAMSList' | 'vetoList', value: string, checked: boolean) => {
    setFormData(prev => {
      const list = prev[field];
      if (checked) {
        return { ...prev, [field]: [...list, value] };
      } else {
        return { ...prev, [field]: list.filter(item => item !== value) };
      }
    });
  };

  const executeAssessment = () => {
    const d = formData;
    const sysBP = Number(d.sysBP);
    const diaBP = Number(d.diaBP);

    const hasVeto = d.vetoList.some(item => ['bp3', 'heart', 'copd', 'preg'].includes(item));
    const hasSevereHistory = d.pastAMSList.some(item => ['hace', 'hape'].includes(item)); 
    
    if (hasVeto || hasSevereHistory || sysBP >= 180 || diaBP >= 110) { 
      setReport({ level: '高风险', score: 100 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    let score = 0;

    const alt = Number(d.residenceAlt);
    if (alt < 1500 && d.residenceAlt !== '') score += 2;
    else if (alt >= 1500 && alt < 2500) score += 1;

    const age = Number(d.age);
    if (age > 65) score += 2;
    else if ((age > 0 && age < 20) || (age >= 50 && age <= 65)) score += 1;

    if (d.gender === 'female') score += 1;
    if (d.pastAMSList.includes('ams')) score += 1;

    const pre = Number(d.preDays);
    if (pre < 3 && d.preDays !== '') score += 2;
    else if (pre >= 3 && pre <= 6) score += 1;

    if (d.maxAlt && d.startAlt && d.travelDays) {
      const speed = (Number(d.maxAlt) - Number(d.startAlt)) / Number(d.travelDays);
      if (speed > 500) score += 2;
      else if (speed >= 300 && speed <= 500) score += 1;
    }

    const spo2 = Number(d.spo2);
    if (spo2 > 0 && spo2 < 85) score += 2;
    else if (spo2 >= 85 && spo2 <= 89) score += 1;

    if (sysBP >= 160 || diaBP >= 100) {
      score += 2; 
    } else if (sysBP >= 140 || diaBP >= 90) {
      score += 1; 
    }

    if (score >= 8) {
      setReport({ level: '高风险', score });
    } else if (score >= 4) {
      setReport({ level: '中风险', score });
    } else {
      setReport({ level: '低风险', score });
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderReport = () => {
    if (!report) return null;
    const { level, score } = report;
    let themeColor = '#10b981'; // Emerald 500
    let bgGradient = 'from-emerald-500 to-teal-600';
    let conclusion = '';
    let advices: string[] = [];
    let icon = '';

    if (level === '低风险') {
      themeColor = '#10b981';
      bgGradient = 'from-emerald-500 to-teal-400';
      icon = '';
      conclusion = '评估显示您目前的基础健康及行程安排较好，一般情况下适合前往高原，但仍需做好充分的防范准备，切勿掉以轻心。';
      advices = [
        '行前咨询：带齐常用药物，确保降压药(如适用)充足，建议携带便携式血压计和指夹式血氧仪。',
        '行程干预：到达后前2天必须缓慢上升，建议每日上升幅度 <300m，或在2500m-3000m停留1-2天适应。',
        '药物预防：必要时行前咨询医生，考虑使用乙酰唑胺等药物提前预防急性高山病(AMS)。',
        '体征监测：每日早晚记录静息血压和血氧，若SpO2持续低于85%或血压显著暴增，应停止继续上升。',
        '症状警惕：若出现严重的静息状态下呼吸困难、极度疲乏、步态不稳或剧烈头痛，请立刻下撤并就医！'
      ];
    } else if (level === '中风险') {
      themeColor = '#f59e0b';
      bgGradient = 'from-amber-500 to-orange-400';
      icon = '';
      conclusion = '依据评估，您的身体状况或行程参数存在一定的健康突发风险。强烈建议您谨慎行事，并采取升级的预防与干预措施。';
      advices = [
        '专科评估：行前强烈建议咨询心内科或高原医学科医生，确认当前是否需要调整降压方案，或开具硝苯地平/地塞米松等预防药物。',
        '硬核装备：将便携氧气瓶、高品质血氧仪列为必需品，最好结伴而行并保持通讯畅通。',
        '行程重构：缩减每日上升海拔至极限300m以内。坚决避免疲劳驾驶和剧烈运动，若感不适，立即就地下撤。',
        '密集监测：每日进行3次以上的血压、血氧监测，严格监控路易斯湖症状评分。',
        '紧急预案：出发前务必熟知沿途医疗救助点，掌握基础急救（高压氧舱/氧袋）操作。'
      ];
    } else if (level === '高风险') {
      themeColor = '#ef4444';
      bgGradient = 'from-red-500 to-rose-600';
      icon = '';
      conclusion = '警告：系统判定您当前的生理参数（如未控制的高血压）或过往重度高反病史直接触发指南的【一票否决】底线，为生命安全起见，极不适宜目前前往高原！';
      advices = [
        '底线劝阻：高原严酷的低压低氧环境极易诱发心源性猝死、急性脑水肿(HACE)及肺水肿(HAPE)，请更改您的旅行目的地至低海拔地区。',
        '优先就医：尽早前往医院查明基础病况（特别是高血压未控或心肺病史），在得到彻底有效治疗且稳定至少3个月后方可重新评估。',
        '特例指导：若因职业要求或特殊紧急事务必须前往高原，必须由专业医疗保障团队全程介入护航，且随车配置高压氧救生舱及AED。'
      ];
    }

    return (
      <div className="min-h-screen pb-[40px] md:pb-[80px] flex justify-center bg-[#f0f4f8] animate-fade-in font-sans relative overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 left-0 w-full h-[400px] opacity-40 mix-blend-multiply filter blur-[80px]" style={{ background: `linear-gradient(to bottom, ${themeColor}60, transparent)` }}></div>
        
        <div className="w-full max-w-[800px] md:mt-[60px] mx-[15px] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white relative z-10 flex flex-col">
          
          {/* Header Card Area */}
          <div className={`pt-[50px] pb-[40px] px-[30px] flex flex-col items-center justify-center text-white bg-gradient-to-br ${bgGradient} text-center`}>
            <div className="text-[60px] mb-[10px] drop-shadow-md leading-none">{icon}</div>
            <div className="text-[36px] md:text-[42px] font-extrabold mb-[12px] tracking-wider drop-shadow-sm">{level}</div>
            
            {score < 100 ? (
              <div className="bg-white/20 backdrop-blur-md px-[20px] py-[8px] rounded-full shadow-inner border border-white/20">
                <span className="text-[15px] md:text-[16px] font-medium tracking-wide">综合风险评估得分: <strong>{score} 分</strong></span>
              </div>
            ) : (
              <div className="bg-white/20 backdrop-blur-md px-[20px] py-[8px] rounded-full shadow-inner border border-white/20 flex items-center gap-2">
                <svg className="w-5 h-5 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-[15px] md:text-[16px] font-bold tracking-wide">触发高危一票否决指标</span>
              </div>
            )}
          </div>

          <div className="p-[25px] md:p-[45px]">
            {/* Conclusion */}
            <div className="mb-[35px]">
              <div className="flex items-center gap-[10px] mb-[16px]">
                <div className="w-[8px] h-[24px] rounded-full" style={{ backgroundColor: themeColor }}></div>
                <h3 className="text-[20px] md:text-[22px] font-bold text-gray-800">评估初步结论</h3>
              </div>
              <div className="bg-gray-50/50 border border-gray-100 p-[20px] rounded-[16px] text-[15px] md:text-[16px] text-gray-700 leading-[1.8] font-medium">
                {conclusion}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-[40px]">
              <div className="flex items-center gap-[10px] mb-[16px]">
                <div className="w-[8px] h-[24px] rounded-full" style={{ backgroundColor: themeColor }}></div>
                <h3 className="text-[20px] md:text-[22px] font-bold text-gray-800">定制化健康建议</h3>
              </div>
              <ul className="space-y-[16px]">
                {advices.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-[12px] bg-white group hover:bg-gray-50 transition-colors p-[12px] rounded-[12px] -mx-[12px]">
                    <span className="flex items-center justify-center w-[24px] h-[24px] rounded-full text-white text-[12px] font-bold shrink-0 mt-[2px] shadow-sm" style={{ backgroundColor: themeColor }}>
                      {idx + 1}
                    </span>
                    <span className="text-[15px] text-gray-600 leading-[1.7] flex-1">
                      {/* Bold the prefix before colon if exists */}
                      {item.includes('：') ? (
                        <>
                          <strong className="text-gray-800">{item.split('：')[0]}：</strong>
                          {item.split('：')[1]}
                        </>
                      ) : item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center border-t border-gray-100 pt-[30px]">
              <button 
                className="w-full md:w-[320px] h-[54px] rounded-full text-white text-[17px] font-bold tracking-wide shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2" 
                style={{ backgroundColor: themeColor }}
                onClick={() => { setReport(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                重新进行健康评估
              </button>
              <div className="text-[12px] text-gray-400 mt-[20px] max-w-[80%] text-center leading-[1.6]">
                <strong className="font-semibold text-gray-500">免责声明：</strong> 本报告模型严格基于高原医学STAR指南自动化处理，结论供风险预警参考，绝不可替代专业执业医师的院内当面临床诊断与开药意见。
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (report) {
    return renderReport();
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] pb-[60px] font-sans selection:bg-[#002b5b] selection:text-white">
      {/* Hero Banner Area */}
      <div className="relative w-full bg-gradient-to-br from-[#003B73] via-[#002b5b] to-[#011a38] text-white pt-[60px] pb-[80px] md:pb-[110px] px-[20px] shadow-lg md:rounded-b-[40px] rounded-b-[30px] overflow-hidden">
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-[-50%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-white opacity-5 blur-[80px] md:blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-50%] left-[-10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-[#10b981] opacity-10 blur-[60px] md:blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1000px] mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between">
          <div>
            <h1 className="text-[28px] md:text-[42px] font-extrabold mb-[12px] md:mb-[16px] tracking-tight relative inline-block text-center md:text-left w-full h-[1.3em]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">高原旅行</span> 面诊级评估
            </h1>
            <p className="text-[14px] md:text-[16px] text-blue-100 opacity-90 leading-relaxed font-medium text-center md:text-left max-w-lg">
              行前一测，防患未然。系统搭载最新高频 STAR 医学模型及高血压指南因子，深度推演您的高原风险指标。
            </p>
          </div>
          <div className="hidden md:flex gap-4 mt-6 md:mt-0 text-blue-200 text-[13px] font-semibold items-center bg-white/10 px-5 py-3 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400"></div>安全模型开启</div>
            <div className="w-px h-4 bg-blue-400/50"></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div>19项医学鉴别</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="-mt-[40px] md:-mt-[60px] px-[15px] w-full max-w-[1040px] mx-auto relative z-20">
        <form className="grid grid-cols-1 lg:grid-cols-12 gap-[20px] md:gap-[24px]">

          {/* Left Column: 7 Spans */}
          <div className="lg:col-span-7 flex flex-col gap-[20px] md:gap-[24px]">
            
            {/* Card: 基础特征 */}
            <div className="bg-white rounded-[16px] md:rounded-[24px] p-[24px] md:p-[32px] shadow-sm md:shadow-[0_12px_30px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center mb-[24px] pb-[16px] border-b border-gray-50">
                <div className="w-[36px] h-[36px] bg-blue-50 rounded-xl flex items-center justify-center mr-[12px] text-[#002b5b]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h2 className="text-[17px] md:text-[19px] font-bold text-gray-800">基础生理特征</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] md:gap-[20px]">
                <div>
                  <label className="text-[14px] text-gray-700 font-semibold mb-[8px] block w-full">年龄</label>
                  <div className="relative">
                    <input className="bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#002b5b] focus:ring-[3px] focus:ring-[#002b5b]/10 transition-all rounded-[10px] pl-[16px] pr-[40px] h-[48px] text-[15px] w-full text-gray-800 outline-none" type="number" placeholder="您的年龄" value={formData.age} onChange={e => inputChange('age', e.target.value)} />
                    <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-gray-400 font-medium">岁</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-[14px] text-gray-700 font-semibold mb-[8px] block">生理性别</label>
                  <div className="flex bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] h-[48px] p-1 gap-1">
                    <label className={`flex-1 flex justify-center items-center rounded-lg cursor-pointer transition-all text-[14px] font-medium ${formData.gender === 'male' ? 'bg-white shadow-sm text-[#002b5b]' : 'text-gray-500 hover:bg-gray-100'}`}>
                      <input className="hidden" type="radio" value="male" checked={formData.gender === 'male'} onChange={e => inputChange('gender', e.target.value)} />
                      男
                    </label>
                    <label className={`flex-1 flex justify-center items-center rounded-lg cursor-pointer transition-all text-[14px] font-medium ${formData.gender === 'female' ? 'bg-white shadow-sm text-[#002b5b]' : 'text-gray-500 hover:bg-gray-100'}`}>
                      <input className="hidden" type="radio" value="female" checked={formData.gender === 'female'} onChange={e => inputChange('gender', e.target.value)} />
                      女
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-[14px] text-gray-700 font-semibold mb-[8px] block w-full mt-[4px]">常住地海拔 (大致)</label>
                  <div className="relative">
                    <input className="bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#002b5b] focus:ring-[3px] focus:ring-[#002b5b]/10 transition-all rounded-[10px] pl-[16px] pr-[40px] h-[48px] text-[15px] w-full text-gray-800 outline-none placeholder:text-gray-300" type="number" placeholder="50" value={formData.residenceAlt} onChange={e => inputChange('residenceAlt', e.target.value)} />
                    <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-gray-400 font-medium">m</span>
                  </div>
                </div>

                <div>
                  <label className="text-[14px] text-gray-700 font-semibold mb-[8px] block w-full mt-[4px]">是否为高原世居者 <span className="text-[12px] text-gray-400 font-normal">(&gt;2500m)</span></label>
                  <div className="flex bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] h-[48px] p-1 gap-1">
                    <label className={`flex-1 flex justify-center items-center rounded-lg cursor-pointer transition-all text-[14px] font-medium ${formData.isNative === 'true' ? 'bg-[#002b5b] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                      <input className="hidden" type="radio" value="true" checked={formData.isNative === 'true'} onChange={e => inputChange('isNative', e.target.value)} />
                      是
                    </label>
                    <label className={`flex-1 flex justify-center items-center rounded-lg cursor-pointer transition-all text-[14px] font-medium ${formData.isNative === 'false' ? 'bg-[#002b5b] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                      <input className="hidden" type="radio" value="false" checked={formData.isNative === 'false'} onChange={e => inputChange('isNative', e.target.value)} />
                      否
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Card: 高原经历与预适应 */}
            <div className="bg-white rounded-[16px] md:rounded-[24px] p-[24px] md:p-[32px] shadow-sm md:shadow-[0_12px_30px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center mb-[24px] pb-[16px] border-b border-gray-50">
                <div className="w-[36px] h-[36px] bg-indigo-50 rounded-xl flex items-center justify-center mr-[12px] text-indigo-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 className="text-[17px] md:text-[19px] font-bold text-gray-800">高原经历与预适应</h2>
              </div>
              
              <div className="mb-[20px]">
                <label className="text-[14px] text-gray-700 font-semibold mb-[12px] block">既往是否有过高原暴露经历？</label>
                <div className="flex bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] h-[48px] p-1 w-full sm:w-[240px] gap-1">
                  <label className={`flex-1 flex justify-center items-center rounded-lg cursor-pointer transition-all text-[14px] font-medium ${formData.pastExposure === 'true' ? 'bg-[#002b5b] shadow-sm text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                    <input className="hidden" type="radio" value="true" checked={formData.pastExposure === 'true'} onChange={e => inputChange('pastExposure', e.target.value)} />
                    有经历
                  </label>
                  <label className={`flex-1 flex justify-center items-center rounded-lg cursor-pointer transition-all text-[14px] font-medium ${formData.pastExposure === 'false' ? 'bg-[#002b5b] shadow-sm text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                    <input className="hidden" type="radio" value="false" checked={formData.pastExposure === 'false'} onChange={e => inputChange('pastExposure', e.target.value)} />
                    无经历
                  </label>
                </div>
              </div>

              {formData.pastExposure === 'true' && (
                <div className="mb-[24px] p-[16px] bg-orange-50/50 border border-orange-100 rounded-[12px] animate-fade-in shadow-inner">
                  <label className="text-[14px] text-orange-900 font-semibold mb-[12px] block flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    如果您有以下不良既往史请务必勾选：
                  </label>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-[12px] sm:gap-[20px]">
                    <label className="text-[14px] text-gray-700 flex items-center gap-[8px] cursor-pointer group">
                      <input className="w-5 h-5 cursor-pointer rounded text-[#002b5b] focus:ring-[#002b5b] transition-all" type="checkbox" value="ams" checked={formData.pastAMSList.includes('ams')} onChange={e => handleCheckboxChange('pastAMSList', e.target.value, e.target.checked)} /> 
                      <span className="group-hover:text-[#002b5b] transition-colors">轻/中度 AMS (一般高反)</span>
                    </label>
                    <label className="text-[14px] text-gray-700 flex items-center gap-[8px] cursor-pointer group">
                      <input className="w-5 h-5 cursor-pointer rounded text-[#002b5b] focus:ring-[#002b5b] transition-all" type="checkbox" value="hace" checked={formData.pastAMSList.includes('hace')} onChange={e => handleCheckboxChange('pastAMSList', e.target.value, e.target.checked)} /> 
                      <span className="group-hover:text-red-500 transition-colors">既往 HACE (脑水肿)</span>
                    </label>
                    <label className="text-[14px] text-gray-700 flex items-center gap-[8px] cursor-pointer group">
                      <input className="w-5 h-5 cursor-pointer rounded text-[#002b5b] focus:ring-[#002b5b] transition-all" type="checkbox" value="hape" checked={formData.pastAMSList.includes('hape')} onChange={e => handleCheckboxChange('pastAMSList', e.target.value, e.target.checked)} /> 
                      <span className="group-hover:text-red-500 transition-colors">既往 HAPE (肺水肿)</span>
                    </label>
                  </div>
                </div>
              )}

              <div>
                <label className="text-[14px] text-gray-700 font-semibold mb-[8px] block">预适应判断：近2个月曾在3000m高原停留天数</label>
                <div className="relative max-w-[240px]">
                  <input className="bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#002b5b] focus:ring-[3px] focus:ring-[#002b5b]/10 transition-all rounded-[10px] pl-[16px] pr-[40px] h-[48px] text-[15px] w-full text-gray-800 outline-none placeholder:text-gray-300" type="number" placeholder="0" value={formData.preDays} onChange={e => inputChange('preDays', e.target.value)} />
                  <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-gray-400 font-medium">天</span>
                </div>
                <p className="text-[12px] text-gray-400 mt-[8px]">充分的预适应将显著降低本次高反发生率。</p>
              </div>
            </div>

          </div>

          {/* Right Column: 5 Spans */}
          <div className="lg:col-span-5 flex flex-col gap-[20px] md:gap-[24px]">

            {/* Card: 行程计划 */}
            <div className="bg-white rounded-[16px] md:rounded-[24px] p-[24px] md:p-[32px] shadow-sm md:shadow-[0_12px_30px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center mb-[24px] pb-[16px] border-b border-gray-50">
                <div className="w-[36px] h-[36px] bg-teal-50 rounded-xl flex items-center justify-center mr-[12px] text-teal-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                </div>
                <h2 className="text-[17px] md:text-[19px] font-bold text-gray-800">行程及体征指标</h2>
              </div>
              
              <div className="mb-[20px]">
                <label className="text-[14px] text-gray-700 font-semibold mb-[8px] block">预计海拔落差 (起始 - 最高)</label>
                <div className="flex items-center gap-[12px]">
                  <div className="relative flex-1">
                    <input className="bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#002b5b] focus:ring-[3px] focus:ring-[#002b5b]/10 transition-all rounded-[10px] pl-[12px] pr-[30px] h-[48px] text-[15px] w-full text-gray-800 outline-none placeholder:text-gray-300" type="number" placeholder="起点" value={formData.startAlt} onChange={e => inputChange('startAlt', e.target.value)} />
                    <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-gray-400 font-medium text-[12px]">m</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 rotate-90 sm:rotate-0 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  <div className="relative flex-1">
                    <input className="bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#002b5b] focus:ring-[3px] focus:ring-[#002b5b]/10 transition-all rounded-[10px] pl-[12px] pr-[30px] h-[48px] text-[15px] w-full text-gray-800 outline-none placeholder:text-gray-300" type="number" placeholder="至高点" value={formData.maxAlt} onChange={e => inputChange('maxAlt', e.target.value)} />
                    <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-gray-400 font-medium text-[12px]">m</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[16px]">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[14px] text-gray-700 font-semibold mb-[8px] block">行程用时</label>
                  <div className="relative">
                    <input className="bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#002b5b] focus:ring-[3px] focus:ring-[#002b5b]/10 transition-all rounded-[10px] pl-[16px] pr-[40px] h-[48px] text-[15px] w-full text-gray-800 outline-none placeholder:text-gray-300" type="number" placeholder="到达山顶测算" value={formData.travelDays} onChange={e => inputChange('travelDays', e.target.value)} />
                    <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-gray-400 font-medium text-[12px]">天</span>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[14px] text-gray-700 font-semibold mb-[8px] block">交通上升模式</label>
                   <div className="flex bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] h-[48px] p-1 gap-1">
                    <label className={`flex-1 flex justify-center items-center rounded-lg cursor-pointer transition-all text-[13px] font-medium ${formData.ascentType === 'active' ? 'bg-white shadow-sm text-[#002b5b]' : 'text-gray-500 hover:bg-gray-100'}`}>
                      <input className="hidden" type="radio" value="active" checked={formData.ascentType === 'active'} onChange={e => inputChange('ascentType', e.target.value)} />徒步
                    </label>
                    <label className={`flex-1 flex justify-center items-center rounded-lg cursor-pointer transition-all text-[13px] font-medium ${formData.ascentType === 'passive' ? 'bg-white shadow-sm text-[#002b5b]' : 'text-gray-500 hover:bg-gray-100'}`}>
                      <input className="hidden" type="radio" value="passive" checked={formData.ascentType === 'passive'} onChange={e => inputChange('ascentType', e.target.value)} />乘车/机
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-[20px] pt-[20px] border-t border-gray-100 border-dashed">
                <label className="text-[14px] text-gray-700 font-semibold mb-[12px] block">近期体征状态 (选填，大幅增加精确度)</label>
                <div className="flex items-center gap-[12px] mb-[12px]">
                  <span className="w-[45px] text-[13px] text-gray-500">血压:</span>
                  <input className="bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#002b5b] transition-all rounded-[8px] px-[12px] h-[40px] text-[14px] flex-1 w-0 text-center outline-none" type="number" placeholder="收缩高压" value={formData.sysBP} onChange={e => inputChange('sysBP', e.target.value)} />
                  <span className="text-gray-300">/</span>
                  <input className="bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#002b5b] transition-all rounded-[8px] px-[12px] h-[40px] text-[14px] flex-1 w-0 text-center outline-none" type="number" placeholder="舒张低压" value={formData.diaBP} onChange={e => inputChange('diaBP', e.target.value)} />
                </div>
                <div className="flex items-center gap-[12px]">
                  <span className="w-[45px] text-[13px] text-gray-500">血氧:</span>
                  <div className="relative flex-1">
                    <input className="bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#002b5b] transition-all rounded-[8px] pl-[12px] pr-[35px] h-[40px] text-[14px] w-full outline-none" type="number" placeholder="SpO2数值" value={formData.spo2} onChange={e => inputChange('spo2', e.target.value)} />
                    <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-gray-400 font-medium text-[12px]">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card: 用药追踪 */}
            <div className="bg-white rounded-[16px] md:rounded-[24px] p-[24px] md:p-[32px] shadow-sm md:shadow-[0_12px_30px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center mb-[20px]">
                <div className="w-[32px] h-[32px] bg-rose-50 rounded-xl flex items-center justify-center mr-[12px] text-rose-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h2 className="text-[17px] md:text-[19px] font-bold text-gray-800">用药情况说明</h2>
              </div>
              
              <textarea className="bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#002b5b] focus:ring-[3px] focus:ring-[#002b5b]/10 transition-all rounded-[12px] p-[16px] text-[14px] w-full text-gray-800 h-[70px] outline-none placeholder:text-gray-300 resize-none mb-[12px]" placeholder="预防药预案 (例如：乙酰唑胺 125mg bid)" value={formData.preventMed} onChange={e => inputChange('preventMed', e.target.value)} />
              
              <textarea className="bg-rose-50/30 border border-rose-100 focus:border-rose-300 focus:ring-[3px] focus:ring-rose-200/20 transition-all rounded-[12px] p-[16px] text-[14px] w-full text-gray-800 h-[70px] outline-none placeholder:text-rose-300/80 resize-none" placeholder="降压药或其他救急性药物预案 (慢性病者必填)" value={formData.bpMed} onChange={e => inputChange('bpMed', e.target.value)} />
            </div>

          </div>

          {/* Bottom Card: 健康一票否决项 - Spans all 12 on lg */}
          <div className="lg:col-span-12 bg-white rounded-[16px] md:rounded-[24px] p-[24px] md:p-[40px] shadow-sm md:shadow-[0_12px_30px_rgba(0,0,0,0.03)] border-t-[6px] border-[#002b5b] relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 text-gray-50 opacity-30 pointer-events-none transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
               <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            
            <div className="flex items-center mb-[20px] md:mb-[30px] relative z-10">
              <h2 className="text-[20px] md:text-[24px] font-black text-[#002b5b]">红色预警指标筛查 (指南一票否决项)</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-[30px] md:gap-[50px] relative z-10">
              
              {/* Left Side */}
              <div className="md:col-span-7">
                <span className="text-[14px] md:text-[15px] text-gray-800 font-bold mb-[15px] block bg-red-50 text-red-700 px-3 py-1.5 rounded-md inline-block">若存在以下情况之一，请慎重！</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[16px] gap-x-[20px]">
                  <label className="text-[14px] md:text-[15px] text-gray-700 flex items-center gap-[12px] cursor-pointer group bg-[#f8fafc] p-[10px] rounded-[10px] hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <input className="w-5 h-5 cursor-pointer rounded text-red-500 focus:ring-red-200" type="checkbox" value="bp3" checked={formData.vetoList.includes('bp3')} onChange={e => handleCheckboxChange('vetoList', e.target.value, e.target.checked)} /> 
                    <span className="group-hover:text-red-700 font-medium transition-colors">高血压180/110(未控)</span>
                  </label>
                  <label className="text-[14px] md:text-[15px] text-gray-700 flex items-center gap-[12px] cursor-pointer group bg-[#f8fafc] p-[10px] rounded-[10px] hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <input className="w-5 h-5 cursor-pointer rounded text-red-500 focus:ring-red-200" type="checkbox" value="heart" checked={formData.vetoList.includes('heart')} onChange={e => handleCheckboxChange('vetoList', e.target.value, e.target.checked)} /> 
                    <span className="group-hover:text-red-700 font-medium transition-colors">近3月心脑血管急症</span>
                  </label>
                  <label className="text-[14px] md:text-[15px] text-gray-700 flex items-center gap-[12px] cursor-pointer group bg-[#f8fafc] p-[10px] rounded-[10px] hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <input className="w-5 h-5 cursor-pointer rounded text-red-500 focus:ring-red-200" type="checkbox" value="copd" checked={formData.vetoList.includes('copd')} onChange={e => handleCheckboxChange('vetoList', e.target.value, e.target.checked)} /> 
                    <span className="group-hover:text-red-700 font-medium transition-colors">慢阻肺/哮喘当期发作</span>
                  </label>
                  <label className="text-[14px] md:text-[15px] text-gray-700 flex items-center gap-[12px] cursor-pointer group bg-[#f8fafc] p-[10px] rounded-[10px] hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <input className="w-5 h-5 cursor-pointer rounded text-red-500 focus:ring-red-200" type="checkbox" value="preg" checked={formData.vetoList.includes('preg')} onChange={e => handleCheckboxChange('vetoList', e.target.value, e.target.checked)} /> 
                    <span className="group-hover:text-red-700 font-medium transition-colors">孕妇(特别是妊娠晚期)</span>
                  </label>
                  <label className="text-[14px] md:text-[15px] text-gray-700 flex items-center gap-[12px] cursor-pointer group bg-[#f8fafc] p-[10px] rounded-[10px] hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all sm:col-span-2">
                    <input className="w-5 h-5 cursor-pointer rounded text-red-500 focus:ring-red-200" type="checkbox" value="alz" checked={formData.vetoList.includes('alz')} onChange={e => handleCheckboxChange('vetoList', e.target.value, e.target.checked)} /> 
                    <span className="group-hover:text-red-700 font-medium transition-colors">严重器质性脑/骨病(如阿尔茨海默等行为障碍)</span>
                  </label>
                </div>
              </div>
              
              {/* Vertical Divider for PC */}
              <div className="hidden md:block absolute left-[58%] top-[10%] bottom-[10%] w-[1px] bg-gray-100"></div>
              
              {/* Right Side */}
              <div className="md:col-span-5 md:pl-[10px]">
                <span className="text-[14px] md:text-[15px] text-gray-800 font-bold mb-[15px] block bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md inline-block">当前状态评分 (路易斯湖量表)</span>
                
                <div className="mb-[25px]">
                  <div className="flex justify-between items-center mb-[10px]">
                    <span className="text-[14px] text-gray-600 font-bold">头痛剧烈度 <span className="font-normal text-xs text-gray-400 bg-gray-100 px-1 py-0.5 rounded">0-3</span></span>
                    <span className="text-[20px] font-black text-[#002b5b]">{formData.symptomHeadache}</span>
                  </div>
                  <input type="range" min="0" max="3" value={formData.symptomHeadache} onChange={e => inputChange('symptomHeadache', e.target.value)} className="w-full h-[8px] bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#002b5b]/20" style={{ accentColor: '#002b5b' }} />
                  <div className="flex justify-between text-[12px] text-gray-400 mt-[6px]">
                    <span>正常</span>
                    <span>极重痛</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-[10px]">
                    <span className="text-[14px] text-gray-600 font-bold">胃肠/疲劳/头晕合分 <span className="font-normal text-xs text-gray-400 bg-gray-100 px-1 py-0.5 rounded">0-9</span></span>
                    <span className="text-[20px] font-black text-[#002b5b]">{formData.symptomOthers}</span>
                  </div>
                  <input type="range" min="0" max="9" value={formData.symptomOthers} onChange={e => inputChange('symptomOthers', e.target.value)} className="w-full h-[8px] bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#002b5b]/20" style={{ accentColor: '#002b5b' }} />
                  <div className="flex justify-between text-[12px] text-gray-400 mt-[6px]">
                    <span>正常清醒</span>
                    <span>极度不适</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

        </form>

        {/* Global Submit Action */}
        <div className="mt-[40px] md:mt-[60px] flex flex-col items-center">
          <button 
            className="group relative overflow-hidden bg-gradient-to-r from-[#003B73] to-[#001f42] text-white w-full md:w-[480px] h-[64px] rounded-full text-[18px] md:text-[20px] shadow-[0_12px_25px_rgba(0,43,91,0.3)] hover:shadow-[0_16px_35px_rgba(0,43,91,0.4)] hover:-translate-y-[2px] font-black transition-all duration-300 outline-none flex justify-center items-center gap-2" 
            onClick={executeAssessment}
          >
            {/* Shimmer Effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
            <svg className="w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            启动智慧模型生成报告
          </button>
          <div className="text-[12px] md:text-[13px] text-gray-400 mt-[24px] uppercase tracking-widest font-semibold flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-gray-300"></span>
            Health Analytics System
            <span className="w-8 h-[1px] bg-gray-300"></span>
          </div>
        </div>

      </div>

      {/* Global CSS animation for shimmer */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(400%) skewX(-12deg); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
