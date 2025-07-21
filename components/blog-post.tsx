"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Twitter, Linkedin, Link2 } from "lucide-react"
import Image from "next/image"
import ReactMarkdown from "react-markdown"

interface BlogPostProps {
  post: {
    id: number
    slug: string
    title: string
    excerpt: string
    content: string
    date: string
    readTime: string
    category: string
    tags: string[]
    image: string
    featured: boolean
    author: {
      name: string
      avatar: string
      bio: string
    }
  }
}

export function BlogPost({ post }: BlogPostProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = `Check out this article: ${post.title}`

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      copy: shareUrl,
    }

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl)
      // You could add a toast notification here
    } else {
      window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    }
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Button variant="ghost" asChild className="mb-4">
          <a href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </a>
        </Button>
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{post.category}</Badge>
          {post.featured && <Badge>Featured</Badge>}
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>

        <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-muted-foreground">{post.author.bio}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Share Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-center justify-between mb-8 p-4 bg-muted/50 rounded-lg"
      >
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          <span className="text-sm font-medium">Share this article:</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleShare("twitter")}>
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleShare("linkedin")}>
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleShare("copy")}>
            <Link2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="prose prose-lg dark:prose-invert max-w-none mb-8"
      >
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "")
              const language = match ? match[1] : ""

              return !inline ? (
                <div className="relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <code className={`language-${language}`} {...props}>
                      {String(children).replace(/\n$/, "")}
                    </code>
                  </pre>
                  {language && (
                    <div className="absolute top-2 right-2 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
                      {language}
                    </div>
                  )}
                </div>
              ) : (
                <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              )
            },
            h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">{children}</h3>,
            p: ({ children }) => <p className="mb-4 leading-relaxed text-foreground">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-foreground">{children}</ul>,
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 space-y-1 text-foreground">{children}</ol>
            ),
            li: ({ children }) => <li className="text-foreground">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-8"
      >
        <Separator className="mb-6" />
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Author Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-muted/50 rounded-lg p-6 mb-8"
      >
        <div className="flex items-start gap-4">
          <Image
            src={post.author.avatar || "/placeholder.svg"}
            alt={post.author.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold mb-2">About {post.author.name}</h3>
            <p className="text-muted-foreground mb-4">{post.author.bio}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/AyoubMzian-Dev" target="_blank" rel="noopener noreferrer">
                  Follow on GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://web-empire-dev.vercel.app" target="_blank" rel="noopener noreferrer">
                  Visit Web Empire
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  )
}
