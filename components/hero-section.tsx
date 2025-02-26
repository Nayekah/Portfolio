"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            Hi, I&apos;m <span className="text-primary">Nayaka Ghana Subrata</span>
          </h1>
          <p className="mb-6 text-xl text-muted-foreground">
            A developer and editor passionate about creating delightful experiences through code and storytelling.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild>
              <a href="#projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/Nayekah" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/nayaka-ghana-subrata-a30801286?originalSubdomain=id"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:nayakaghana39@gmail.com" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary md:h-80 md:w-80">
            <img src="/images/profiles.jpg" alt="Your Name" className="h-full w-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

