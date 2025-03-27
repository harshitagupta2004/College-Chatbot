import { SearchBar } from "@/components/search-bar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <main className="flex w-full flex-1 flex-col items-center px-4 sm:px-8">
        <div className="flex h-[70vh] w-full max-w-5xl flex-col items-center justify-center">
          <div className="mb-8 flex flex-col items-center">
            <h1 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Query<span className="text-blue-600">AI</span>
            </h1>
            <p className="text-center text-lg text-gray-600">Ask anything. Get concise answers.</p>
          </div>
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

