"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchHeader({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Query<span className="text-blue-600">AI</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="w-full max-w-xl px-4">
          <div className="relative flex w-full items-center">
            <Input
              type="text"
              placeholder="Ask anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-full rounded-full border border-gray-300 bg-white pl-4 pr-12 text-sm shadow-sm transition-all focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 h-8 w-8 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={!query.trim()}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </form>
      </div>
    </header>
  )
}

