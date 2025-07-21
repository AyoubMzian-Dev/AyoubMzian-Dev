export interface Author {
  name: string
  avatar: string
  bio: string
}

export interface BlogPostType {
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
  author: Author
}
