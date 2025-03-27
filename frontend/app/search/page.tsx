import { SearchResults } from "@/components/search-results"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { SearchHeader } from "@/components/search-header"
import { RelatedContent } from "@/components/related-content"
import { Suspense } from "react"

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

function RelatedContentSkeleton() {
  return (
    <div className="mt-8 space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams?.q || ""

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SearchHeader initialQuery={query} />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 sm:px-8">
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
        <Suspense fallback={<RelatedContentSkeleton />}>
          <RelatedContent query={query} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

