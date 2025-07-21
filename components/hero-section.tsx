"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Mail, ArrowDown } from "lucide-react"

export function HeroSection() {
  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-background to-muted/20"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I'm <span className="text-primary">Ayoub Mzian</span>
          </motion.h1>

          <motion.h2
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Full-Stack Developer & Founder of Web Empire Agency
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Building modern web apps, designing in Figma, collaborating on Slack, and deploying with Docker & Vercel.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button size="lg" asChild>
              <a href="https://ayoub-dev.vercel.app" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Visit Portfolio
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById("contact")
                if (element) element.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ArrowDown className="h-6 w-6" />
      </motion.button>
    </section>
  )
}
