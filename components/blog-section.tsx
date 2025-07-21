"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    slug: "building-scalable-nextjs-applications",
    title: "Building Scalable Next.js Applications with TypeScript",
    excerpt:
      "Learn how to structure large Next.js applications using TypeScript for better maintainability and developer experience.",
    content: "In this comprehensive guide, we explore best practices for building scalable Next.js applications...",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Next.js",
    tags: ["Next.js", "TypeScript", "Architecture", "Performance"],
    image: "/blog-nextjs-typescript.png",
    featured: true,
    author: {
      name: "Ayoub Mzian",
      avatar: "/ayoub-avatar.png",
      bio: "Full-Stack Developer & Founder of Web Empire Agency",
    },
  },
  {
    id: 2,
    slug: "modern-web-development-workflow",
    title: "Modern Web Development Workflow with Docker and Vercel",
    excerpt: "Discover how to streamline your development process using Docker containers and Vercel deployment.",
    content:
      "Modern web development requires efficient workflows. Here's how Docker and Vercel can transform your process...",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "DevOps",
    tags: ["Docker", "Vercel", "Deployment", "Workflow"],
    image: "/blog-docker-vercel.png",
    featured: false,
    author: {
      name: "Ayoub Mzian",
      avatar: "/ayoub-avatar.png",
      bio: "Full-Stack Developer & Founder of Web Empire Agency",
    },
  },
  {
    id: 3,
    slug: "figma-to-code-best-practices",
    title: "From Figma to Code: Best Practices for Design Implementation",
    excerpt:
      "Bridge the gap between design and development with these proven techniques for implementing Figma designs.",
    content: "Translating Figma designs into pixel-perfect code requires attention to detail and the right approach...",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Design",
    tags: ["Figma", "UI/UX", "Design Systems", "Frontend"],
    image: "/blog-figma-code.png",
    featured: false,
    author: {
      name: "Ayoub Mzian",
      avatar: "/ayoub-avatar.png",
      bio: "Full-Stack Developer & Founder of Web Empire Agency",
    },
  },
  {
    id: 4,
    slug: "building-web-empire-agency",
    title: "Building Web Empire Agency: Lessons from Starting a Dev Agency",
    excerpt:
      "My journey of founding Web Empire Agency and the key lessons learned while building a successful development agency.",
    content: "Starting a development agency comes with unique challenges and opportunities. Here's what I learned...",
    date: "2023-12-28",
    readTime: "15 min read",
    category: "Business",
    tags: ["Entrepreneurship", "Agency", "Business", "Startup"],
    image: "/blog-web-empire-journey.png",
    featured: true,
    author: {
      name: "Ayoub Mzian",
      avatar: "/ayoub-avatar.png",
      bio: "Full-Stack Developer & Founder of Web Empire Agency",
    },
  },
  {
    id: 5,
    slug: "react-performance-optimization",
    title: "React Performance Optimization: Advanced Techniques",
    excerpt:
      "Deep dive into advanced React performance optimization techniques for building lightning-fast applications.",
    content: "Performance is crucial for user experience. Let's explore advanced React optimization techniques...",
    date: "2023-12-20",
    readTime: "10 min read",
    category: "React",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    image: "/blog-react-performance.png",
    featured: false,
    author: {
      name: "Ayoub Mzian",
      avatar: "/ayoub-avatar.png",
      bio: "Full-Stack Developer & Founder of Web Empire Agency",
    },
  },
  {
    id: 6,
    slug: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns for Better Code Quality",
    excerpt: "Explore advanced TypeScript patterns and techniques to write more maintainable and type-safe code.",
    content: "TypeScript offers powerful features beyond basic typing. Let's explore advanced patterns...",
    date: "2023-12-15",
    readTime: "9 min read",
    category: "TypeScript",
    tags: ["TypeScript", "Patterns", "Code Quality", "Best Practices"],
    image: "/blog-typescript-patterns.png",
    featured: false,
    author: {
      name: "Ayoub Mzian",
      avatar: "/ayoub-avatar.png",
      bio: "Full-Stack Developer & Founder of Web Empire Agency",
    },
  },
]

const categories = ["All", "React", "Backend", "Frontend", "DevOps"]

export function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section id="blog" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, technology, and software engineering.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.featured && <Badge className="absolute top-4 left-4">Featured</Badge>}
                    <Badge variant="secondary" className="absolute top-4 right-4">
                      {post.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="mb-3 line-clamp-2">{post.title}</CardTitle>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="ghost" className="w-full group/button" asChild>
                    <a href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-3 w-3 group-hover/button:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-muted-foreground text-lg">No posts found matching your criteria.</p>
          </motion.div>
        )}

        {/* View All Posts Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" asChild>
            <a href="https://semlerjohnson.dev/rss.xml" target="_blank" rel="noopener noreferrer">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
