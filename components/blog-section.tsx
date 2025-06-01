"use client"

import { motion } from "framer-motion"
import { Search, Calendar, Eye, Clock } from "lucide-react"
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
  "Tutorial": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
}

export function BlogSection() {
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
      <section id="blog" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-muted-foreground">Loading posts...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold tracking-tight md:text-5xl"
          >
            All Posts
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative max-w-md"
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 backdrop-blur-sm"
            />
          </motion.div>
        </div>

        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
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
                    
                    <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag, tagIndex) => (
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
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {post.description}
                    </CardDescription>
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
    </section>
  )
}