import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// 🌟 โจทย์ข้อ 4: ทำ Lazy Load Component พร้อม Skeleton Fallback
const RecentBooksWidget = dynamic(() => import("@/components/RecentBooksWidget"), {
  loading: () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-[250px] w-full rounded-xl" />
    </div>
  ), 
});

export default async function DashboardPage() {
  // ดึงข้อมูลหนังสือทั้งหมดมาคำนวณ
  const res = await fetch("http://localhost:3001/books", { cache: "no-store" });
  const books = await res.json();

  // คำนวณสถิติตามโจทย์
  const totalTitles = books.length;
  const totalCopies = books.reduce((sum: number, book: any) => sum + book.totalCopies, 0);
  const availableCopies = books.reduce((sum: number, book: any) => sum + book.availableCopies, 0);
  const borrowedCopies = totalCopies - availableCopies;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">📊 ภาพรวมระบบคลังหนังสือ</h1>
          <p className="text-muted-foreground mt-1">ยินดีต้อนรับสู่ระบบจัดการหนังสือหลังบ้าน</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/books/add">
            <Button variant="outline">+ เพิ่มหนังสือใหม่</Button>
          </Link>
          <Link href="/books">
            <Button>จัดการหนังสือทั้งหมด</Button>
          </Link>
        </div>
      </div>

      {/* 2. Stat Cards (ข้อมูลสรุป) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">จำนวนปกหนังสือ</CardTitle>
            <span className="text-2xl">📚</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTitles} ปก</div>
            <p className="text-xs text-muted-foreground">ลงทะเบียนในระบบ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">จำนวนเล่มรวมทั้งสิ้น</CardTitle>
            <span className="text-2xl">📦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCopies} เล่ม</div>
            <p className="text-xs text-muted-foreground">หนังสือทั้งหมดในคลัง</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">พร้อมให้บริการ</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availableCopies} เล่ม</div>
            <p className="text-xs text-muted-foreground">สามารถยืมได้ทันที</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ถูกยืมไปแล้ว</CardTitle>
            <span className="text-2xl">📖</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{borrowedCopies} เล่ม</div>
            <p className="text-xs text-muted-foreground">อยู่ระหว่างการยืม</p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Lazy Load Component */}
      <div className="pt-4">
        <RecentBooksWidget books={books} />
      </div>
    </div>
  );
}