// components/BookList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// กำหนด Type ของข้อมูลให้ตรงกับที่หลังบ้านส่งมา
interface Book {
  id: number;
  title: string;
  author: string;
  totalCopies: number;
  availableCopies: number;
}

export default function BookList({ initialBooks }: { initialBooks: Book[] }) {
  // เอา props ที่รับมา ใส่ใน State เพื่อให้เราแก้ไขมันได้ (เช่น ตอนกดลบ)
  const [books, setBooks] = useState<Book[]>(initialBooks);

  // ฟังก์ชันลบหนังสือ (DELETE)
  const handleDelete = async (id: number) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบหนังสือเล่มนี้?")) return;
    
    try {
      const res = await fetch(`http://localhost:3001/books/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        // อัปเดต State: คัดกรองหนังสือตัวที่ลบออกไปจากตารางทันที
        setBooks((prev) => prev.filter((book) => book.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };

  // ==========================================
  // 3. จัดการ Empty State (ตามโจทย์อาจารย์)
  // ==========================================
  if (books.length === 0) {
    return (
      <div className="border border-dashed rounded-xl p-12 text-center bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <p className="text-lg text-muted-foreground">📭 ยังไม่มีข้อมูลหนังสือในระบบ</p>
        <Link href="/books/add">
          <Button variant="outline">เพิ่มหนังสือเล่มแรกเลย!</Button>
        </Link>
      </div>
    );
  }

  // ==========================================
  // 4. แสดงผลตาราง (Table จาก shadcn/ui)
  // ==========================================
  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ชื่อหนังสือ</TableHead>
            <TableHead>ผู้แต่ง</TableHead>
            <TableHead className="text-center">จำนวนทั้งหมด</TableHead>
            <TableHead className="text-center">พร้อมใช้งาน</TableHead>
            <TableHead className="text-right">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">
                {/* กดที่ชื่อหนังสือเพื่อเข้าไปดูรายละเอียดได้ */}
                <Link href={`/books/${book.id}`} className="hover:underline text-blue-600">
                  {book.title}
                </Link>
              </TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell className="text-center">{book.totalCopies} เล่ม</TableCell>
              <TableCell className="text-center text-green-600 font-medium">
                {book.availableCopies} เล่ม
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="destructive" size="sm" onClick={() => handleDelete(book.id)}>
                  ลบ
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}