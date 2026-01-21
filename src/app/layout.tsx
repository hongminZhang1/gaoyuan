import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "高原旅游网",
  description: "厦门大学 高原旅游小挑团队",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={cn(inter.className, "bg-[#406b9e] flex justify-center min-h-screen")}>
        <div className="w-full max-w-[1024px] flex flex-col font-sans min-h-screen">
             <div className="flex-1 bg-white flex flex-col">
                <Navbar />
                <main className="flex-1 p-4">
                    {children}
                </main>
             </div>
             <Footer />
        </div>
      </body>
    </html>
  );
}

