import { BlogSection } from "@/components/blog-section"
import { Navigation } from "@/components/navigation"

export const metadata = {
  title: "Blog | Ayoub Mzian - Web Development Insights",
  description:
    "Read the latest articles about web development, Next.js, TypeScript, and building scalable applications.",
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <BlogSection />
      </div>
    </main>
  )
}
