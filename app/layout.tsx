import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ใช้ฟอนต์ Inter จาก Google Fonts
import "./globals.css"; // โหลดไฟล์ CSS หลักของระบบ (รวมถึง Tailwind)
import Link from "next/link"; // ใช้ Link แทนแท็ก <a> เพื่อให้เปลี่ยนหน้าได้ไวแบบไม่รีเฟรช

// จุดที่ 2: ตั้งค่าฟอนต์
const inter = Inter({ subsets: ["latin"] });

// จุดที่ 3: ตั้งค่า Metadata (สำหรับ SEO และ Title Bar บนเบราว์เซอร์)
export const metadata: Metadata = {
  title: "Book Management",
  description: "ระบบจัดการคลังหนังสือหลังบ้าน",
};

// จุดที่ 4: สร้าง Component หลัก (ต้องรับ props ชื่อ children เสมอ)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // จุดที่ 5: โครงสร้าง HTML พื้นฐาน (บังคับต้องมี <html> และ <body>)
    <html lang="th">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50`}>
        
        {/* ========================================== */}
        {/* จุดที่ 6: NAVBAR (ส่วนที่จะแสดงทุกหน้า) */}
        {/* ========================================== */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
            {/* โลโก้ / ชื่อระบบ */}
            <Link href="/" className="text-xl font-bold text-slate-800">
              📚 BookAdmin
            </Link>

            {/* เมนูนำทาง */}
            <nav className="space-x-4">
              <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
                หน้าหลัก (Dashboard)
              </Link>
              <Link href="/books" className="text-sm font-medium hover:text-blue-600 transition-colors">
                จัดการหนังสือ (Books)
              </Link>
            </nav>
          </div>
        </header>

        {/* ========================================== */}
        {/* จุดที่ 7: MAIN CONTENT (ส่วนเนื้อหาที่จะเปลี่ยนไปตาม URL) */}
        {/* ========================================== */}
        <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8">
          {children}
        </main>

      </body>
    </html>
  );
}