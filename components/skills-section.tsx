"use client"

import { motion } from "framer-motion"
import { Code, Edit3, Lock, Palette } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const skills = [
  {
    title: "Dev",
    description: "Creating some side projects",
    icon: <Code className="h-10 w-10" />,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Python", "Rust", "C", "C++", "Java"],
  },
  {
    title: "Video and Image Editing",
    description: "Crafting engaging visual stories with love and creativity",
    icon: <Edit3 className="h-10 w-10" />,
    technologies: ["Adobe Premiere Pro", "After Effects", "Adobe Photoshop", "Alight Motion", "Adobe Illustrator"],
  },
  {
    title: "UI/UX Design",
    description: "Designing intuitive and beautiful user experiences",
    icon: <Palette className="h-10 w-10" />,
    technologies: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
  },
  {
    title: "Cyber Security",
    description: "Currently interested in blockchain development",
    icon: <Lock className="h-10 w-10" />,
    technologies: ["Cryptography", "Blockchain", "Network Security"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-32 md:py-52">
      <div className="mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
        >
          My Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-2xl text-muted-foreground"
        >
          A combination of technical expertise and creative abilities that allow me to build and edit digital
          experiences.
        </motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <div className="mb-2 text-primary">{skill.icon}</div>
                <CardTitle>{skill.title}</CardTitle>
                <CardDescription>{skill.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <span key={tech} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

