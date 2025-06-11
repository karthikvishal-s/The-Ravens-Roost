import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Feather, Users, Shield, Zap, Crown, Scroll, Sword } from 'lucide-react';
import { GiPlagueDoctorProfile } from "react-icons/gi";

export default function About() {
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
      const sections = ['hero', 'story', 'features', 'mission', 'journey'];
      sections.forEach((section, index) => {
        setTimeout(() => {
          setSectionLoaded(prev => ({ ...prev, [section]: true }));
        }, index * 400);
      });
    }
  }, [loaded]);

  const features = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Post System",
      description: "Users can create short-form posts ,with likes,comment and save feature"
    },
    {
      icon: <Scroll className="w-8 h-8" />,
      title: "Profile Pages",
      description: "Each user can view their own profile details mapped to their respective house/sigil"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Dark theme and Icons",
      description: "Immersive GOT-themed icons and other themes"
    },
    {
      icon: <Sword className="w-8 h-8" />,
      title: "Authentication and JWT ",
      description: "Safe and Secure authentication using Google OAuth"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Audio */}
      <audio src="/audio/got_theme.mp3" loop autoPlay muted />
      
      {/* Header */}
      <header className="relative p-6">
        <Link href="/login" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300 group">
          <ArrowLeft className="w-9 h-9 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-rocker"></span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-16">
        
        {/* Hero Section */}
        <section className={`text-center mb-20 transition-all duration-2000 ease-out ${
          sectionLoaded.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="flex justify-center mb-8">
            <GiPlagueDoctorProfile className="w-16 h-16 text-yellow-400" />
          </div>
          <h1 className="font-cinzel_bold text-5xl md:text-7xl text-yellow-400 mb-6">
            The Raven's Roost
          </h1>
          <p className="text-l md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          "A Game of Thrones-themed Twitter clone built from the ground up using modern fullstack technologies, merging fan-favorite fantasy elements with real-time social interaction."
          </p>
        </section>

        {/* Story Section */}
        <section className={`mb-20 transition-all duration-1500 ease-out delay-400 ${
          sectionLoaded.story ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-cinzel_bold text-3xl md:text-4xl text-yellow-400 mb-8 text-center">
              The Motive Behind
            </h2>
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-yellow-400/20">
              <p className="text-l md:text-xl leading-relaxed mb-6 text-gray-200">
              I wanted to challenge myself by building a full-stack application that was both technically ambitious and personally meaningful. A Twitter clone seemed like a great way to explore real-world features like authentication, real-time updates, and social interactions. But I didn’t want to stop at just replicating functionality—I wanted to build something I’d truly enjoy working on.
              </p>
              <p className="text-l md:text-xl leading-relaxed mb-6 text-gray-200">
              As a fan of the Game of Thrones series, I saw an opportunity to bring that world into my project. Instead of tweets, users would send messages as “ravens,” inspired by the show’s lore. This creative twist gave the app its own identity and helped me stay engaged throughout the development process.
              </p>
              <p className="text-l md:text-xl leading-relaxed text-gray-200">
              That idea became The Raven’s Roost—a Game of Thrones-themed social media platform where fantasy meets function. It not only reflects my skills in full-stack development, but also my ability to bring creativity into technical work and build something unique from the ground up.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`mb-20 transition-all duration-1500 ease-out delay-800 ${
          sectionLoaded.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="font-cinzel_bold text-3xl md:text-4xl text-yellow-400 mb-12 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-500 hover:scale-105 hover:bg-opacity-40 ${
                  sectionLoaded.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${1200 + index * 200}ms` }}
              >
                <div className="text-yellow-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-rocker text-xl text-yellow-400 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* Journey Section */}
        <section className={`text-center transition-all duration-1500 ease-out delay-1600 ${
          sectionLoaded.journey ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="font-cinzel_bold text-3xl md:text-4xl text-yellow-400 mb-8">
            Begin Your Journey
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-rocker text-xl hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-400/25">
                Join the Roost
              </button>
            </Link>
            <Link href="/">
              <button className="border border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-rocker text-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:scale-105">
                Explore Realm
              </button>
            </Link>
          </div>
        </section>

      </main>

    </div>
  );
}