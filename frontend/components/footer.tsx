import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between px-4 sm:flex-row sm:px-8">
        <div className="mb-4 text-center sm:mb-0 sm:text-left space-x-8">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} QueryAI. All rights reserved.</p>
        </div>
        <div className="flex items-center space-x-8">
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
  )
}

