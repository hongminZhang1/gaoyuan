"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#1c3c66] text-white select-none">
      <div className="container mx-auto max-w-[1000px] flex items-center justify-between px-4 h-[50px] md:h-[65px]">
        <div className="logo flex items-center shrink-0">
          <Link href="/">
             {/* Using standard img tag for simplicity with legacy assets if dimensions unknown, 
                 but Image is better. Assuming roughly 150x45 based on css */}
             <div className="bg-white p-1">
                <img src="/img/logo.jpg" alt="Logo" className="h-[38px] w-[120px] object-contain" />
             </div>
          </Link>
        </div>
        
        <ul className="flex items-center h-full">
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

          <NavItem href="/auth/login" label="登录/注册" active={pathname === "/auth/login"} />
        </ul>
      </div>
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
  )
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
