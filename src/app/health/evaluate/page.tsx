'use client';

import { useState } from 'react';

export default function EvaluatePage() {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    bloodPressure: 'normal',
    exercise: 'occasional',
    hasHeartDisease: false,
    hasHypertension: false,
    hasAsthma: false,
    hasAnemia: false,
    hasCold: false,
    isPregnant: false,
    isFatigued: false,
    isSmokingDrinking: false,
    hasSevereHighAltitudeSickness: false,
  });

  const [result, setResult] = useState<{ status: 'suitable' | 'caution' | 'not_recommended'; message: string; bmi: number | null } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const age = parseInt(formData.age);
    const height = parseFloat(formData.height) / 100; // to meters
    const weight = parseFloat(formData.weight);
    
    if (!age || !height || !weight) {
      alert('请填写完整的年龄、身高和体重信息');
      return;
    }

    const bmi = weight / (height * height);

    // Analyze conditions
    let status: 'suitable' | 'caution' | 'not_recommended' = 'suitable';
    let reasons: string[] = [];

    // Deal breakers (Not recommended)
    if (formData.hasHeartDisease || formData.hasAsthma || formData.hasAnemia || formData.isPregnant || formData.hasSevereHighAltitudeSickness || formData.bloodPressure === 'severe') {
      status = 'not_recommended';
      reasons.push('存在严重的心脏、呼吸系统或血液疾病，或过往有严重高反史，孕期及重度高血压者不建议前往高原。');
    } else if (formData.hasCold) {
        status = 'not_recommended';
        reasons.push('近期有感冒发烧症状，极易引发肺水肿等严重并发症，强烈建议痊愈后再前往。');
    } else {
        // Caution conditions
        if (age < 12) reasons.push('年龄小于12岁，心肺功能尚未发育完全，请谨慎。');
        if (age > 55) reasons.push('年龄大于55岁，建议行前进行全面体检。');
        
        if (bmi < 18.5) reasons.push(`您的BMI为${bmi.toFixed(1)} (偏瘦)，身体储备可能不足，容易疲惫。`);
        if (bmi >= 28) reasons.push(`您的BMI为${bmi.toFixed(1)} (肥胖)，心脏负荷较大，高反风险较高，请谨慎。`);
        
        if (formData.bloodPressure === 'mild') reasons.push('患有轻度高血压，请备好常用药物，注意监测血压。');
        if (formData.exercise === 'none') reasons.push('平时缺乏运动，身体适应能力可能较弱。');
        if (formData.hasHypertension) reasons.push('有高血压病史，请确保血压控制平稳。');
        if (formData.isFatigued) reasons.push('近期处于疲劳或熬夜状态，免疫力和适应力下降。');
        if (formData.isSmokingDrinking) reasons.push('频繁抽烟喝酒会增加身体耗氧量，进入高原前后请尽量避免。');

        if (reasons.length > 0) {
            status = 'caution';
        }
    }

    let finalMessage = '';
    if (status === 'suitable') {
        finalMessage = '您的身体状况良好，基本具备前往高原旅行的身体条件。但进入高原后仍需注意循序渐进，避免剧烈运动。';
    } else if (status === 'caution') {
        finalMessage = '建议您谨慎前往。\n' + reasons.join('\n');
    } else {
        finalMessage = '基于您的健康状况，为了您的安全，目前不建议您前往高原地区旅行。\n' + reasons.join('\n');
    }

    setResult({ status, message: finalMessage, bmi });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  return (
    <div className="flex flex-col space-y-6 p-4 max-w-4xl mx-auto mb-10">
      <div>
        <h1 className="text-3xl font-bold border-b-2 pb-3 mb-6 border-[#d9bb79] text-[#1c3c66]">高原旅行健康自测评估</h1>
        <p className="text-gray-600 mb-6 bg-blue-50 p-4 rounded-lg">
          高海拔地区氧气稀薄，对人体的呼吸、心血管系统是一项挑战。为了您的安全，请认真如实填写以下信息进行初步的健康评估。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        {/* 一、可量化指标 */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-[#1c3c66] flex items-center">
            <span className="w-1 h-5 bg-[#d9bb79] mr-2 inline-block rounded"></span> 基本信息
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">年龄 (岁)</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded focus:ring-[#d9bb79] focus:border-[#d9bb79] outline-none" placeholder="例如: 30" required min="1" max="120" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">身高 (cm)</label>
              <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full p-2 border rounded focus:ring-[#d9bb79] focus:border-[#d9bb79] outline-none" placeholder="例如: 170" required min="50" max="250" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">体重 (kg)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full p-2 border rounded focus:ring-[#d9bb79] focus:border-[#d9bb79] outline-none" placeholder="例如: 65" required min="20" max="200" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 bg-gray-50 p-3 rounded">
            <strong>BMI参考：</strong> &lt;18.5 偏瘦 | 18.5-23.9 正常 | 24-27.9 超重 | ≥28 肥胖 (过胖或过瘦高反风险都会增加)
          </div>
        </section>

        {/* 二、基础健康 */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-[#1c3c66] flex items-center">
            <span className="w-1 h-5 bg-[#d9bb79] mr-2 inline-block rounded"></span> 基础健康与运动
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">血压情况</label>
              <select name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} className="w-full p-2 border rounded focus:ring-[#d9bb79] focus:border-[#d9bb79] outline-none">
                <option value="normal">正常血压 (含低血压偏正常)</option>
                <option value="mild">轻度高血压 (控制良好)</option>
                <option value="severe">中重度高血压</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">平时运动情况</label>
              <select name="exercise" value={formData.exercise} onChange={handleChange} className="w-full p-2 border rounded focus:ring-[#d9bb79] focus:border-[#d9bb79] outline-none">
                <option value="none">几乎不运动 (日常活动量小)</option>
                <option value="occasional">偶尔运动 (每周1-2次)</option>
                <option value="frequent">经常运动 (规律锻炼，体能较好)</option>
              </select>
            </div>
          </div>
        </section>

        {/* 三、既往病史与当前状态 */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-[#1c3c66] flex items-center">
            <span className="w-1 h-5 bg-[#d9bb79] mr-2 inline-block rounded"></span> 既往病史与生活状态 (若是请勾选)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="hasHeartDisease" checked={formData.hasHeartDisease} onChange={handleChange} className="w-4 h-4 text-[#d9bb79] focus:ring-[#d9bb79] border-gray-300 rounded" />
              <span className="text-gray-700">有无心脏病 / 冠心病史</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="hasHypertension" checked={formData.hasHypertension} onChange={handleChange} className="w-4 h-4 text-[#d9bb79] focus:ring-[#d9bb79] border-gray-300 rounded" />
              <span className="text-gray-700">有无高血压确诊病史</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="hasAsthma" checked={formData.hasAsthma} onChange={handleChange} className="w-4 h-4 text-[#d9bb79] focus:ring-[#d9bb79] border-gray-300 rounded" />
              <span className="text-gray-700">有无哮喘 / 慢性支气管炎等呼吸系统疾病</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="hasAnemia" checked={formData.hasAnemia} onChange={handleChange} className="w-4 h-4 text-[#d9bb79] focus:ring-[#d9bb79] border-gray-300 rounded" />
              <span className="text-gray-700">有无严重贫血</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer text-red-600 font-medium">
              <input type="checkbox" name="hasCold" checked={formData.hasCold} onChange={handleChange} className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
              <span>近期是否感冒 / 发烧咳嗽 (严禁带病上高原)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="isPregnant" checked={formData.isPregnant} onChange={handleChange} className="w-4 h-4 text-[#d9bb79] focus:ring-[#d9bb79] border-gray-300 rounded" />
              <span className="text-gray-700">是否孕妇</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="isFatigued" checked={formData.isFatigued} onChange={handleChange} className="w-4 h-4 text-[#d9bb79] focus:ring-[#d9bb79] border-gray-300 rounded" />
              <span className="text-gray-700">近期是否频繁熬夜 / 极度疲劳</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="isSmokingDrinking" checked={formData.isSmokingDrinking} onChange={handleChange} className="w-4 h-4 text-[#d9bb79] focus:ring-[#d9bb79] border-gray-300 rounded" />
              <span className="text-gray-700">是否抽烟喝酒频繁</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer col-span-1 sm:col-span-2">
              <input type="checkbox" name="hasSevereHighAltitudeSickness" checked={formData.hasSevereHighAltitudeSickness} onChange={handleChange} className="w-4 h-4 text-[#d9bb79] focus:ring-[#d9bb79] border-gray-300 rounded" />
              <span className="text-gray-700">以前上高原是否出现过严重的高原反应 (如肺水肿、脑水肿)</span>
            </label>
          </div>
        </section>

        <button type="submit" className="w-full bg-[#1c3c66] hover:bg-[#152e4d] text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md text-lg">
          一键获取评估结果
        </button>
      </form>

      {/* 评估结果 */}
      {result && (
        <div id="result-section" className={`p-6 rounded-xl shadow-md border-l-4 ${
          result.status === 'suitable' ? 'bg-green-50 border-green-500' : 
          result.status === 'caution' ? 'bg-yellow-50 border-yellow-500' : 
          'bg-red-50 border-red-500'
        }`}>
          <h3 className="text-2xl font-bold mb-3 flex items-center">
            评估结果：
            <span className={
              result.status === 'suitable' ? 'text-green-700' : 
              result.status === 'caution' ? 'text-yellow-700' : 
              'text-red-700'
            }>
              {result.status === 'suitable' ? ' 适合前往 ✅' : 
               result.status === 'caution' ? ' 建议谨慎前往 ⚠️' : 
               ' 不建议前往 ❌'}
            </span>
          </h3>
          
          <div className="mb-4">
            {result.bmi && (
              <p className="font-semibold text-gray-800 mb-2">
                您的BMI指数: <span className="text-[#d9bb79]">{result.bmi.toFixed(2)}</span> 
                <span className="text-gray-600 font-normal text-sm ml-2">
                  ({result.bmi < 18.5 ? '偏瘦' : result.bmi < 24 ? '正常' : result.bmi < 28 ? '超重' : '肥胖'})
                </span>
              </p>
            )}
            <div className="text-gray-700 whitespace-pre-line leading-relaxed">
              {result.message}
            </div>
          </div>
        </div>
      )}

      {/* 知识科普区块 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-3 text-[#1c3c66] border-b pb-2">高原反应常见症状</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li><strong className="text-gray-800">轻度：</strong>头痛、头晕、气短、心悸、恶心呕吐、疲倦乏力、失眠等（大部分人1-3天可适应）。</li>
            <li><strong className="text-gray-800">重度：</strong>持续性剧烈头痛、呼吸困难（静息时也喘）、咳粉红色泡沫痰（肺水肿发病预兆）、神志不清（脑水肿预兆）。<span className="text-red-600 font-medium">一旦发生重度症状，必须立即吸氧并迅速转移至低海拔就医！</span></li>
          </ul>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-3 text-[#1c3c66] border-b pb-2">行前准备建议</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>出发行前一周<strong>停止剧烈运动</strong>，保持良好睡眠，绝对不能感冒！</li>
            <li>刚到高原<strong>慢走、少说话、别急着洗澡</strong>，保持心态平稳。</li>
            <li>多喝热水、多吃富含碳水、维生素的食物，七分饱为宜。</li>
            <li>备好感冒药、肠胃药、头痛药以及高原常备药物（如红景天、高原安，需遵医嘱）。</li>
          </ul>
        </div>
      </div>

      {/* 免责声明 */}
      <div className="bg-gray-100 p-4 rounded-lg text-xs text-gray-500 mt-6 text-center">
        <strong>免责声明：</strong> 本页面提供的健康自测评估结果及所有建议仅供参考，不作为最终的医疗诊断依据。高海拔地区环境复杂，个人体质差异较大。任何健康决定请务必咨询专业医生或医疗机构，遵医嘱执行。因使用本自测结果而产生的任何意外或健康问题，本网站不承担任何法律责任。
      </div>

    </div>
  );
}
