"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ExternalLink, Github, Eye } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "1337-portfolio",
    description:
      "Personal portfolio built with Next.js, Tailwind, and TypeScript. Showcases my work, skills, and contact info.",
    longDescription:
      "A comprehensive personal portfolio website built using Next.js, Tailwind CSS, and TypeScript. Features a modern design, responsive layout, project showcase, skills section, and contact information. Optimized for performance and SEO.",
    image: "/1337-portfolio-screenshot.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Vercel"],
    category: "Full-Stack",
    liveUrl: "https://ayoub-dev.vercel.app",
    codeUrl: "https://github.com/AyoubMzian-Dev/1337-portfolio",
    featured: true,
  },
  {
    id: 2,
    title: "HyperMind-nextJS",
    description: "Advanced Next.js app using TypeScript. Modern UI, scalable architecture.",
    longDescription:
      "An advanced Next.js application built with TypeScript featuring a modern user interface and scalable architecture. Implements best practices for performance, maintainability, and user experience.",
    image: "/hypermind-nextjs-screenshot.png",
    technologies: ["Next.js", "TypeScript", "React", "Modern UI", "Scalable Architecture"],
    category: "Full-Stack",
    liveUrl: "https://hypermind-nextjs.vercel.app",
    codeUrl: "https://github.com/AyoubMzian-Dev/HyperMind-nextJS",
    featured: true,
  },
  {
    id: 3,
    title: "Web Empire Agency Website",
    description: "Corporate website for Web Empire Agency showcasing services and portfolio.",
    longDescription:
      "Professional corporate website for Web Empire Agency built with modern web technologies. Features service offerings, portfolio showcase, client testimonials, and contact information for digital product development.",
    image: "/web-empire-agency-screenshot.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Modern Design"],
    category: "Full-Stack",
    liveUrl: "https://web-empire-dev.vercel.app",
    codeUrl: "https://github.com/AyoubMzian-Dev/web-empire-agency",
    featured: true,
  },
]

const categories = ["All", "Full-Stack", "Frontend", "Backend", "Mobile", "AI/ML"]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience in web development.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {project.featured && <Badge className="absolute top-4 left-4">Featured</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="mb-2">{project.title}</CardTitle>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-2">
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Live Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-3 w-3" />
                        Code
                      </a>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="ghost" onClick={() => setSelectedProject(project)}>
                          <Eye className="mr-2 h-3 w-3" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{project.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={600}
                            height={300}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <p className="text-muted-foreground">{project.longDescription}</p>
                          <div>
                            <h4 className="font-semibold mb-2">Technologies Used:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Live
                              </a>
                            </Button>
                            <Button variant="outline" asChild>
                              <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                View Code
                              </a>
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
