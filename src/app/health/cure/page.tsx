import Link from "next/link";

export default function CurePage() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold border-b pb-2 mb-4 border-[#d9bb79] text-[#1c3c66]">高原反应与救治</h1>
      <ul className="space-y-4 text-lg">
        <li><Link href="/article/symptoms" className="text-[#3c5699] hover:underline flex items-center">
            <span className="mr-2">◆</span> 高原反应有哪些症状？
        </Link></li>
      </ul>
    </div>
  );
}
