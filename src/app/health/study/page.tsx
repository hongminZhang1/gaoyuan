import Link from "next/link";

export default function StudyPage() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold border-b pb-2 mb-4 border-[#d9bb79] text-[#1c3c66]">高原反应研究文献汇集</h1>
      <ul className="space-y-4 text-lg">
        <li><Link href="/article/cold" className="text-[#3c5699] hover:underline flex items-center">
            <span className="mr-2">◆</span> 高原地区感冒
        </Link></li>
        <li><Link href="/article/oxygen" className="text-[#3c5699] hover:underline flex items-center">
            <span className="mr-2">◆</span> 高反吸氧，你要知道这些
        </Link></li>
        <li><Link href="/article/asthma" className="text-[#3c5699] hover:underline flex items-center">
             <span className="mr-2">◆</span> 哮喘患者能不能去高原旅游
        </Link></li>
      </ul>
    </div>
  );
}
