import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";

// สร้าง Interface ให้ตรงกับ JSON จากหลังบ้านของคุณเป๊ะๆ
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedDate: string;
  totalCopies: number;
  availableCopies: number;
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 🌟 ดักไว้ตรงนี้ ถ้าไม่ใช่ตัวเลข (เช่น เป็นคำว่า "add") ให้ตัดจบเลย
  if (isNaN(Number(id))) {
    notFound();
  }

  const res = await fetch(`http://localhost:3001/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error(`ดึงข้อมูลไม่สำเร็จ! Status Code: ${res.status}`);
  }

  const book = await res.json();

  // 5. แสดงผลหน้าจอ
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      
      {/* ส่วนปุ่มย้อนกลับและหัวข้อ */}
      <div className="flex items-center space-x-4">
        <Link href="/books">
          <Button variant="outline">← ย้อนกลับ</Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">รายละเอียดหนังสือ</h1>
      </div>

      {/* ส่วนการ์ดแสดงรายละเอียด */}
      <Card className="shadow-sm">
        <CardHeader className="bg-slate-50 border-b rounded-t-xl">
          <CardTitle className="text-3xl text-slate-800">{book.title}</CardTitle>
          <CardDescription className="text-base text-slate-600 mt-2">
            เขียนโดย: <span className="font-semibold">{book.author}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* คอลัมน์ซ้าย */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">รหัส ISBN</p>
              <p className="text-lg font-medium">{book.isbn}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">วันที่ตีพิมพ์</p>
              <p className="text-lg">{book.publishedDate}</p>
            </div>
          </div>

          {/* คอลัมน์ขวา */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">จำนวนเล่มทั้งหมดในระบบ</p>
              <p className="text-lg">{book.totalCopies} เล่ม</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">พร้อมให้ยืม (Available)</p>
              <p className="text-2xl font-bold text-green-600">{book.availableCopies} เล่ม</p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}