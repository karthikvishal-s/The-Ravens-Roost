import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Heart, Code, Coffee, Moon, Star, BookOpen, Github, ExternalLink, Mail, Linkedin, Twitter, Database, Zap, Crown, Sword, Shield, } from 'lucide-react';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaGithub, FaTerminal
} from "react-icons/fa";
import {
  SiFirebase, SiTailwindcss, SiMongodb, SiExpress, SiNextdotjs, SiPython, SiCplusplus, SiC,SiVercel,SiJsonwebtokens,SiPostman,
} from "react-icons/si";

export default function Creator() {
  const [loaded, setLoaded] = useState(false);
  const [sectionLoaded, setSectionLoaded] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded) {
      const sections = ['hero', 'story', 'journey', 'philosophy', 'vision'];
      sections.forEach((section, index) => {
        setTimeout(() => {
          setSectionLoaded(prev => ({ ...prev, [section]: true }));
        }, index * 400);
      });
    }
  }, [loaded]);

  const techStack = [
    {
      icon: <SiNextdotjs className="w-12 h-12" />,
      title: "Next.js",
      //description: "The Iron Framework - Forged for the realm's most demanding applications"
    },
    {
      icon: <FaReact className="w-12 h-12" />,
      title: "React.js",
      //description: "Like Valyrian steel - Sharp, reliable, and cuts through complexity"
    },
    {
      icon: <SiTailwindcss className="w-12 h-12" />,
      title: "Tailwind CSS",
      //description: "Styling as swift as a Faceless Man's blade"
    },
    {
      icon: <SiMongodb className="w-12 h-12" />,
      title: "MongoDB",
      //description: "The Iron Bank of data - Vast, secure, and always remembers"
    },
    {
      icon: <FaNodeJs className="w-12 h-12" />,
      title: "Node.js",
      //description: "The engine that powers the realm's digital ravens"
    },
    {
      icon: <SiExpress className="w-12 h-12" />,
      title: "Express.js",
      //description: "Swift as a raven's flight across the Seven Kingdoms"
    },
    {
      icon: <SiVercel className="w-12 h-12" />,
      title: "Vercel",
      //description: "Deployment worthy of the Iron Throne"
    },
    {
      icon: <SiPostman className="w-12 h-12" />,
      title: "Postman",
      ////description: "Testing APIs like a maester tests potions"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      url: "https://github.com/karthikvishal-s",
      color: "hover:text-red-400",
      //house: "House of Code"
    },
    {
      icon: <ExternalLink className="w-6 h-6" />,
      label: "Portfolio",
      url: "https://portfolio-karthik-18.vercel.app",
      color: "hover:text-yellow-400",
      //house: "Digital Stronghold"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/karthik-vishal-s-851921287/",
      color: "hover:text-blue-400",
      //house: "Professional Network"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Mail",
      url: "mailto:karthikvishal1506@gmail.com",
      color: "hover:text-green-400",
      //house: "Send a Raven"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white relative overflow-hidden">
      {/* Atmospheric Effects */}

      
      {/* Header */}
      <header className="relative p-6 border-b border-red-900/30">
        <Link href="/login" className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors duration-300 group">
          <ArrowLeft className="w-9 h-9 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-lg"></span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-16">
        
        {/* Hero Section */}
        <section className={`text-center mb-20 transition-all duration-2000 ease-out ${
          sectionLoaded.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="flex justify-center mb-8">
            <div className="relative">
            
              <div className="absolute -top-2 -right-2">
               
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-cinzel_bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 mb-4 tracking-wider">
            Karthik Vishal
          </h1>
          <h2 className="text-2xl md:text-3xl text-yellow-400 mb-2 font-cinzel_bold mt-10">
            FullStack Developer & Digital Architect
          </h2>
          
        </section>

      

        {/* Tech Stack Section */}
        <section className={`mb-20 transition-all duration-1500 ease-out delay-800 ${
          sectionLoaded.journey ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 mb-8 text-center flex items-center justify-center gap-3 font-cinzel_bold">
            
            Tech Stack
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br from-red-900/30 to-black/50 backdrop-blur-sm rounded-xl p-6 border-2 border-red-800/30 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 group ${
                  sectionLoaded.journey ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${1200 + index * 200}ms` }}
              >
                <div className="text-yellow-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-cinzel_bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 mb-3 text-center">
                  {tech.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed text-sm group-hover:text-gray-200 transition-colors">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Connect Section */}
        <section className={`mb-20 transition-all duration-1500 ease-out delay-1200 ${
          sectionLoaded.philosophy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-3xl font-cinzel_bold font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 mb-8 flex items-center justify-center gap-3">
              <Crown className="w-8 h-8 text-yellow-400 " />
              Connect with me
            </h2>
            
            
            {/* Social Links */}
            <div className="grid md:grid-cols-2 gap-4 text-lg">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-red-900/30 to-black/50 backdrop-blur-sm rounded-full border-2 border-red-800/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 text-gray-300 ${link.color} group shadow-lg hover:shadow-red-500/20`}
                >
                  <div className="group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-bold font-cinzel_bold">{link.label}</div>
                    <div className="text-sm text-gray-400">{link.house}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={`text-center transition-all duration-1500 ease-out delay-1600 ${
          sectionLoaded.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
        
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/login">
              <button className="bg-gradient-to-r from-red-500 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-xl hover:from-red-400 hover:to-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/50 border-2 border-yellow-400">
                Join the Roost
              </button>
            </Link>
            <a 
              href="https://github.com/karthikvishal-s/Nexus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-red-400 text-red-400 px-8 py-4 rounded-full font-bold text-xl hover:bg-red-400 hover:text-black transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-red-500/50"
            >
              <Github className="w-5 h-5" />
              Source Code
            </a>
          </div>
        </section>

      </main>

    
    </div>
  );
}