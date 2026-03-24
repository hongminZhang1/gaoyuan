"use client";

import { useEffect, useRef } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore TagCloud types are missing
import TagCloud from "TagCloud";

interface WordData {
  [key: string]: number;
}

const wordData: WordData = {
  "青藏高原": 120,
  "帕米尔": 85,
  "高原反应": 70,
  "牦牛": 65,
  "雪山": 90,
  "冰川": 78,
  "高原湖泊": 60,
  "藏族文化": 55,
  "经幡": 50,
  "高原生态": 72,
  "氧气稀薄": 48,
  "高原植物": 45,
  "徒步": 68,
  "星空": 80,
  "唐古拉山": 62,
  "布达拉宫": 95,
  "日光城": 88,
  "酥油茶": 60,
  "青稞酒": 52,
  "玛尼堆": 45,
  "朝圣": 70,
  "无人区": 65,
  "可可西里": 82,
  "藏羚羊": 75,
  "珠穆朗玛峰": 110,
  "紫外线": 85,
  "地热温泉": 55,
  "高寒草甸": 62,
  "雅鲁藏布江": 90,
  "纳木错": 86,
  "格桑花": 58,
  "三江源": 92,
  "昆仑山": 80,
  "祁连山": 76,
  "柴达木盆地": 68,
  "高山缺氧": 85,
  "青藏铁路": 105,
  "天路": 72,
  "藏传佛教": 88,
  "唐卡": 60,
  "藏药": 70,
  "冬虫夏草": 95,
  "雪莲": 55,
  "红景天": 82,
  "藏野驴": 45,
  "黑颈鹤": 50,
  "雪豹": 88,
  "高原红": 65,
  "酥油灯": 58,
  "转山": 75,
  "冈仁波齐": 98,
  "羊卓雍措": 85,
  "玛旁雍错": 72,
  "绒布冰川": 60,
  "羌塘": 68,
  "游牧": 55,
  "帐篷": 40,
  "察尔汗盐湖": 66,
  "茶卡盐湖": 86,
  "巴颜喀拉山": 52,
  "念青唐古拉山": 64,
  "藏袍": 48,
  "哈达": 78
};

// Calculate min and max for scaling
const values = Object.values(wordData);
const minVal = Math.min(...values);
const maxVal = Math.max(...values);

// Array of text items built with inline style based on frequency
// We use the 'useHTML' property of TagCloud if it supports it, 
// if not, we can manually manipulate DOM in useEffect
export function WordCloud3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tagCloudInstance = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const currentContainer = containerRef.current;

    const initCloud = () => {
        // Destroy existing instance in strict mode
        if (tagCloudInstance.current) {
            try { tagCloudInstance.current.destroy(); } catch (error) { void error; }
        }
        currentContainer.innerHTML = '';

        const words = Object.keys(wordData);

        // Map values to font sizes
        const getFontSize = (val: number) => {
            const minSize = 10;
            const maxSize = 24;
            return minSize + ((val - minVal) / (maxVal - minVal)) * (maxSize - minSize);
        };

        // Color palette for tech style
        const colors = ["#00f3ff", "#0088ff", "#4db8ff", "#99d6ff", "#00e676", "#b2ff59"];
        
        // Calculate dynamic radius
        const width = window.innerWidth;
        const radius = width < 600 ? width / 2 - 20 : 300;

        const options = {
          radius: radius,
          maxSpeed: "normal" as const,
          initSpeed: "slow" as const,
          direction: 135,
          keep: true,
          useContainerInlineStyles: false,
        };

        tagCloudInstance.current = TagCloud(currentContainer as unknown as Element[], words, options);

        const applyStyles = () => {
            if (!currentContainer) return;
            const items = currentContainer.querySelectorAll('.tagcloud--item');
            items.forEach((item, i) => {
                const word = words[i];
                const val = wordData[word];
                // Slightly smaller fonts on mobile
                const sizeScale = width < 600 ? 0.75 : 1;
                const size = getFontSize(val) * sizeScale;
                const color = colors[i % colors.length];
                const el = item as HTMLElement;
                
                el.style.fontSize = `${size}px`;
                el.style.color = color;
                el.style.textShadow = `0 0 10px ${color}80, 0 0 20px ${color}40`;
                el.style.fontWeight = "bold";
                el.style.fontFamily = "system-ui, sans-serif";
                el.style.cursor = "pointer";
                el.style.transition = "color 0.2s, text-shadow 0.2s, transform 0s"; // Important: don't transition transform because TagCloud updates it constantly
                
                // Hover effects
                el.onmouseenter = () => {
                    el.style.color = "#ffffff";
                    el.style.textShadow = `0 0 15px #ffffff, 0 0 30px #ffffff, 0 0 50px #00f3ff`;
                };
                el.onmouseleave = () => {
                    el.style.color = color;
                    el.style.textShadow = `0 0 10px ${color}80, 0 0 20px ${color}40`;
                };
            });
        };
        
        // TagCloud takes a short time to construct DOM nodes
        setTimeout(applyStyles, 100);
    };

    initCloud();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initCloud, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimer);
        if (tagCloudInstance.current) {
            try {
                tagCloudInstance.current.destroy();
            } catch (error) { void error; }
            if (currentContainer) {
                currentContainer.innerHTML = '';
            }
        }
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden bg-transparent">
        <style jsx global>{`
            .tagcloud {
                display: inline-block;
                color: #fff;
            }
            .tagcloud--item {
                position: absolute;
                top: 0;
                left: 0;
                transform-origin: 50% 50%;
                will-change: transform, opacity;
                padding: 10px;
                user-select: none;
                white-space: nowrap;
                writing-mode: horizontal-tb;
            }
        `}</style>
      <div ref={containerRef} className="z-10 relative tagcloud-wrap" />
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,136,255,0.1)_0,transparent_60%)] pointer-events-none mix-blend-screen" />
    </div>
  );
}
