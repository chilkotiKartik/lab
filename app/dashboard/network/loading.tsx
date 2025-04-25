import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function NetworkLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      <Skeleton className="h-10 w-full" />

      <Card>
        <CardHeader className="pb-0">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-80 mt-2" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>

          <Skeleton className="h-[500px] w-full rounded-md" />

          <div className="flex items-center justify-center space-x-6 mt-4">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-3 w-3 rounded-full mr-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
