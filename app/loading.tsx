import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container flex flex-col h-full animate-pulse">
      <Skeleton className="h-10 mt-4 mb-1 rounded w-1/2"></Skeleton>
      <Skeleton className="h-1 rounded w-full"></Skeleton>
      <div className="grid grid-cols-4 gap-5 py-10">
        {
          [...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-52 rounded" />
          ))
        }
      </div>
    </div>
  )
}