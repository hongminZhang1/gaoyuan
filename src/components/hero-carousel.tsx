"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartPulse, Mountain } from "lucide-react";

const images = [
  "https://pic.homgzha.cc/pic/gy1.jpg",
  "https://pic.homgzha.cc/pic/gy2.jpg",
  "https://pic.homgzha.cc/pic/gy3.jpg",
  "https://pic.homgzha.cc/pic/gy4.jpg"
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            alt={`高原风光 ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60 z-10" />
      
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl tracking-tight">
          云端之境，安全随行
        </h1>
        <p className="text-lg md:text-2xl text-blue-50 mb-10 drop-shadow-md font-light">
          探索高原的绝美风光，从科学、专业的健康评估开始
        </p>
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6">
          <Link href="/health/evaluate" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-full shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-blue-500/50 flex items-center text-sm sm:text-lg whitespace-nowrap">
            <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 mr-2 shrink-0" />
            健康评估
          </Link>
          <Link href="/travel/route" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 hover:border-white text-white font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-full shadow-lg transition-all hover:scale-105 flex items-center text-sm sm:text-lg whitespace-nowrap">
            <Mountain className="w-5 h-5 sm:w-6 sm:h-6 mr-2 shrink-0" />
            探索路线
          </Link>
        </div>
      </div>

      {/* 轮播指示?*/}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`切换到第 ${index + 1} 张图片`}
          />
        ))}
      </div>
    </div>
  );
}
