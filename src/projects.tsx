import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Mouse-following glow wrapper component
const GlowCardWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const glowRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const glow = glowRef.current;
    if (!glow) return;
    
    const rect = glow.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    glow.style.setProperty('--glow-x', `${x}px`);
    glow.style.setProperty('--glow-y', `${y}px`);
  };

  return (
    <div className="w-full relative flex items-center justify-center" onMouseMove={handleMouseMove}>
      <div 
        className="absolute inset-0 flex items-center justify-center z-0" 
        ref={glowRef}
        style={{
          '--glow-x': '50%',
          '--glow-y': '50%',
          pointerEvents: 'none',
        } as React.CSSProperties}
      >
        <div
          className="w-11/12 h-5/6 md:w-4/5 md:h-4/5 rounded-2xl md:rounded-3xl blur-[2px] md:blur-[3px]"
          style={{
            background: 'radial-gradient(250px md:300px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,255,255,0.15), transparent 70%)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.03)',
          }}
        />
      </div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

interface ProjectCardProps {
  item: {
    title: string;
    description: string;
    image: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update CSS variables for light effect
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    // Update state for border effect
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden flex flex-col md:flex-row group w-full transition-all duration-500 ease-out hover:shadow-white/20"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        border: isHovered 
          ? '2px md:4px solid transparent'
          : '2px md:4px solid rgba(255, 255, 255, 0.2)',
        backgroundImage: isHovered 
          ? `linear-gradient(rgb(0,0,0), rgb(0,0,0)), radial-gradient(80px md:120px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6) 25%, rgba(255, 255, 255, 0.3) 50%, rgba(209,213,219,0.2) 80%)`
          : 'none',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        transform: isHovered ? 'translateY(-1px) md:translateY(-2px)' : 'translateY(0)',
      } as React.CSSProperties}
    >
      {/* Mouse-following light effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl md:rounded-3xl opacity-80"
        style={{
          background: 'radial-gradient(250px md:350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.3), rgba(255,255,255,0.2) 35%, rgba(255,255,255,0.1) 60%, transparent 80%)',
          boxShadow: isHovered ? '0 0 40px md:80px rgba(255, 255, 255, 0.15)' : '0 0 20px md:40px rgba(255,255,255,0.05)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      {/* Content container */}
      <div className="relative z-20 flex flex-col md:flex-row w-full h-full">
        {/* Text section */}
        <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex-1 flex flex-col justify-center bg-black backdrop-blur-sm rounded-b-2xl md:rounded-l-3xl md:rounded-br-none">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold md:font-extrabold mb-3 md:mb-4 pl-4 sm:pl-5 md:pl-6 py-1.5 md:py-2 relative flex items-center transition-all duration-300">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 sm:h-6 md:h-8 lg:h-10 w-1 sm:w-1.5 md:w-2 rounded-full bg-gradient-to-b from-white via-gray-300 to-gray-600 shadow-md md:shadow-lg shadow-white/30"></span>
            <span className="relative z-10 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 bg-black/20 rounded-lg md:rounded-xl shadow-md md:shadow-lg text-white hover:bg-gray-800/30 hover:shadow-white/20 transition-all duration-300 backdrop-blur-sm border border-gray-500/20 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              {item.title}
            </span>
          </h2>
          <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed font-medium drop-shadow-sm group-hover:text-white transition-colors duration-300 px-1 sm:px-0">
            {item.description}
          </p>
        </div>
        
        {/* Image section */}
        <div className="w-full md:w-72 lg:w-80 xl:w-96 h-48 sm:h-56 md:h-auto bg-black flex items-center justify-center overflow-hidden rounded-t-2xl md:rounded-t-none md:rounded-r-3xl">
          <div className="w-full h-full p-2 md:p-3">
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-full rounded-xl md:rounded-2xl transition-all duration-500 ease-out hover:scale-105 shadow-md md:shadow-lg border border-gray-600/50"
              style={{ 
                minHeight: '180px',
                maxHeight: '220px md:300px',
                filter: 'brightness(0.9) contrast(1.1)',
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-br from-black to-gray-700 rounded-xl md:rounded-2xl flex items-center justify-center">
                    <div class="text-center text-gray-300">
                      <div class="text-2xl md:text-4xl mb-2">🤖</div>
                      <div class="text-xs md:text-sm font-medium px-2">${item.title}</div>
                    </div>
                  </div>
                `;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const projects = [
  {
    title: "SWARM ROBOTICS",
    description: "Swarm robotics is an approach to the coordination of multiple robots as a system which consist of large numbers of mostly simple physical robots. It is supposed that a desired collective behavior emerges from the interactions between the robots and interactions of robots with the environment",
    image: "path/to/image.jpg",
  },
  {
    title: "HUMANOID ROBOT",
    description: "Humanoid robot is a robot that operates like a human body. These robots must be capable of dealing with a wide range of tasks and objects encountered in dynamic unstructured environments. They require a lightweight body, high flexibility, a variety of sensors, and artificial intelligence.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "S.L.A.M",
    description: "Simultaneous Localization and Mapping constructs maps of unknown environments while tracking location. Used for path planning and obstacle avoidance.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "DRIVER-LESS CAR",
    description: "Self-driving vehicle that senses environment and moves autonomously. Combines RADAR, computer vision, LIDAR, SONAR, and inertial measurement units.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "RUBIK CUBE SOLVER",
    description: "Automated cube solver using computer vision for color detection and Kociemba algorithm. Arduino controls mechanical movements to solve the cube.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "3-D PRINTER",
    description: "Additive manufacturing creates solid objects from digital files by laying successive material layers. Enables complex shapes with minimal material waste.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "TETRIS",
    description: "Tile-matching puzzle game with falling tetrominoes. Goal is destroying block lines before reaching the top using various 4-block shapes.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "HOME AUTOMATION",
    description: "Smart home systems monitor and control lighting, climate, entertainment, and security. Connected to IoT for remote access and automation.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "ROBO RACE",
    description: "Autonomous vehicle software development for dynamic driving limits. Focus on real-time capability, performance, and algorithm reliability.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "CNC MACHINE",
    description: "Computer-controlled machine tools with microcomputer controllers. Programmable through keyboard input for precise manufacturing operations.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "LINE FOLLOWER ROBOT",
    description: "Automated guided vehicle following visual lines using IR sensors. Detects surface differences through reflection and resistance changes.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "MULTI TERRAIN BOT",
    description: "Mobile robot with excellent off-road performance. Autonomously navigates rough terrains using environmental sensors and decision algorithms.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "QUADRUPED BOT",
    description: "Four-legged robot mimicking animal gaits. Adapts to obstacles by adjusting height and navigating extremely rough surfaces.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "VISION BASED ROBOT",
    description: "Camera-equipped robot reading surroundings and responding accordingly. Programmed to locate and chase colored objects or track symbols.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "BCI INTERFACE",
    description: "Brain Computer Interface wheelchair using motor imagery. Cost-effective solution helping patients navigate through thought control.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "SELF BALANCING BOT",
    description: "Two-wheeled inverted pendulum robot. Maintains vertical position through acceleration control based on inclination measurements.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "ROBOTIC ARM",
    description: "Industrial robotic arm for welding, material handling, and manufacturing. Controlled using leap motion and Arduino with servo motors.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "ROBOTIC HAND",
    description: "3D-printed robotic hand with four fingers and thumb. Leap Motion controlled with precise finger movement and object manipulation.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "ROBOCON 2018",
    description: "Shuttle shooting robot with catapult mechanism. Autonomous positioning using ground sensors for precise ring targeting.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "FRISBEE THROWER",
    description: "ROBOCON 2017 Frisbee shooting bot with fast-rotating disc mechanism. Features omnidirectional movement without steering wheels.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "ECO & HYBRID ROBOT",
    description: "ROBOCON 2016 clean energy theme robots. ECO robot without actuators receives wireless energy from hybrid robot partner.",
    image: "path/to/another-image.jpg",
  },
];

const Projects: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!title || !cards) return;

    // Set initial states
    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set(cards.children, { opacity: 0, y: 100 });

    // Title animation
    gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Cards stagger animation
    gsap.to(cards.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cards,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse"
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="projects min-h-screen ">
      {/* Header Section */}
      <div ref={titleRef} className="max-w-6xl mx-auto mb-6 sm:mb-8 lg:mb-12 pt-4 px-3 sm:px-4 md:px-5">
        <div className='flex items-center w-full gap-2 sm:gap-4 mb-6 sm:mb-8 lg:mb-10'>
          <div className='bg-white h-6 sm:h-8 md:h-12 lg:h-16 flex-1 rounded-sm shadow-md md:shadow-lg'></div>
          <h1 className='text-xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-white tracking-wider text-center px-2 sm:px-4 lg:px-6'>
            PROJECTS
          </h1>
          <div className='bg-white h-6 sm:h-8 md:h-12 lg:h-16 w-12 sm:w-16 md:w-24 lg:w-32 rounded-sm shadow-md md:shadow-lg flex items-center justify-center'>
          </div>
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-12 md:pb-16">
        <div ref={cardsRef} className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {projects.map((item) => (
            <GlowCardWrapper key={item.title}>
              <ProjectCard item={item} />
            </GlowCardWrapper>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects