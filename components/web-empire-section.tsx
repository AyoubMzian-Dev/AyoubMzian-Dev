"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Rocket, ExternalLink, Code, Palette, MessageSquare, Cloud } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Modern web applications built with Next.js, React, and TypeScript for optimal performance and scalability.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs created in Figma that enhance user experience and drive engagement.",
  },
  {
    icon: MessageSquare,
    title: "Team Collaboration",
    description: "Seamless project management and communication through Slack and modern collaboration tools.",
  },
  {
    icon: Cloud,
    title: "Deployment & DevOps",
    description: "Reliable deployment solutions using Docker, Vercel, and cloud infrastructure for maximum uptime.",
  },
]

const stats = [
  { icon: Building2, label: "Projects Delivered", value: "50+" },
  { icon: Users, label: "Happy Clients", value: "25+" },
  { icon: Rocket, label: "Years Experience", value: "3+" },
]

export function WebEmpireSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Web Empire Agency
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Building Digital Empires</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            As the founder and lead developer of Web Empire Agency, I help startups and businesses build powerful
            digital products that drive growth and success.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mb-16"
        >
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <service.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm text-center">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" asChild>
            <a href="https://web-empire-dev.vercel.app" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Web Empire Agency
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
