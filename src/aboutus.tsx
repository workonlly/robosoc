import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const AboutUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([])
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const title = titleRef.current
    const content = contentRef.current
    const paragraphs = paragraphsRef.current.filter(Boolean)
    const quote = quoteRef.current

    if (!container) return

    // Set initial states
    gsap.set(title, { opacity: 0, y: 50 })
    gsap.set(content, { opacity: 0, scale: 0.9 })
    gsap.set(paragraphs, { opacity: 0, y: 30 })
    gsap.set(quote, { opacity: 0, x: -50 })

    // Create timeline for title animation
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    titleTl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })

    // Content container animation
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: content,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse"
      }
    })

    contentTl.to(content, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    })

    // Stagger paragraphs animation
    paragraphs.forEach((paragraph, index) => {
      gsap.to(paragraph, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: paragraph,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      })
    })

    // Quote animation
    if (quote) {
      gsap.to(quote, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quote,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="about-us min-h-screen py-6 sm:py-10 lg:py-16 px-4 sm:px-6 lg:px-8">
       <div ref={titleRef} className="max-w-6xl mx-auto mb-8 sm:mb-12 lg:mb-16">
        <div className='flex items-center w-full gap-2 sm:gap-4 mb-8 sm:mb-10 lg:mb-12'>
          <div className='bg-white h-8 sm:h-12 lg:h-16 flex-1 rounded-sm shadow-lg'></div>
          <h1 className='text-2xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-white tracking-wider text-center px-2 sm:px-4 lg:px-8'>
            ABOUT US
          </h1>
          <div className='bg-white h-8 sm:h-12 lg:h-16 w-16 sm:w-24 lg:w-32 rounded-sm shadow-lg flex items-center justify-center'>
          </div>
        </div>
      </div>
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="bg-black/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/20 shadow-2xl shadow-white/10">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-gray-300 leading-relaxed">
            <p ref={el => { paragraphsRef.current[0] = el }} className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed">
              <span className="font-semibold text-white">Robotics Society</span> is a platform where students from various domains work together to nurture their technical understanding and culture their innovative ideas and dreams about robotics into reality.
            </p>
            
            <p ref={el => { paragraphsRef.current[1] = el }} className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              We like to take all steps to <span className="text-white font-medium">excite and accelerate the interest of robotics</span> among young minds.
            </p>
            
            <p ref={el => { paragraphsRef.current[2] = el }} className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              We facilitate indispensable guidance through <span className="text-white font-medium">workshops and tutorials</span> which help students to take up challenges from day to day life scenarios, orient the challenges to feasible solution form, stimulate their thought process and let them convert their ideas to prototypes by their technical skills, and creativity.
            </p>
            
            <div ref={quoteRef} className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white/5 rounded-lg sm:rounded-xl border-l-2 sm:border-l-4 border-white">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white italic leading-relaxed">
                "In a nutshell, we're the place where one can let their robot dreams run wild, and we're here to show you how to turn those dreams into real, working prototypes."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs