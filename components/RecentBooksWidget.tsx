"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
}

export default function RecentBooksWidget({ books }: { books: Book[] }) {
  // นำข้อมูลหนังสือมาเรียงลำดับจาก ID ล่าสุด (มากไปน้อย) และตัดมาโชว์แค่ 5 เล่มแรก
  const recentBooks = [...books].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>✨ หนังสือที่เพิ่งเพิ่มล่าสุด</CardTitle>
        <CardDescription>รายการหนังสือ 5 เล่มล่าสุดที่ถูกนำเข้าสู่ระบบ</CardDescription>
      </CardHeader>
      <CardContent>
        {recentBooks.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">ยังไม่มีข้อมูลหนังสือ</p>
        ) : (
          <div className="space-y-4">
            {recentBooks.map((book) => (
              <div key={book.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-slate-800">{book.title}</p>
                  <p className="text-sm text-muted-foreground">เขียนโดย: {book.author}</p>
                </div>
                <Link href={`/books/${book.id}`}>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                    ดูรายละเอียด
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}