
import { notFound } from "next/navigation"
import { BlogPost } from "@/components/blog-post"
import { RelatedPosts } from "@/components/related-posts"
import type { BlogPostType } from "./types"

interface BlogPageClientProps {
  post: BlogPostType
  relatedPosts: BlogPostType[]
}

export default function BlogPostPageClient({ post, relatedPosts }: BlogPageClientProps) {
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogPost post={post} />
      <RelatedPosts posts={relatedPosts} />
    </div>
  )
}
