"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";

function getAuthUserFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )auth_user=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    setUsername(getAuthUserFromCookie());
  }, [pathname]);

  // Set default open group based on current path
  useEffect(() => {
    if (mobileOpen) {
      if (pathname?.startsWith("/travel")) setOpenGroup("travel");
      else if (pathname?.startsWith("/health")) setOpenGroup("health");
      else setOpenGroup(null);
    }
  }, [mobileOpen, pathname]);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUsername(null);
    setMobileOpen(false);
    router.push('/');
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.1)] md:shadow-sm text-slate-800 transition-all duration-300 pb-safe">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 md:h-[72px]">
        {/* Logo - Desktop only or small on mobile */}
        <div className="logo flex items-center shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
             <Image src="/img/logo.jpg" alt="Logo" width={160} height={50} className="h-[36px] md:h-[46px] w-[auto] object-contain mix-blend-multiply" />
          </Link>
        </div>

        {/* 桌面端导航 */}
        <ul className="hidden md:flex items-center h-full">
          <NavItem href="/" label="首页" active={pathname === "/"} />

          <NavDropdown label="高原旅游" active={pathname?.startsWith("/travel")}>
            <DropdownItem href="/travel/scenery" label="高原风光" />
            <DropdownItem href="/travel/environment" label="环境特点" />
            <DropdownItem href="/travel/route" label="线路指南" />
            <DropdownItem href="/travel/traffic" label="交通选择" />
          </NavDropdown>

          <NavDropdown label="高原健康" active={pathname?.startsWith("/health")}>
            <DropdownItem href="/health/study" label="高原反应研究文献" />
            <DropdownItem href="/health/cure" label="高原反应与救治" />
            <DropdownItem href="/health/evaluate" label="身体健康评估" />
          </NavDropdown>

          <NavItem href="/knowledge" label="知识图谱" active={pathname === "/knowledge"} />

          {/* AI 助手 - 桌面端 (Removed) */}

          {username ? (
            <li className="flex items-center h-full pl-6 gap-2 border-l border-gray-200 ml-4">
              <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                <span className="bg-[#e2e8f0] p-1.5 rounded-full"><User className="w-4 h-4 text-[#2563eb]" /></span>
                {username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 ml-3 px-3 py-1.5 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium text-slate-500"
              >
                <LogOut className="w-4 h-4" />
                退出
              </button>
            </li>
          ) : (
            <li className="flex items-center h-full pl-6 border-l border-gray-200 ml-4">
               <Link href="/auth/login" className="flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg">
                 登录 / 注册
               </Link>
            </li>
          )}
        </ul>

        {/* 移动端汉堡按钮 */}
        <button
          className="md:hidden p-2 text-slate-600 hover:text-[#2563eb] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="切换菜单"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 移动端展开菜单 (全屏深蓝背景) */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a192f] fixed inset-0 top-14 w-full h-[calc(100vh-3.5rem)] overflow-hidden z-40">
          <ul className="flex flex-col py-6 px-4 max-h-[calc(100vh-3.5rem)] overflow-y-auto overscroll-contain">
            <MobileNavItem href="/" label="首页" active={pathname === "/"} onClick={() => setMobileOpen(false)} />
            
            <MobileNavGroup 
              label="高原旅游" 
              isOpen={openGroup === "travel"} 
              onToggle={() => setOpenGroup(openGroup === "travel" ? null : "travel")}
            >
              <MobileNavItem href="/travel/scenery" label="高原风光" active={pathname === "/travel/scenery"} onClick={() => setMobileOpen(false)} indent />
              <MobileNavItem href="/travel/environment" label="环境特点" active={pathname === "/travel/environment"} onClick={() => setMobileOpen(false)} indent />
              <MobileNavItem href="/travel/route" label="线路指南" active={pathname === "/travel/route"} onClick={() => setMobileOpen(false)} indent />
              <MobileNavItem href="/travel/traffic" label="交通选择" active={pathname === "/travel/traffic"} onClick={() => setMobileOpen(false)} indent />
            </MobileNavGroup>
            
            <MobileNavGroup 
              label="高原健康" 
              isOpen={openGroup === "health"} 
              onToggle={() => setOpenGroup(openGroup === "health" ? null : "health")}
            >
              <MobileNavItem href="/health/study" label="反应研究文献" active={pathname === "/health/study"} onClick={() => setMobileOpen(false)} indent />
              <MobileNavItem href="/health/cure" label="反应与救治" active={pathname === "/health/cure"} onClick={() => setMobileOpen(false)} indent />
              <MobileNavItem href="/health/evaluate" label="健康评估" active={pathname === "/health/evaluate"} onClick={() => setMobileOpen(false)} indent />
            </MobileNavGroup>
            
            <MobileNavItem href="/knowledge" label="知识图谱" active={pathname === "/knowledge"} onClick={() => setMobileOpen(false)} />
            
            {username ? (
              <div className="mt-6 px-4 pt-6 border-t border-slate-700/50 pb-4">
                <div className="flex items-center gap-3 mb-6 text-slate-200 font-medium tracking-wide">
                  <span className="bg-slate-700/50 p-2 rounded-full"><User className="w-5 h-5 text-[#00f3ff]" /></span>
                  {username}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors font-medium tracking-wide"
                >
                  <LogOut className="w-4 h-4" />
                  退出登录
                </button>
              </div>
            ) : (
              <div className="mt-8 border-t border-slate-700/50 pt-8 px-2">
                 <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center w-full bg-gradient-to-r from-[#00f3ff] to-[#0088ff] text-slate-900 px-5 py-3.5 rounded-xl font-bold shadow-[0_0_20px_rgba(0,136,255,0.4)]">
                   登录 / 注册
                 </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

function NavItem({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <li className="h-full flex items-center">
      <Link
        href={href}
        className={cn(
          "flex items-center px-4 h-full text-[15px] transition-colors",
          active ? "text-[#2563eb] font-bold" : "text-slate-600 font-medium hover:text-[#2563eb]"
        )}
      >
        <span>{label}</span>
      </Link>
    </li>
  );
}

function NavDropdown({ label, children, active }: { label: string; children: React.ReactNode; active?: boolean }) {
  return (
    <li className="relative group h-full flex items-center">
        <button
            className={cn(
               "flex items-center px-4 h-full text-[15px] transition-colors focus:outline-none whitespace-nowrap",
               active ? "text-[#2563eb] font-bold" : "text-slate-600 font-medium group-hover:text-[#2563eb]"
            )}
        >
            <span>{label}</span>
            <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
        </button>
        {/* 透明桥接区域，防止鼠标移出 */}
        <div className="hidden group-hover:block absolute left-0 top-full pt-1">
            <div className="bg-white min-w-[200px] z-50 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                <ul className="flex flex-col">
                    {children}
                </ul>
            </div>
        </div>
    </li>
  );
}

function DropdownItem({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="flex items-center px-5 py-2.5 hover:bg-slate-50 text-slate-600 hover:text-[#2563eb] text-sm transition-colors cursor-pointer">
        {label}
      </Link>
    </li>
  );
}

function MobileNavItem({ href, label, active, onClick, indent }: { href: string; label: string; active?: boolean; onClick?: () => void; indent?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "block py-4 text-[16px] font-medium transition-colors cursor-pointer rounded-xl my-1",
          active ? "text-[#00f3ff] bg-slate-800/50" : "text-slate-300 hover:bg-slate-800/30 hover:text-white",
          indent ? "pl-12 pr-6 border-l-2 border-transparent hover:border-[#00f3ff]" : "px-6"
        )}
      >
        {label}
      </Link>
    </li>
  );
}

function MobileNavGroup({ label, children, isOpen, onToggle }: { label: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void }) {
  return (
    <li className="my-1">
      <button
        className={cn(
          "w-full flex items-center justify-between px-6 py-4 transition-colors font-medium text-[16px] rounded-xl hover:bg-slate-800/30",
          isOpen ? "text-[#00f3ff] bg-slate-800/30" : "text-slate-300 hover:text-white"
        )}
        onClick={onToggle}
      >
        {label}
        <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0")}>
        <ul className="flex flex-col gap-1 pb-2">
          {children}
        </ul>
      </div>
    </li>
  );
}
