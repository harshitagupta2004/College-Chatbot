"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex w-full items-center">
        <div className="relative flex w-full items-center">
          <Input
            type="text"
            placeholder="Ask anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 w-full rounded-full border border-gray-300 bg-white pl-5 pr-16 text-base shadow-sm transition-all focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 h-10 w-10 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            disabled={!query.trim()}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </form>
  )
}

