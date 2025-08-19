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
          ? '3px solid transparent'
          : '3px solid rgba(255, 255, 255, 0.1)',
        backgroundImage: isHovered 
          ? `linear-gradient(rgb(0,0,0), rgb(0,0,0)), radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.1) 60%, transparent 80%)`
          : 'linear-gradient(rgb(0,0,0), rgb(0,0,0)), linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
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
    description: "Swarm robotics is an approach to the coordination of multiple robots as a system which consist of large numbers of mostly simple physical robots. It is supposed that a desired collective behavior emerges from the interactions between the robots and interactions of robots with the environment.",
    image: "path/to/image.jpg",
  },
  {
    title: "HUMANIOD ROBOT",
    description: "Humanoid robot is a robot that operates like a human body. These robots must be capable of dealing with a wide range of tasks and objects encountered in dynamic unstructured environments. They require a lightweight body, high flexibility, a variety of sensors, and artificial intelligence.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "S.L.A.M (SIMULTANEOUS LOCALIZATION AND MAPPING)",
    description: "It is the computational problem of constructing or updating a map of an unknown environment while simultaneously keeping track of an agent's location within it. Map data can be used to perform tasks such as path planning and obstacle avoidance.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "DRIVER-LESS CAR",
    description: "A self-driving vehicle that is capable of sensing it's environment and moving with little or no human input. Autonomous cars combine a variety of sensors to perceive their surrounding such as RADAR, computer vision, LADAR, SONAR, odometry and inertial measurement units.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "RUBIC CUBE SOLVER",
    description: "Cube images are captured by a python program module, then color extraction for each sticker is processed by other program module and finally the cube is solved by Kociemba algorithm, the solution is sent to Arduino trough a serial port. Once the solution is received the Arduino code start to be processing the movements, after 6-8 minutes the process finish and the robot show all the faces of the cube solved.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "3-D PRINTER",
    description: "The process of creating three-dimensional solid objects from a digital file is known as 3D printing or additive manufacturing and a device that helps to achieve this is a 3D printer. An object is created in an additive process by laying down successive layers of material until the object is complete. Each of these layers is a thinly sliced cross-section of the object. It allows you to create complex shapes while using less material than traditional manufacturing methods.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "TETRIS",
    description: "A Tetris is a tile-matching puzzle game. The game has a simple goal of destroying lines of block before it reaches the top. The line is made up of a square block. Tetrominoes is the shape of the 4 connected blocks that falls vertically down.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "HOME AUTOMATION",
    description: "Home automation or domestics is building automation for a home, called a smart home or smart house. A home automation system will monitor and/or control home attributes such as lighting, climate, entertainment systems, and appliances. It may also include home security such as access control and alarm systems. When connected with the Internet, home devices are an important constituent of IoT.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "ROBO RACE",
    description: "The goal of the project Rob race is the development of a software, which can move an autonomous vehicle in the driving dynamic limit area on the track. Subprojects, each of which contributes to the overall software architecture of the vehicle. The focus of the final real integration and testing in the Robocar is on the evaluation of the real-time capability, performance and reliability of the algorithms.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "CNC MACHINE",
    description: "The CNC machine is made up of a mini-computer or a microcomputer that serves as the machine's controller unit. The programme of instructions in CNC machines is fed directly into the computer via a small board similar to a traditional keyboard. CNC machines are referred to as 'soft-wired' NC because of their capacity and flexibility.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "LINE FOLLOWER ROBOT",
    description: "A line follower is an automated guided vehicle, which follow a visual line(black line on a white surface or other way) embedded on the floor or ceiling. When IR transmitter is on the black surface IR rays were absorbed by the surface and when it is on white surface these IR rays were reflected. The IR receiver has maximum resistance when no IR rays are received and voltage from VCC flows through the resistor. As the intensity IR rays received by the receiver increases, resistance value decreases and reverse break down occurs.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "MULTI TERRAIN BOT",
    description: "A mobile robot that are capable of showcasing excellent off-road performances. They are able to navigate across bumpy and rough terrains. It is autonomous, will sense its environment with the help of sensors and then will take further decision on its own, with the help of instructions.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "QUADRUPED BOT",
    description: "Quadruped robots can mimic animal walking gait and they have certain advantages like walking on terrain and extremely rough surfaces. Obstacles can impede the movement of wheeled vehicles, where a quadruped can adapt to avoid obstacles by adjusting its height.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "VISION BASED ROBOT",
    description: "By vision robot, we aimed to develop a robot which could read the surrounding by using a camera and respond accordingly. Our robot was programmed to locate and chase a yellow ball which can next be extended to track and follow signs or symbols as required.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "BCI (BRAIN COMPUTER INTERFACE)",
    description: "We propose an innovative, futuristic and cost-effective Brain Computer Interface (BCI) based wheelchair. The wheelchair helps the patient to navigate from one place to another based on motor imagery model to control a brain actuated wheelchair. The wheelchair.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "SELF BALANCING BOT",
    description: "Self-balancing robot is based on the principle of inverted pendulum, which is a two-wheeled vehicle which balances itself up in the vertical position with reference to the ground. It will be prevented from falling by giving acceleration according to its inclination from the vertical.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "ROBOTIC ARM",
    description: "The robotic arm is used for multiple industrial applications, from welding, material handling, and thermal spraying, to painting and drilling. We aim to build the robotic hand which will be controlled using leap motion and Arduino. The robotic arm will have four fingers and a thumb built to approximate dimensions of the human hand all using a 3-D printer.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "ROBOTIC HAND",
    description: "To make a fully functional robotic hand that have enough strength to pick objects. The hand is controlled by Leap Motion + Arduino UNO + Servo Motors and the hand itself will be made by 3-D printing. It will recognize each finger and it can move separately with good precision and sensibility depending on the person who is using it.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "ROBOCON 2018 - Shoot and Pass Shuttles",
    description: "The challenge of ROBOCON 2018 was to shoot and pass the shuttles (ball fixed on a thread) through given rings which were fixed at a distance on poles. Automatic robot with precise locomotion in which a sensor scans the ground for exact positioning. The autonomous robot used a catapult like mechanism to shoot the shuttles through the rings.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "FRISBEE THROWER (ROBOCON 2017 BOT)",
    description: "In ROBOCON 2017, the challenge was to build a Frisbee shooting bot that could land Frisbees on given platforms. For this, we made a manually controlled robot that shoots Frisbee with the help of a fast-rotating disc. A notable thing is its locomotion because it can move in the left and right directions without steering wheel.",
    image: "path/to/another-image.jpg",
  },
  {
    title: "ECO ROBOT & HYBRID ROBOT (ROBOCON 2016 BOT )",
    description: "Robocon (Robotics Contest) is organized by Asia Pacific Broadcasting Union (ABU) every year and is one of the biggest Robotics competitions in Asia. The theme for the year 2016 was 'Clean Energy Recharging the World'. Two robots, Hybrid and ECO Robot were required for this. ECO Robot didn't have any actuator to drive itself hybrid robot was supposed to give it to energy without any physical contact.",
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