import React from 'react'

const AboutUs: React.FC = () => {
  return (
    <div className="about-us min-h-screen py-6 sm:py-10 lg:py-16 px-4 sm:px-6 lg:px-8">
       <div className="max-w-6xl mx-auto mb-8 sm:mb-12 lg:mb-16">
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
        <div className="bg-black/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/20 shadow-2xl shadow-white/10">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-gray-300 leading-relaxed">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed">
              <span className="font-semibold text-white">Robotics Society</span> is a platform where students from various domains work together to nurture their technical understanding and culture their innovative ideas and dreams about robotics into reality.
            </p>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              We like to take all steps to <span className="text-white font-medium">excite and accelerate the interest of robotics</span> among young minds.
            </p>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              We facilitate indispensable guidance through <span className="text-white font-medium">workshops and tutorials</span> which help students to take up challenges from day to day life scenarios, orient the challenges to feasible solution form, stimulate their thought process and let them convert their ideas to prototypes by their technical skills, and creativity.
            </p>
            
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white/5 rounded-lg sm:rounded-xl border-l-2 sm:border-l-4 border-white">
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