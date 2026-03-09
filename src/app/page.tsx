import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex-col flex items-center">
      <div className="w-full mt-[10px] relative h-[200px] md:h-[400px]">
         <Image src="/img/01.webp.jpg" alt="Home Banner" fill priority sizes="100vw" className="object-cover shadow-sm" />
      </div>
    </div>
  );
}
