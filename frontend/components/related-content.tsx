import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

// This would normally fetch related content based on the query
// For demo purposes, we're generating mock data
export function RelatedContent({ query }: { query: string }) {
  // Generate related queries based on the original query
  const relatedQueries = generateRelatedQueries(query)

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Related Content</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {relatedQueries.map((item, index) => (
          <Link href={`/search?q=${encodeURIComponent(item.query)}`} key={index}>
            <Card className="h-full cursor-pointer transition-all hover:border-blue-300 hover:shadow-md">
              <CardContent className="flex h-full flex-col p-4">
                <div className="mb-3 h-32 overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={`/placeholder.svg?height=128&width=256&text=${encodeURIComponent(item.title)}`}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="line-clamp-2 text-base font-medium text-gray-900">{item.title}</h3>
                <p className="mt-1 line-clamp-2 flex-grow text-sm text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

function generateRelatedQueries(query: string) {
  const isLocationQuery =
    query.toLowerCase().includes("where") ||
    query.toLowerCase().includes("location") ||
    query.toLowerCase().includes("find")

  if (isLocationQuery) {
    // Extract a location name from the query for demo purposes
    const locationName = query
      .toLowerCase()
      .replace("where is ", "")
      .replace("location of ", "")
      .replace("find ", "")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .trim()

    return [
      {
        query: `history of ${locationName}`,
        title: `History of ${locationName}`,
        description: `Discover the rich historical background and development of ${locationName} through the ages.`,
      },
      {
        query: `things to do in ${locationName}`,
        title: `Top Attractions in ${locationName}`,
        description: `Explore the most popular activities, sights, and experiences in ${locationName}.`,
      },
      {
        query: `how to get to ${locationName}`,
        title: `Travel Guide to ${locationName}`,
        description: `Comprehensive transportation options and routes to reach ${locationName} from various starting points.`,
      },
    ]
  } else {
    // Generic related content for non-location queries
    return [
      {
        query: `${query} examples`,
        title: `Examples of ${query}`,
        description: `Practical examples and case studies related to ${query} for better understanding.`,
      },
      {
        query: `${query} definition`,
        title: `What is ${query}?`,
        description: `Clear definitions and explanations of ${query} and related concepts.`,
      },
      {
        query: `${query} alternatives`,
        title: `Alternatives to ${query}`,
        description: `Explore different options and alternatives related to ${query}.`,
      },
    ]
  }
}

