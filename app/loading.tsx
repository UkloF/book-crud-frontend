import { Skeleton } from "@/components/ui/skeleton";


export default function Loading() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* ส่วนหัว */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* จำลองตารางหรือการ์ด */}
      <div className="border rounded-xl p-6 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}