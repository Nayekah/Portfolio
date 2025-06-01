import React from 'react'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface BlogPostData {
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  published: boolean
  content: string
  readTime: string
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

async function getBlogPost(slug: string): Promise<BlogPostData | null> {
  try {
    const dataDirectory = path.join(process.cwd(), 'data')
    const filePath = path.join(dataDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContents)
    
    // Check if post is published
    if (frontmatter.published === false) {
      return null
    }

    return {
      title: frontmatter.title || slug,
      description: frontmatter.description || frontmatter.summary || '',
      date: formatDate(frontmatter.date || new Date().toISOString()),
      author: frontmatter.author || frontmatter.authors?.[0] || 'Anonymous',
      tags: frontmatter.tags || [],
      published: frontmatter.published !== false,
      content,
      readTime: calculateReadTime(content)
    }
  } catch (error) {
    console.error('Error reading blog post:', error)
    return null
  }
}

const tagColors: Record<string, string> = {
  "Pwn": "bg-red-500/10 text-red-500 border-red-500/20",
  "Blockchain": "bg-blue-500/10 text-blue-500 border-blue-500/20", 
  "Web": "bg-green-500/10 text-green-500 border-green-500/20",
  "Windows": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "XSS": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "JavaScript": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "CTF": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  "Security": "bg-rose-500/10 text-rose-500 border-rose-500/20",
  "Tutorial": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "Crypto": "bg-purple-600/10 text-purple-600 border-purple-600/20",
  "ECC": "bg-blue-600/10 text-blue-600 border-blue-600/20",
  "Elliptic Curve": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
}

// Simple markdown renderer
function renderContent(content: string): React.ReactElement[] {
  // Remove frontmatter if it exists
  content = content.replace(/^---[\s\S]*?---/, '').trim()
  
  const lines = content.split('\n')
  const elements: React.ReactElement[] = []
  let inCodeBlock = false
  let codeBlockContent: string[] = []
  
  lines.forEach((line, index) => {
    // Handle code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeBlockContent = []
      } else {
        inCodeBlock = false
        elements.push(
          <pre key={`code-${index}`} className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono border">
            <code>
              {codeBlockContent.join('\n')}
            </code>
          </pre>
        )
        codeBlockContent = []
      }
      return
    }
    
    if (inCodeBlock) {
      codeBlockContent.push(line)
      return
    }
    
    // Handle headings
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={index} className="text-3xl font-bold mb-6 mt-8 first:mt-0">
          {line.replace('# ', '')}
        </h1>
      )
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={index} className="text-2xl font-semibold mb-4 mt-8">
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={index} className="text-xl font-semibold mb-3 mt-6">
          {line.replace('### ', '')}
        </h3>
      )
    }
    // Handle blockquotes
    else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground bg-muted/30 p-4 rounded-r-lg">
          {line.replace('> ', '')}
        </blockquote>
      )
    }
    // Handle inline code
    else if (line.includes('`') && !line.startsWith('```')) {
      const parts = line.split('`')
      const formattedLine = parts.map((part, i) => 
        i % 2 === 1 ? 
          <code key={i} className="bg-muted px-2 py-1 rounded text-sm font-mono border">{part}</code> : 
          part
      )
      if (line.trim()) {
        elements.push(
          <p key={index} className="mb-4 leading-relaxed">
            {formattedLine}
          </p>
        )
      }
    }
    // Handle regular paragraphs
    else if (line.trim()) {
      // Handle mathematical expressions (basic)
      let formattedLine = line
      if (line.includes('$')) {
        formattedLine = line.replace(/\$([^$]+)\$/g, '<span class="font-mono bg-muted px-1 py-0.5 rounded text-sm border">$1</span>')
      }
      
      // Handle bold text
      formattedLine = formattedLine.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      
      // Handle italic text
      formattedLine = formattedLine.replace(/\*([^*]+)\*/g, '<em>$1</em>')
      
      // Handle links
      formattedLine = formattedLine.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      
      elements.push(
        <p key={index} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      )
    }
    // Handle empty lines
    else if (line.trim() === '') {
      elements.push(<div key={index} className="h-2" />)
    }
  })
  
  return elements
}

// Updated for Next.js 15 - params is now a Promise
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Button>
        </Link>
      </div>

      {/* Article header */}
      <header className="mb-8">
        <Card>
          <CardHeader className="pb-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <span>by</span>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{post.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-4">
              {post.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`text-xs ${
                    tagColors[tag] || "bg-secondary/50 text-secondary-foreground border-secondary"
                  }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
        </Card>
      </header>

      {/* Article content */}
      <article>
        <Card>
          <CardContent className="pt-6">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {renderContent(post.content)}
            </div>
          </CardContent>
        </Card>
      </article>

      {/* Back to blog link */}
      <div className="mt-12 text-center">
        <Link href="/blog">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Generate static params for all blog posts - Updated for Next.js 15
export async function generateStaticParams() {
  try {
    const dataDirectory = path.join(process.cwd(), 'data')
    
    if (!fs.existsSync(dataDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(dataDirectory)
    const mdxFiles = fileNames.filter(name => name.endsWith('.mdx'))
    
    return mdxFiles.map(fileName => ({
      slug: fileName.replace(/\.mdx$/, '')
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}