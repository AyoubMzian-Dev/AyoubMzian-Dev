"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react"

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/AyoubMzian-Dev",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ayoub-developer-711040305",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://x.com/Ayoub_Mzian",
    label: "Twitter",
  },
  {
    icon: Mail,
    href: "ayoubmziandeveloper@gmail.com",
    label: "Email",
  },
]

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
]

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Ayoub Mzian</h3>
            <p className="text-muted-foreground mb-6">
              Full-Stack Developer & Founder of Web Empire Agency. Building digital products for startups and businesses
              with modern web technologies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <a href="https://web-empire-dev.vercel.app" className="hover:text-primary transition-colors">
                  web-empire-dev.vercel.app
                </a>
              </p>
              <p>
                <a href="mailto:web.empire.dev@gmail.com" className="hover:text-primary transition-colors">
                  web.empire.dev@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+212773473782" className="hover:text-primary transition-colors">
                  +212 780-360293
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t mt-8 pt-8 text-center text-muted-foreground"
        >
          <p className="flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Ayoub Mzian - Web Empire Agency. Made with{" "}
            <Heart className="h-4 w-4 text-red-500" /> and lots of coffee.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
