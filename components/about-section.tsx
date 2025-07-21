"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Code, Coffee } from "lucide-react"
import Image from "next/image"

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Docker",
  "Vercel",
  "Figma",
  "Slack",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
]

const stats = [
  { icon: Code, label: "Projects Completed", value: "50+" },
  { icon: Coffee, label: "Cups of Coffee", value: "1000+" },
  { icon: Calendar, label: "Years Experience", value: "5+" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get to know more about my background, experience, and what drives me as a developer.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <Image
                src="https://semlerjohnson.dev/assets/profile.jpg"
                alt="Semler Johnson"
                width={400}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-xl">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Hello! I'm Ayoub Mzian</h3>
              <p className="text-muted-foreground mb-4">
                I'm a passionate full-stack developer and founder of Web Empire Agency. I specialize in building modern
                web applications using cutting-edge technologies like Next.js, TypeScript, and React.
              </p>
              <p className="text-muted-foreground mb-4">
                At Web Empire Agency, we focus on building digital products for startups and businesses. I handle
                everything from design in Figma to deployment with Docker and Vercel, ensuring seamless collaboration
                through tools like Slack.
              </p>
              <p className="text-muted-foreground">
                My mission is to create scalable, beautiful web applications that make a real impact for businesses and
                their users.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Skills & Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4 text-center">
                    <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
