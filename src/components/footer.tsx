export function Footer() {
  return (
    <footer className="w-full bg-[#1c3c66] text-slate-300 text-center py-10 mt-auto border-t border-[#152e4d]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-4 md:mb-0">
          <h2 className="text-lg font-bold text-white mb-1">高原旅游网</h2>
          <p className="text-sm text-slate-400">云端之境，安全随行 —— 为您的西藏/川西之旅保驾护航</p>
        </div>
        <div className="text-sm text-slate-400 md:text-right">
          <p className="mb-1">版权所有 &copy; 厦门大学 高原旅游小挑团队</p>
          <p>指导老师：张家兴</p>
        </div>
      </div>
    </footer>
  );
}
