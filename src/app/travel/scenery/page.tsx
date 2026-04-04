import Image from "next/image";

export default function SceneryPage() {
  const sceneries = [
    { id: 1, title: "纳木错湖", desc: "西藏第二大湖泊，世界上海拔最高的大型咸水湖", img: "https://pic.homgzha.cc/pic/gy1.jpg" },
    { id: 2, title: "冈仁波齐", desc: "藏传佛教神山，壮丽的冰川与险峻的山峰交相辉映", img: "https://pic.homgzha.cc/pic/gy2.jpg" },
    { id: 3, title: "雅鲁藏布大峡谷", desc: "地球上最深、最长、海拔最高的大峡谷", img: "https://pic.homgzha.cc/pic/gy3.jpg" },
    { id: 4, title: "珠穆朗玛峰", desc: "世界最高峰，雄伟壮观的金字塔形山体", img: "https://pic.homgzha.cc/pic/gy4.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#1E293B] text-white py-8 md:py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-wider">高原风光</h1>
        <p className="text-blue-100/80 text-base md:text-lg max-w-2xl mx-auto font-light">
          探索青藏/川西的绝美自然带，体验冰川、雪山、湖泊交织出的世界级自然遗产。
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sceneries.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer h-[300px] md:h-[400px]">
              <Image 
                src={item.img} 
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-200 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
