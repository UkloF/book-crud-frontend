import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-6xl font-bold text-slate-800">404</h1>
        <h2 className="text-2xl font-semibold text-slate-600">ไม่พบหน้าที่ต้องการ</h2>
        <p className="text-muted-foreground">
          หน้าที่คุณพยายามเข้าถึงไม่มีอยู่จริง หรือหนังสือเล่มนี้อาจถูกลบไปแล้ว
        </p>
      </div>
      
      <Link href="/books">
        <Button size="lg">กลับสู่หน้ารายการหนังสือ</Button>
      </Link>
    </div>
  );
}