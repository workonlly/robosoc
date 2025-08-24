import React from 'react'
import { Link } from 'react-router-dom'
import { useLenis } from '../hooks/useLenis'

const Header: React.FC = () => {
  const { scrollToTop } = useLenis();

  return (<>
    <header className="w-full hidden md:block sticky top-3 z-50">
      <nav className='flex items-center justify-between px-6 py-3 mx-3  rounded-xl bg-black/30 backdrop-blur-sm border border-gray-700/50 shadow-2xl'>
        <div className="logo flex items-center space-x-3">
          <img className='h-8 w-8 object-contain transition-all duration-300 cursor-pointer hover:scale-110' src="/logo.png" alt="RoboSoc Logo" />
          <h2 className='text-xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent hover:from-blue-200 hover:via-white hover:to-blue-200 transition-all duration-300 cursor-pointer'>
            RoboSoc
          </h2>
        </div>
        <ul className="flex flex-row space-x-1">
          <li>
            <Link 
              to="/" 
              onClick={scrollToTop}
              className='px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/20 hover:shadow-white/50 hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box'
            >
              Home
            </Link>
          </li>

          <li>
            <Link 
              to="/projects" 
              onClick={scrollToTop}
              className='px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/20 hover:shadow-white/50 hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box'
            >
              Projects
            </Link>
          </li>
         
          <li>
            <Link 
              to="/achievements" 
              onClick={scrollToTop}
              className='px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/20 hover:shadow-white/50 hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box'
            >
              Achievements
            </Link>
          </li>
          
          <li>
            <Link 
              to="/Campaign's" 
              onClick={scrollToTop}
              className='px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/20 hover:shadow-white/50 hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box'
            >
              Campaign's
            </Link>
          </li>
           <li>
            <Link 
              to="/members" 
              onClick={scrollToTop}
              className='px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/20 hover:shadow-white/50 hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box'
            >
              Members
            </Link>
          </li>
                    <li>
            <Link 
              to="/about" 
              onClick={scrollToTop}
              className='px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/20 hover:shadow-white/50 hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box'
            >
              About Us
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              onClick={scrollToTop}
              className='px-3 py-1.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/20 hover:shadow-white/50 hover:ring-2 hover:ring-white/30 rounded-lg transition-all duration-300 border border-transparent hover:border-white/40 backdrop-blur-sm glow-box'
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>

    <header className="fixed left-0 top-0 h-screen w-16 z-50 block md:hidden ">
      <nav className='flex flex-col h-full py-4 bg-gradient-to-b from-black/95 via-black/90 to-black/85 backdrop-blur-md border-r border-white/20 shadow-2xl'>
        <div className="logo mb-6">
          <div className='w-10 h-10 mx-auto bg-gradient-to-br from-white/20 to-white/10 rounded-xl shadow-lg shadow-white/25 flex items-center justify-center border border-white/30'>
            <img className='w-6 h-6 object-contain' src="/logo.png" alt="RoboSoc Logo" />
          </div>
        </div>
        
        <ul className="flex flex-col space-y-3 flex-1 px-2">
          <li>
            <Link 
              to="/" 
              onClick={scrollToTop}
              className='flex items-center justify-center w-full h-10 text-white bg-gradient-to-br from-white/15 to-white/5 shadow-lg shadow-white/20 ring-1 ring-white/30 rounded-xl border border-white/25 backdrop-blur-sm font-medium transition-all duration-300 hover:shadow-white/40 hover:scale-105'
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            </Link>
          </li>
        
          <li>
            <Link 
              to="/projects" 
              onClick={scrollToTop}
              className='flex items-center justify-center w-full h-10 text-white bg-gradient-to-br from-white/15 to-white/5 shadow-lg shadow-white/20 ring-1 ring-white/30 rounded-xl border border-white/25 backdrop-blur-sm font-medium transition-all duration-300 hover:shadow-white/40 hover:scale-105'
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </Link>
          </li>
         
          <li>
            <Link 
              to="/achievements" 
              onClick={scrollToTop}
              className='flex items-center justify-center w-full h-10 text-white bg-gradient-to-br from-white/15 to-white/5 shadow-lg shadow-white/20 ring-1 ring-white/30 rounded-xl border border-white/25 backdrop-blur-sm font-medium transition-all duration-300 hover:shadow-white/40 hover:scale-105'
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </Link>
          </li>
          <li>
            <Link 
              to="/Campaign's" 
              onClick={scrollToTop}
              className='flex items-center justify-center w-full h-10 text-white bg-gradient-to-br from-white/15 to-white/5 shadow-lg shadow-white/20 ring-1 ring-white/30 rounded-xl border border-white/25 backdrop-blur-sm font-medium transition-all duration-300 hover:shadow-white/40 hover:scale-105'
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8.5 13a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" clipRule="evenodd"/>
              </svg>
            </Link>
          </li>
           <li>
            <Link 
              to="/members" 
              onClick={scrollToTop}
              className='flex items-center justify-center w-full h-10 text-white bg-gradient-to-br from-white/15 to-white/5 shadow-lg shadow-white/20 ring-1 ring-white/30 rounded-xl border border-white/25 backdrop-blur-sm font-medium transition-all duration-300 hover:shadow-white/40 hover:scale-105'
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
              </svg>
            </Link>
          </li>
            <li>
            <Link 
              to="/about" 
              onClick={scrollToTop}
              className='flex items-center justify-center w-full h-10 text-white bg-gradient-to-br from-white/15 to-white/5 shadow-lg shadow-white/20 ring-1 ring-white/30 rounded-xl border border-white/25 backdrop-blur-sm font-medium transition-all duration-300 hover:shadow-white/40 hover:scale-105'
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              onClick={scrollToTop}
              className='flex items-center justify-center w-full h-10 text-white bg-gradient-to-br from-white/15 to-white/5 shadow-lg shadow-white/20 ring-1 ring-white/30 rounded-xl border border-white/25 backdrop-blur-sm font-medium transition-all duration-300 hover:shadow-white/40 hover:scale-105'
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    </>
  )
}

export default Header