import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  readTime?: string
  published: boolean
  content?: string
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  const tag = searchParams.get('tag')
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = parseInt(searchParams.get('offset') || '0')

  try {
    // Get the data directory path
    const dataDirectory = path.join(process.cwd(), 'data')
    
    // Check if data directory exists
    if (!fs.existsSync(dataDirectory)) {
      return NextResponse.json({
        posts: [],
        total: 0,
        limit,
        offset,
        error: 'Data directory not found'
      })
    }

    // Get all .mdx files from data directory
    const fileNames = fs.readdirSync(dataDirectory)
    const mdxFiles = fileNames.filter(name => name.endsWith('.mdx'))

    const posts: BlogPost[] = []

    for (const fileName of mdxFiles) {
      const filePath = path.join(dataDirectory, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      
      // Parse the frontmatter
      const { data: frontmatter, content } = matter(fileContents)
      
      // Only include published posts
      if (frontmatter.published !== false) {
        const slug = fileName.replace(/\.mdx$/, '')
        
        posts.push({
          slug,
          title: frontmatter.title || slug,
          description: frontmatter.description || frontmatter.summary || '',
          date: formatDate(frontmatter.date || new Date().toISOString()),
          author: frontmatter.author || 'Anonymous',
          tags: frontmatter.tags || [],
          readTime: calculateReadTime(content),
          published: frontmatter.published !== false,
          content: frontmatter.includeContent ? content : undefined
        })
      }
    }

    let filteredPosts = [...posts]

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.description.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Apply tag filter
    if (tag) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
      )
    }

    // Sort by date (newest first)
    filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Apply pagination
    const paginatedPosts = filteredPosts.slice(offset, offset + limit)

    return NextResponse.json({
      posts: paginatedPosts,
      total: filteredPosts.length,
      limit,
      offset
    })

  } catch (error) {
    console.error('Error reading blog posts:', error)
    return NextResponse.json(
      { 
        posts: [], 
        total: 0, 
        limit, 
        offset, 
        error: 'Failed to read blog posts' 
      },
      { status: 500 }
    )
  }
}