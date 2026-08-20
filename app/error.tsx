"use client"; // บังคับใส่เสมอ

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // สามารถส่ง error log ไปยัง service ภายนอกได้ตรงนี้
    console.error("Route Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูล!</h2>
        <p className="text-sm text-muted-foreground">
          {error.message || "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์หลังบ้านได้"}
        </p>
      </div>

      {/* ปุ่มกดเพื่อให้ Next.js ลอง re-render หน้านั้นใหม่อีกครั้ง */}
      <Button onClick={() => reset()} variant="outline">
        ลองใหม่อีกครั้ง (Retry)
      </Button>
    </div>
  );
}