"use client"

import { motion } from "framer-motion"
import { Github, Twitter } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "Girl in Blue",
    description: "Girl in Blue is a simple photo editing project",
    image: "/images/project1.jpg",
    tags: ["Adobe Photoshop", "Alight Motion"],
    githubUrl: "https://x.com/Katounasai/status/1784213710611079412",
  },
  {
    title: "Nike Edit",
    description: "An edit for Nike Air Jordan Chhicago",
    image: "/images/project2.jpg",
    tags: ["After Effects", "Adobe Illustrator", "Alight Motion"],
    githubUrl: "https://x.com/Katounasai/status/1750375468099100988",
  },
  {
    title: "Manga Edit",
    description: "A manga edit for a friend",
    image: "/images/project3.jpg",
    tags: ["Adobe Photoshop", "Alight Motion"],
    githubUrl: "https://x.com/Katounasai/status/1784935536987402252",
  },
  {
    title: "Lattice work on cryptography",
    description: "A sagemath program to solve lattice work on cryptography",
    image: "/images/project4.png",
    tags: ["Python", "SageMath", "Cryptography", "LLL"],
    githubUrl: "https://github.com/Nayekah/Lattice",
  },
  {
    title: "Music Finder based on Midi",
    description: "A simple music finder based on Midi",
    image: "/images/project5.png",
    tags: ["React", "Python", "Tailwind CSS", "FastAPI", "TypeScript"],
    githubUrl: "https://github.com/Nayekah/Algeo02-23090",
  },
  {
    title: "IQ Puzzle solver",
    description: "A simple IQ puzzle solver using Brute Force algorithm",
    image: "/images/project6.png",
    tags: ["Java", "Brute Force", "JavaFX", "Gradle"],
    githubUrl: "https://github.com/Nayekah/Tucil1_13523090",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-32 md:py-52">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
          >
            My Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-muted-foreground"
          >
            A selection of my recent work in both development and editing. Some are personal projects, while others are
            collaborations.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      {index <= 2 ? (
                        <>
                          <Twitter className="mr-2 h-4 w-4" />
                          View on X
                        </>
                      ) : (
                        <>
                          <Github className="mr-2 h-4 w-4" />
                          View on GitHub
                        </>
                      )}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}