"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const featuredPosts = [
  {
    slug: "bsidestlv-2022-sev",
    title: "BSidesTLV 2022 CTF – SEV",
    description: "Steal secret key and get the flag using elliptic curve cryptography vulnerabilities.",
    date: "July 1, 2022",
    author: "radewoosh",
    tags: ["Crypto", "ECC"],
    readTime: "12 min read"
  },
  {
    slug: "sekaictf-2024-processflipper",
    title: "SekaiCTF 2024 – ProcessFlipper",
    description: "The story behind ProcessFlipper challenge in SekaiCTF 2024.",
    date: "September 19, 2024",
    author: "nyancat0131",
    tags: ["Pwn", "Windows"],
    readTime: "5 min read"
  },
  {
    slug: "hitcon-ctf-2024-lustrous",
    title: "HITCON CTF 2024 Quals – Lustrous",
    description: "Convert a negative number into a large number through memory buffer overflow.",
    date: "July 23, 2024",
    author: "Y4nhu1",
    tags: ["Blockchain", "Web3"],
    readTime: "8 min read"
  }
]

const tagColors: Record<string, string> = {
  "Pwn": "bg-red-500/10 text-red-500 border-red-500/20",
  "Blockchain": "bg-blue-500/10 text-blue-500 border-blue-500/20", 
  "Web": "bg-green-500/10 text-green-500 border-green-500/20",
  "Windows": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Crypto": "bg-purple-600/10 text-purple-600 border-purple-600/20",
  "ECC": "bg-blue-600/10 text-blue-600 border-blue-600/20",
  "Web3": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
}

export function BlogPreviewSection() {
  return (
    <section id="blog-preview" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
          >
            Latest Blog Posts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-muted-foreground"
          >
            Technical writeups, security research, and thoughts on cybersecurity challenges.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}