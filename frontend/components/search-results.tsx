"use client"

import { MapPin, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface ChatResponse {
  status: string
  intent: string
  confidence: number
  response: string
}

export function SearchResults({ query }: { query: string }) {
  const [response, setResponse] = useState<ChatResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        setLoading(true)
        const res = await fetch('http://localhost:8001/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: query }),
        })
        
        if (!res.ok) {
          throw new Error('Failed to fetch response')
        }
        
        const data = await res.json()
        setResponse(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchResponse()
    }
  }, [query])

  if (loading) {
    return (
      <div className="mb-8 w-full">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Results for "{query}"</h2>
        <Card className="overflow-hidden border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mb-8 w-full">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Results for "{query}"</h2>
        <Card className="overflow-hidden border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="text-red-600">Error: {error}</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mb-8 w-full">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">Results for "{query}"</h2>
      <Card className="overflow-hidden border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div>
            <p className="text-gray-700">{response?.response || "No response available"}</p>
            {response && (
              <div className="mt-4 text-sm text-gray-500">
                <p>Intent: {response.intent}</p>
                <p>Confidence: {(response.confidence * 100).toFixed(2)}%</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LocationResult({ query }: { query: string }) {
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

  return (
    <div>
      <div className="mb-4 flex items-start gap-4">
        <div className="flex-shrink-0 rounded-lg bg-blue-100 p-2 text-blue-600">
          <MapPin className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-900">{locationName}</h3>
          <p className="text-gray-600">
            {locationName} is located in the northern hemisphere, approximately 40.7128° N, 74.0060° W. It is accessible
            via major highways and public transportation.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg">
        <img
          src="/placeholder.svg?height=300&width=600"
          alt={`Map of ${locationName}`}
          className="h-[300px] w-full object-cover"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">Source: OpenStreetMap, 2023</div>
        <a href="#" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800">
          View on Maps <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}

function GeneralResult({ query }: { query: string }) {
  return (
    <div>
      <p className="text-gray-700">Based on your query "{query}", here's what I found:</p>
      <p className="mt-2 text-gray-700">
        The answer to your question involves several factors. First, it's important to understand that this is a concise
        response without overwhelming information. The key points are that your query has been analyzed and this AI tool
        is providing a focused answer.
      </p>
      <p className="mt-2 text-gray-700">
        For more detailed information, you can explore the related content below or refine your search query to be more
        specific.
      </p>
    </div>
  )
}

