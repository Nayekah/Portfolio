"use client"

import { motion } from "framer-motion"
import { Search, Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import Link from "next/link"

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  readTime?: string
  published: boolean
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
  "Elliptic Curve": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  "Python": "bg-green-600/10 text-green-600 border-green-600/20"
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Fetch blog posts from API
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        if (response.ok) {
          const data = await response.json()
          setPosts(data.posts || [])
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        // Fallback to mock data
        setPosts([
          {
            slug: "bsidestlv-2022-sev",
            title: "BSidesTLV 2022 CTF – SEV",
            description: "Steal secret key and get the flag using elliptic curve cryptography vulnerabilities.",
            date: "July 1, 2022",
            author: "radewoosh",
            tags: ["Crypto", "BSidesTLV 2022", "ECC", "Elliptic Curve"],
            readTime: "12 min read",
            published: true
          },
          {
            slug: "sekaictf-2024-processflipper",
            title: "SekaiCTF 2024 – ProcessFlipper",
            description: "The story behind ProcessFlipper challenge in SekaiCTF 2024.",
            date: "September 19, 2024",
            author: "nyancat0131",
            tags: ["Pwn", "CTF", "Windows", "Security"],
            readTime: "5 min read",
            published: true
          },
          {
            slug: "hitcon-ctf-2024-lustrous", 
            title: "HITCON CTF 2024 Quals – Lustrous",
            description: "Convert a negative number into a large number through the memory buffer overflow by exploiting a vulnerability in the Vyper compiler",
            date: "July 23, 2024",
            author: "Y4nhu1",
            tags: ["Blockchain", "Web3", "CTF", "Security"],
            readTime: "8 min read",
            published: true
          },
          {
            slug: "intigriti-0724-xss-challenge",
            title: "Intigriti 0724 – July XSS Challenge", 
            description: "Chaining DOM Clobbering and Relative Path Overwrite to obtain XSS.",
            date: "July 6, 2024",
            author: "lyed",
            tags: ["Web", "XSS", "JavaScript", "Security"],
            readTime: "6 min read",
            published: true
          },
          {
            slug: "advanced-crypto-writeup",
            title: "Advanced Cryptography Challenge Writeup",
            description: "A comprehensive writeup of an advanced cryptography challenge involving ECC and discrete logarithm problems.",
            date: "January 15, 2024",
            author: "Security Researcher",
            tags: ["Crypto", "CTF", "Python", "Security"],
            readTime: "15 min read",
            published: true
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])
  
  const filteredPosts = posts.filter(post =>
    post.published && (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  )

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted-foreground">Loading posts...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Blog Posts
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Technical writeups, security research, and thoughts on cybersecurity challenges.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative max-w-md mx-auto"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-sm"
          />
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/20 h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                    {post.readTime && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className={`text-xs ${
                          tagColors[tag] || "bg-secondary/50 text-secondary-foreground border-secondary"
                        }`}
                      >
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-base leading-relaxed line-clamp-3">
                    {post.description}
                  </CardDescription>
                  
                  <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{post.author}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground text-lg">No posts found matching your search.</p>
        </motion.div>
      )}
    </div>
  )
}