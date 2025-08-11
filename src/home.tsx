import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <div className='h-screen flex justify-center items-center flex-col'>
        <div className="text-center space-y-4 max-w-4xl mx-auto px-4">
          <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent hover:from-blue-200 hover:via-white hover:to-blue-200 transition-all duration-300 cursor-pointer mb-3'>
            Welcome to RoboSoc
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
            Pioneering the Future of Robotics and Innovation
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center mt-6">
            <Link 
              to="/projects" 
              onClick={scrollToTop}
              className="px-6 py-2.5 bg-gradient-to-r from-white/20 to-white/10 text-white rounded-xl border border-white/30 shadow-lg shadow-white/20 hover:shadow-white/40 hover:scale-105 transition-all duration-300 backdrop-blur-sm inline-block text-center"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </div>

      <div className='py-16 px-4 bg-gradient-to-br from-black/90 to-black/70 m-4 rounded-2xl shadow-2xl shadow-white/20 backdrop-blur-md border border-white/10'>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Our Purpose
          </h2>
          
          <div className='grid md:grid-cols-2 gap-6 mb-16'>
            <div className='bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:scale-105'>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-white/15">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-white'>Mission</h3>
              </div>
              <p className='text-gray-300 leading-relaxed text-base'>
                Build and sustain a culture to be self-reliant to accomplish our vision, by emphasizing the development of individual quality and fostering innovation in robotics technology.
              </p>
            </div>

            <div className='bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:scale-105'>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-white/15">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-white'>Vision</h3>
              </div>
              <p className='text-gray-300 leading-relaxed text-base'>
                To be a luminary of the Indian society in the field of Robotics, leading breakthrough innovations and inspiring the next generation of engineers.
              </p>
            </div>
          </div>

          <div>
            <div className='flex flex-wrap justify-center gap-6'>
              <div className='group relative'>
                <div className='bg-transparent shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:scale-105 overflow-hidden'>
                  <div className="w-56 h-72 bg-black overflow-hidden">
                    <img src="/professor.webp" alt="Dr. Sant Ram Chauhan" className="w-full h-full object-cover" />
                  </div>
                  <div className='bg-white p-2 mt-2'>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-bold text-lg text-black">Dr. Sant Ram Chauhan</div>
                        <div className="text-xs text-gray-600 mb-2">Faculty Coordinator</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='group relative'>
                <div className='bg-transparent shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:scale-105 overflow-hidden'>
                  <div className="w-56 h-72 bg-black overflow-hidden">
                    <img src="/kashish.webp" alt="Kashish Verma" className="w-full h-full object-cover" />
                  </div>
                  <div className='bg-white p-2 mt-2'>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-bold text-lg text-black">Kashish Verma</div>
                        <div className="text-xs text-gray-600 mb-2">Co-Founder</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='group relative'>
                <div className='bg-transparent shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:scale-105 overflow-hidden'>
                  <div className="w-56 h-72 bg-black overflow-hidden">
                    <img src="/lamy.webp" alt="Late Lamyanba Heisnam" className="w-full h-full object-cover" />
                  </div>
                  <div className='bg-white p-2 mt-2'>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-bold text-lg text-black">Late Lamyanba Heisnam</div>
                        <div className="text-xs text-gray-600 mb-2">Co-Founder</div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 flex flex-row justify-center items-center">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">50+</div>
              <div className="text-gray-400 text-xs md:text-sm">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">25+</div>
              <div className="text-gray-400 text-xs md:text-sm">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">10+</div>
              <div className="text-gray-400 text-xs md:text-sm">Awards Won</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home