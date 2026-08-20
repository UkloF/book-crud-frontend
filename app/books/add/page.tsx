"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // สร้าง State สำหรับเก็บข้อมูลแต่ละช่อง
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [totalCopies, setTotalCopies] = useState<number | "">("");
  const [availableCopies, setAvailableCopies] = useState<number | "">("");

  // ฟังก์ชันจัดการเมื่อกดปุ่มบันทึก
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บรีเฟรช
    setLoading(true);
    setErrorMsg("");

    try {
      //  ยิง API ไปที่ /books 
      const res = await fetch("http://localhost:3001/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          isbn,
          publishedDate,
          totalCopies: Number(totalCopies) || 0,
          availableCopies: Number(availableCopies)|| 0,
        }),
      });

      if (!res.ok) {
        throw new Error("บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      }

      // ถ้าบันทึกสำเร็จ ให้กลับไปที่หน้ารายการหนังสือและสั่ง Refresh ข้อมูลใหม่
      router.push("/books");
      router.refresh(); 
      
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/books">
          <Button variant="outline">← ย้อนกลับ</Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">เพิ่มหนังสือใหม่</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลหนังสือ</CardTitle>
          <CardDescription>
            กรอกรายละเอียดของหนังสือที่ต้องการเพิ่มเข้าระบบ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* แสดงข้อความแจ้งเตือนสีแดงถ้าบันทึกพัง */}
            {errorMsg && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
                {errorMsg}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">ชื่อหนังสือ</Label>
                <Input
                  id="title"
                  placeholder="เช่น Harry Potter"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">ชื่อผู้แต่ง</Label>
                <Input
                  id="author"
                  placeholder="เช่น J.K. Rowling"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="isbn">รหัส ISBN</Label>
                <Input
                  id="isbn"
                  placeholder="เช่น 978-3-16-148410-0"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishedDate">วันที่ตีพิมพ์</Label>
                {/* ใช้ type="date" เพื่อให้มี Calendar ขึ้นมาให้กดเลือก */}
                <Input
                  id="publishedDate"
                  type="date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalCopies">จำนวนทั้งหมด (เล่ม)</Label>
                <Input
                  id="totalCopies"
                  type="number"
                  min="1"
                  value={totalCopies}
                  onChange={(e) => setTotalCopies(e.target.value === "" ? "" : Number(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availableCopies">พร้อมให้ยืม (เล่ม)</Label>
                <Input
                  id="availableCopies"
                  type="number"
                  min="0"
                  value={availableCopies}
                  onChange={(e) => setAvailableCopies(e.target.value === "" ? "" : Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "กำลังบันทึกข้อมูล..." : "บันทึกหนังสือใหม่"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}