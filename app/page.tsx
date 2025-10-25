"use client"

import { ContactForm } from "@/components/contact-form"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  const company = {
    email: "hello@gammahill.com",
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["home", "portfolio", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="home"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-4 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                {/* <div className="text-sm text-muted-foreground font-mono tracking-wider">HOME</div> */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight tracking-tight">
                  From <span className="text-muted-foreground">Ideas</span> into <br />
                  <span className="text-muted-foreground">Scalable</span> products.
                </h1>
              </div>

              <div className="space-y-6 max-w-lg">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  We partner with businesses, individuals and startups to <span className="text-foreground">deliver</span> end-to-end
                  software product development; from concept to launch.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    United Kingdom | Nigeria
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Portfolio */}
        <section
          id="portfolio"
          ref={(el) => { sectionsRef.current[1] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Portfolio</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Pinavel",
                  excerpt: "An AI-powered platform that streamlines exam training, travel booking, and tour guidance.",
                  date: "July 2025",
                  url: "https://pinavel.com"
                },
                {
                  title: "Kanu Energy",
                  excerpt: "An intelligence platform that streamlines renewable energy asset evaluation and acquisition.",
                  date: "March 2025",
                  url: "https://kanu.energy"
                },
                {
                  title: "Gammahill",
                  excerpt: "A hub for incubating innovative solutions in the ecommerce, finance and creative industry.",
                  date: "April 2023",
                  url: "https://gammahill.com"
                },
                {
                  title: "Eloquent Data",
                  excerpt: "A social impact project that provides the tools and resources for data literacy.",
                  date: "September 2020",
                  url: "https://eloquentdata.com"
                },
              ].map((post) => (
                <Link
                  key={post.title}
                  href={post.url}
                  target="_blank"
                >
                  <article
                    key={post.title}
                    className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                        <span>{post.date}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <span>View Project</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>



        {/* Insights */}
        <section
          id="insights"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0 hidden"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Insights</h2>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  title: "AI for productivity boost",
                  author: "BBC",
                  excerpt: "We would be supporting our students with guide and assistance to ensure they submit their study visa application with the right documentation and right timing (no charges required).",
                  published_date: "June 20, 2023",
                },
                {
                  title: "Digital Transformation in Agriculture",
                  author: "Farmcrowdy",
                  excerpt: "We would be supporting our students with guide and assistance to ensure they submit their study visa application with the right documentation and right timing (no charges required).",
                  published_date: "June 18, 2023",
                },
                {
                  title: "How Data is Changing Africa",
                  author: "Eloquent Data",
                  excerpt: "We would be supporting our students with guide and assistance to ensure they submit their study visa application with the right documentation and right timing (no charges required).",
                  published_date: "June 2, 2023",
                },
              ].map((post, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-16 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-12 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{post.title}</h3>
                      <div className="text-muted-foreground">{post.published_date}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-full">{post.excerpt}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap items-center gap-2 lg:justify-center mt-2 lg:mt-0">
                    <svg
                      className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => { sectionsRef.current[3] = el }} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Build the Future Together</h2>

              <div className="space-y-6">

                <div className="space-y-4">
                  <Link
                    href={`mailto:${company.email}`}
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">{company.email}</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8 hidden">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "LinkedIn", handle: "Gammahill", url: "https://www.linkedin.com/company/gammahill/" },
                    { name: "Twitter", handle: "@gammahill", url: "https://twitter.com/gammahill" },
                  ].map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="space-y-2">
                        <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                          {social.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{social.handle}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>



            <div className="space-y-6 sm:space-y-8 mb-24">
              <ContactForm />
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Gammahill Limited. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
