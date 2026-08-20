// app/books/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookList from "@/components/BookList"; // Import Component ที่คุณสร้างไว้

export default async function BooksPage() {
  // 1. Fetch ข้อมูลจาก Backend
  // ใส่ cache: 'no-store' เพื่อให้ดึงข้อมูลใหม่ทุกครั้ง (ไม่จำข้อมูลเก่า)
  const res = await fetch("http://localhost:3001/books", { cache: "no-store" });
  const books = await res.json();

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* ส่วนหัวของหน้า */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">📚 จัดการหนังสือ</h1>
          <p className="text-muted-foreground">รายการหนังสือทั้งหมดในระบบของคุณ</p>
        </div>
        
        {/* ปุ่มไปยังหน้า Add Book ที่คุณสร้างโฟลเดอร์เผื่อไว้ */}
        <Link href="/books/add">
          <Button>+ เพิ่มหนังสือใหม่</Button>
        </Link>
      </div>

      {/* 2. โยนข้อมูล books ไปให้ BookList วาดตาราง (เหมือน PlaceList เป๊ะ!) */}
      <BookList initialBooks={books} />
    </div>
  );
}