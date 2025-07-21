"use client"

import { notFound } from "next/navigation"
import BlogPostPageClient from "./page.client"

// Mock blog data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    slug: "building-scalable-nextjs-applications",
    title: "Building Scalable Next.js Applications with TypeScript",
    excerpt:
      "Learn how to structure large Next.js applications using TypeScript for better maintainability and developer experience.",
    content: `
# Building Scalable Next.js Applications with TypeScript

When building large-scale applications, structure and maintainability become crucial factors for long-term success. Next.js combined with TypeScript provides an excellent foundation for creating robust, scalable web applications.

## Why TypeScript Matters

TypeScript brings static typing to JavaScript, which helps catch errors at compile time rather than runtime. This is especially valuable in large applications where bugs can be costly and difficult to track down.

### Key Benefits:
- **Type Safety**: Catch errors before they reach production
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-Documenting Code**: Types serve as inline documentation
- **Easier Refactoring**: Confident code changes with type checking

## Project Structure Best Practices

A well-organized project structure is essential for scalability. Here's a recommended structure for large Next.js applications:

\`\`\`
src/
├── app/                 # App Router pages
├── components/          # Reusable UI components
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── styles/             # Global styles and themes
└── utils/              # Helper functions
\`\`\`

## Component Architecture

### 1. Atomic Design Principles

Organize components using atomic design methodology:
- **Atoms**: Basic building blocks (buttons, inputs)
- **Molecules**: Simple combinations of atoms
- **Organisms**: Complex UI components
- **Templates**: Page-level layouts
- **Pages**: Specific instances of templates

### 2. TypeScript Interfaces

Define clear interfaces for your components:

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline'
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  disabled = false
}) => {
  // Component implementation
}
\`\`\`

## State Management

For large applications, consider these state management approaches:

### 1. Server State vs Client State
- **Server State**: Use React Query or SWR for API data
- **Client State**: Use React's built-in state or Zustand for simple cases

### 2. Context API Usage
Use Context API judiciously to avoid performance issues:

\`\`\`typescript
interface AppContextType {
  user: User | null
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)
\`\`\`

## Performance Optimization

### 1. Code Splitting
Leverage Next.js automatic code splitting and dynamic imports:

\`\`\`typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
\`\`\`

### 2. Image Optimization
Use Next.js Image component for automatic optimization:

\`\`\`typescript
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority
/>
\`\`\`

## Testing Strategy

Implement a comprehensive testing strategy:

### 1. Unit Tests
Test individual components and functions:

\`\`\`typescript
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

test('renders button with correct text', () => {
  render(<Button variant="primary">Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
\`\`\`

### 2. Integration Tests
Test component interactions and API integrations.

### 3. E2E Tests
Use tools like Playwright or Cypress for end-to-end testing.

## Deployment and CI/CD

Set up automated deployment with Vercel or similar platforms:

1. **Automatic Deployments**: Connect your Git repository
2. **Preview Deployments**: Test changes before merging
3. **Environment Variables**: Manage secrets securely
4. **Performance Monitoring**: Track Core Web Vitals

## Conclusion

Building scalable Next.js applications with TypeScript requires careful planning and adherence to best practices. Focus on:

- Clear project structure
- Type safety throughout
- Performance optimization
- Comprehensive testing
- Automated deployment

By following these guidelines, you'll create applications that are maintainable, performant, and ready to scale with your business needs.

---

*Have questions about scaling your Next.js application? Feel free to reach out or check out our services at Web Empire Agency.*
    `,
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
    content: `
# Modern Web Development Workflow with Docker and Vercel

In today's fast-paced development environment, having an efficient workflow is crucial for productivity and reliability. Docker and Vercel have revolutionized how we develop, test, and deploy web applications.

## The Power of Containerization

Docker containers provide consistency across different environments, eliminating the "it works on my machine" problem.

### Benefits of Docker in Development:
- **Environment Consistency**: Same environment across development, staging, and production
- **Easy Onboarding**: New team members can get started quickly
- **Isolation**: Dependencies don't conflict between projects
- **Scalability**: Easy to scale applications horizontally

## Setting Up Your Development Environment

### 1. Dockerfile for Next.js

\`\`\`dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \\
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \\
  elif [ -f package-lock.json ]; then npm ci; \\
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \\
  else echo "Lockfile not found." && exit 1; \\
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
\`\`\`

### 2. Docker Compose for Development

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
\`\`\`

## Vercel Deployment Strategy

Vercel provides seamless deployment with automatic optimizations and global CDN.

### 1. Vercel Configuration

\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
\`\`\`

### 2. Environment Variables

Manage environment variables securely:

\`\`\`bash
# .env.local
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
\`\`\`

## CI/CD Pipeline

### GitHub Actions Workflow

\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
\`\`\`

## Development Best Practices

### 1. Hot Reloading with Docker

Use bind mounts for development to enable hot reloading:

\`\`\`bash
docker run -v $(pwd):/app -p 3000:3000 my-next-app
\`\`\`

### 2. Multi-stage Builds

Optimize Docker images with multi-stage builds to reduce size and improve security.

### 3. Health Checks

Implement health checks for better monitoring:

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/api/health || exit 1
\`\`\`

## Monitoring and Debugging

### 1. Vercel Analytics

Enable Vercel Analytics for performance insights:

\`\`\`typescript
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
\`\`\`

### 2. Error Tracking

Integrate error tracking services like Sentry:

\`\`\`typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
\`\`\`

## Conclusion

A modern development workflow with Docker and Vercel provides:

- **Consistency**: Same environment everywhere
- **Speed**: Fast deployments and builds
- **Reliability**: Automated testing and deployment
- **Scalability**: Easy to scale and maintain

By implementing these practices, you'll have a robust, efficient development workflow that scales with your team and projects.

---

*Need help setting up your development workflow? Web Empire Agency can help you implement these best practices in your projects.*
    `,
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
    slug: "react-performance-optimization",
    title: "React Performance Optimization: Advanced Techniques",
    excerpt:
      "Deep dive into advanced React performance optimization techniques for building lightning-fast applications.",
    content: `
# React Performance Optimization: Advanced Techniques

Performance is crucial for user experience in modern web applications. React provides several built-in optimization techniques, but knowing when and how to use them can make the difference between a sluggish app and a lightning-fast one.

## Understanding React's Rendering Process

Before diving into optimization techniques, it's important to understand how React renders components:

1. **Initial Render**: React creates a virtual DOM representation
2. **Re-render Triggers**: State changes, prop changes, or parent re-renders
3. **Reconciliation**: React compares the new virtual DOM with the previous one
4. **Commit Phase**: React updates the actual DOM with changes

## Key Performance Optimization Techniques

### 1. React.memo for Component Memoization

React.memo prevents unnecessary re-renders by memoizing the component result:

\`\`\`typescript
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  // Expensive calculations or rendering logic
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: expensiveCalculation(item)
    }))
  }, [data])

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.processed}</div>
      ))}
    </div>
  )
})
\`\`\`

### 2. useMemo for Expensive Calculations

Use useMemo to cache expensive computations:

\`\`\`typescript
function DataVisualization({ rawData, filters }) {
  const processedData = useMemo(() => {
    return rawData
      .filter(item => filters.includes(item.category))
      .map(item => ({
        ...item,
        calculated: performExpensiveCalculation(item)
      }))
      .sort((a, b) => b.calculated - a.calculated)
  }, [rawData, filters])

  return <Chart data={processedData} />
}
\`\`\`

### 3. useCallback for Function Memoization

Prevent child re-renders caused by function recreation:

\`\`\`typescript
function TodoList({ todos }) {
  const [filter, setFilter] = useState('all')

  const handleToggle = useCallback((id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }, [])

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'completed') return todo.completed
      if (filter === 'active') return !todo.completed
      return true
    })
  }, [todos, filter])

  return (
    <div>
      {filteredTodos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
}
\`\`\`

## Advanced Optimization Strategies

### 1. Code Splitting with React.lazy

Split your application into smaller chunks:

\`\`\`typescript
const LazyComponent = React.lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
\`\`\`

### 2. Virtual Scrolling for Large Lists

For lists with thousands of items, implement virtual scrolling:

\`\`\`typescript
function VirtualList({ items, itemHeight = 50 }) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerHeight = 400
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(startIndex + visibleCount, items.length)

  const visibleItems = items.slice(startIndex, endIndex)

  return (
    <div 
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}
\`\`\`

### 3. Debouncing User Input

Prevent excessive API calls or state updates:

\`\`\`typescript
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('')
  
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      onSearch(searchQuery)
    }, 300),
    [onSearch]
  )

  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  )
}

function debounce(func, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}
\`\`\`

## Performance Monitoring

### 1. React DevTools Profiler

Use the React DevTools Profiler to identify performance bottlenecks:

- Record component render times
- Identify unnecessary re-renders
- Analyze component update causes

### 2. Web Vitals Monitoring

Track Core Web Vitals in your application:

\`\`\`typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric)
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
\`\`\`

## Bundle Optimization

### 1. Analyze Bundle Size

Use webpack-bundle-analyzer to understand your bundle:

\`\`\`bash
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
\`\`\`

### 2. Tree Shaking

Ensure your imports support tree shaking:

\`\`\`typescript
// Good - tree shakeable
import { debounce } from 'lodash-es'

// Bad - imports entire library
import _ from 'lodash'
\`\`\`

## Best Practices Summary

1. **Profile First**: Use React DevTools to identify actual bottlenecks
2. **Measure Impact**: Always measure the performance impact of optimizations
3. **Avoid Premature Optimization**: Don't optimize until you have a performance problem
4. **Use Production Builds**: Always test performance with production builds
5. **Monitor Continuously**: Set up performance monitoring in production

## Common Pitfalls to Avoid

- **Overusing useMemo/useCallback**: These have their own overhead
- **Mutating Props**: Always use immutable updates
- **Large Component Trees**: Break down large components
- **Inline Objects/Functions**: These cause unnecessary re-renders

## Conclusion

React performance optimization is about understanding when and why components re-render, and applying the right techniques to prevent unnecessary work. Focus on:

- Identifying performance bottlenecks with profiling tools
- Using memoization techniques appropriately
- Implementing code splitting for large applications
- Monitoring performance in production

Remember, the best optimization is often architectural - designing your component structure and state management to minimize unnecessary updates from the start.

---

*Need help optimizing your React application? Web Empire Agency specializes in performance optimization and can help you build lightning-fast applications.*
  `,
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
]

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Ayoub Mzian Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

interface BlogPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3)

  return <BlogPostPageClient post={post} relatedPosts={relatedPosts} />
}
