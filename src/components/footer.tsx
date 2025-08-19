import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-black via-white/10 to-black border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          <div className="space-y-3 sm:space-y-4 text-center md:text-left md:col-span-2 lg:col-span-1">
            <div className="logo">
              <h2 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent hover:from-blue-200 hover:via-white hover:to-blue-200 transition-all duration-300 cursor-pointer'>
                RoboSoc
              </h2>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto md:mx-0">
              Pioneering the future of robotics and innovation. Building tomorrow's technology today through passionate engineering and collaborative research.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white font-semibold text-lg sm:text-xl text-center md:text-left">Quick Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 text-center md:text-left">
              <a href="/" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 px-2 rounded hover:bg-white/5">Home</a>
              <a href="/projects" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 px-2 rounded hover:bg-white/5">Projects</a>
              <a href="/members" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 px-2 rounded hover:bg-white/5">Members</a>
              <a href="/achievements" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 px-2 rounded hover:bg-white/5">Achievements</a>
              <a href="/Campaign's" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 px-2 rounded hover:bg-white/5">Campaign's</a>
              <a href="/about" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 px-2 rounded hover:bg-white/5">About Us</a>
              <a href="/contact" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base py-1 px-2 rounded hover:bg-white/5">Contact Us</a>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <h3 className="text-white font-semibold text-lg sm:text-xl">Connect With Us</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="text-gray-400 text-sm sm:text-base">
                <span className="block font-medium text-white mb-1">Email:</span>
                <a href="mailto:robosoc@nith.ac.in" className="hover:text-white transition-colors duration-300 break-all">
                  robosoc@nith.ac.in
                </a>
              </div>
              <div className="text-gray-400 text-sm sm:text-base">
                <span className="block font-medium text-white mb-1">Location:</span>
                NIT Hamirpur, Himachal Pradesh
              </div>
            </div>
            
            <div className="flex gap-3 sm:gap-4 pt-3 justify-center md:justify-start">
              <a 
                href="https://www.linkedin.com/company/robosocnith/mycompany/" 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.instagram.com/robosocnith/?hl=en" 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a 
                href="https://github.com/robonith" 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-gray-500/20 transition-all duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 sm:pt-6">
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between items-center text-center sm:text-left">
            <p className="text-gray-400 text-xs sm:text-sm order-2 sm:order-1">&copy; 2025 RoboSoc. All rights reserved.</p>
            <p className="text-gray-400 text-xs sm:text-sm order-1 sm:order-2">Robotics Society - Building the Future</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer