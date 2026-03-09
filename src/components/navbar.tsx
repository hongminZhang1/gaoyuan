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

  useEffect(() => {
    setUsername(getAuthUserFromCookie());
  }, [pathname]);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUsername(null);
    setMobileOpen(false);
    router.push('/');
    router.refresh();
  }

  return (
    <nav className="bg-[#1c3c66] text-white select-none">
      <div className="container mx-auto max-w-[1000px] flex items-center justify-between px-4 h-[50px] md:h-[65px]">
        <div className="logo flex items-center shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)}>
             <div className="bg-white p-1">
                <Image src="/img/logo.jpg" alt="Logo" width={120} height={38} className="h-[38px] w-[120px] object-contain" />
             </div>
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
            <DropdownItem href="/health/study" label="高原反应研究文献汇集" />
            <DropdownItem href="/health/cure" label="高原反应与救治" />
            <DropdownItem href="/health/evaluate" label="身体健康评估" />
          </NavDropdown>

          {username ? (
            <li className="flex items-center h-full pl-4 gap-1">
              <span className="flex items-center gap-1.5 text-sm text-blue-200 whitespace-nowrap">
                <User className="w-3.5 h-3.5" />
                {username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 ml-2 px-3 h-full hover:bg-[#3c5699] transition-colors text-sm font-medium whitespace-nowrap"
              >
                <LogOut className="w-3.5 h-3.5" />
                退出
              </button>
            </li>
          ) : (
            <NavItem href="/auth/login" label="登录/注册" active={pathname === "/auth/login"} />
          )}
        </ul>

        {/* 移动端汉堡按钮 */}
        <button
          className="md:hidden p-2 rounded hover:bg-[#3c5699] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="切换菜单"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 移动端展开菜单 */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1c3c66] border-t border-[#3c5699]">
          <ul className="flex flex-col">
            <MobileNavItem href="/" label="首页" active={pathname === "/"} onClick={() => setMobileOpen(false)} />
            <MobileNavGroup label="高原旅游" defaultOpen={!!pathname?.startsWith("/travel")}>
              <MobileNavItem href="/travel/scenery" label="高原风光" active={pathname === "/travel/scenery"} onClick={() => setMobileOpen(false)} indent />
              <MobileNavItem href="/travel/environment" label="环境特点" active={pathname === "/travel/environment"} onClick={() => setMobileOpen(false)} indent />
              <MobileNavItem href="/travel/route" label="线路指南" active={pathname === "/travel/route"} onClick={() => setMobileOpen(false)} indent />
              <MobileNavItem href="/travel/traffic" label="交通选择" active={pathname === "/travel/traffic"} onClick={() => setMobileOpen(false)} indent />
            </MobileNavGroup>
            <MobileNavGroup label="高原健康" defaultOpen={!!pathname?.startsWith("/health")}>
              <MobileNavItem href="/health/study" label="高原反应研究文献汇集" active={pathname === "/health/study"} onClick={() => setMobileOpen(false)} indent />
              <MobileNavItem href="/health/cure" label="高原反应与救治" active={pathname === "/health/cure"} onClick={() => setMobileOpen(false)} indent />
              <MobileNavItem href="/health/evaluate" label="身体健康评估" active={pathname === "/health/evaluate"} onClick={() => setMobileOpen(false)} indent />
            </MobileNavGroup>
            {username ? (
              <>
                <li className="px-4 py-3 border-b border-[#3c5699]/30 text-sm text-blue-200 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {username}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-3 hover:bg-[#3c5699] transition-colors border-b border-[#3c5699]/30 text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    退出登录
                  </button>
                </li>
              </>
            ) : (
              <MobileNavItem href="/auth/login" label="登录/注册" active={pathname === "/auth/login"} onClick={() => setMobileOpen(false)} />
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

function NavItem({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <li className="h-full">
      <Link
        href={href}
        className={cn(
          "flex items-center px-6 h-full hover:bg-[#3c5699] transition-colors font-medium whitespace-nowrap",
          active && "bg-[#3c5699]"
        )}
      >
        {label}
      </Link>
    </li>
  );
}

function NavDropdown({ label, children, active }: { label: string; children: React.ReactNode; active?: boolean }) {
  return (
    <li className="relative group h-full">
        <button
            className={cn(
            "flex items-center px-6 h-full hover:bg-[#3c5699] transition-colors font-medium focus:outline-none whitespace-nowrap",
            active && "bg-[#3c5699]"
            )}
        >
            {label}
            <ChevronDown className="ml-1 w-4 h-4" />
        </button>
        <div className="hidden group-hover:block absolute left-0 top-full bg-[#1c3c66] min-w-[220px] z-50 shadow-lg border-t border-[#3c5699]">
            <ul className="flex flex-col py-1">
                {children}
            </ul>
        </div>
    </li>
  );
}

function DropdownItem({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="block px-4 py-3 hover:bg-[#3c5699] text-white text-sm transition-colors text-center border-b border-[#3c5699]/30 last:border-0">
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
          "block py-3 border-b border-[#3c5699]/30 hover:bg-[#3c5699] transition-colors",
          active && "bg-[#3c5699]",
          indent ? "px-8" : "px-4"
        )}
      >
        {label}
      </Link>
    </li>
  );
}

function MobileNavGroup({ label, children, defaultOpen }: { label: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <li>
      <button
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#3c5699] transition-colors border-b border-[#3c5699]/30 font-medium"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <ul className="bg-[#162d52]">
          {children}
        </ul>
      )}
    </li>
  );
}
