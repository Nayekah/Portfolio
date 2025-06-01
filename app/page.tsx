import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { BlogPreviewSection } from "@/components/blog-preview-section"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogPreviewSection />
      <ContactSection />
    </div>
  )
}