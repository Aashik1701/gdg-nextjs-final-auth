"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion } from 'framer-motion';

const NavBar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className="absolute top-0 left-0 right-0 z-30 flex flex-col items-center justify-between p-4 md:flex-row">
      {/* <Link href="/" className="flex items-center mb-4 space-x-2 md:mb-0">
        <Image 
          src="/gdgLogo.svg"
          alt="GDG Logo"
          width={200}
          height={50}
          className="w-auto h-8 md:h-10"
        />
      </Link> */}
      <div className="flex flex-wrap justify-center gap-2">
        {!session ? (
          <>
            <Button 
              variant="ghost" 
              onClick={() => router.push("/sign-in")}
              className="text-sm text-white md:text-base hover:bg-white/20"
            >
              {/* Login */}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => router.push("/sign-up")}
              className="text-sm text-white md:text-base hover:bg-white/20"
            >
              {/* Sign Up */}
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="ghost" 
              onClick={() => signOut()}
              className="text-sm text-white md:text-base hover:bg-white/20"
            >
              Logout
            </Button>
            <Button 
              variant="default" 
              onClick={() => router.push("/console/events")}
              className="text-sm md:text-base"
            >
              Go to Console
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

const Hero = () => {
  const [rows, setRows] = useState([
    { photos: [], key: 1 },
    { photos: [], key: 2 }
  ]);

  useEffect(() => {
    const allPhotos = [
      '/eventsBannerbg.png',
      '/eventsBannerbg.png',
      '/eventsBannerbg.png'
    ];
    
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const ensureNoDuplicates = (photos) => {
      const result = [...photos];
      for (let i = 1; i < result.length; i++) {
        if (result[i] === result[i - 1]) {
          for (let j = i + 1; j < result.length; j++) {
            if (result[j] !== result[i - 1] && result[j] !== result[i + 1]) {
              [result[i], result[j]] = [result[j], result[i]];
              break;
            }
          }
        }
      }
      return result;
    };

    const repeatedPhotos = Array(3).fill(allPhotos).flat();
    const shuffledPhotos1 = ensureNoDuplicates(shuffleArray([...repeatedPhotos]));
    const shuffledPhotos2 = ensureNoDuplicates(shuffleArray([...repeatedPhotos]));

    setRows([
      { photos: shuffledPhotos1, key: 1 },
      { photos: shuffledPhotos2, key: 2 }
    ]);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex flex-col items-center w-full min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="w-full mt-8">
        <div className="relative w-full overflow-hidden">
          <div className="flex photo-stream scroll-left">
            {rows[0].photos.length > 0 && 
              [...rows[0].photos, ...rows[0].photos].map((photo, index) => (
                <motion.div
                  key={`top-${index}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex-none mx-2"
                >
 <Image
                    src={photo}
                    alt={`Community Member ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-16 h-16 shadow-lg rounded-xl md:w-20 md:h-20"
                    priority={index < 4}
                  />
                </motion.div>
              ))
            }
          </div>
        </div>
        
        <div className="relative w-full mt-4 overflow-hidden">
          <div className="flex photo-stream scroll-right">
            {rows[1].photos.length > 0 && 
              [...rows[1].photos, ...rows[1].photos].map((photo, index) => (
                <motion.div
                  key={`bottom-${index}`}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="flex-none mx-2"
                >
                  <Image
                    src={photo}
                    alt={`Community Member ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-16 h-16 shadow-lg rounded-xl md:w-20 md:h-20"
                    priority={index < 4}
                  />
                </motion.div>
              ))
            }
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative max-w-4xl px-6 py-16 mx-auto text-center"
      >
        <div className="absolute rounded-full bg-blue-600/20 w-72 h-72 blur-3xl opacity-20 -top-20 -left-20" />
        <div className="absolute rounded-full bg-purple-600/20 w-72 h-72 blur-3xl opacity-20 -bottom-20 -right-20" />
        
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
          Join the
          <span className="relative">
            <span className="relative z-10 px-2 text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text">
             amazing
            </span>
            <div className="absolute bottom-0 left-0 w-full h-3 bg-blue-600/20 opacity-30 -rotate-2" />
          </span>
          events
        </h1>
        
        <p className="max-w-2xl mx-auto mb-8 text-lg leading-relaxed text-gray-300 md:text-xl">
          Join niche clubs, interact with experts, explore, network with high-profile and ambitious individuals, get internships, and join India&apos;s largest community all for free!
        </p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('', '_blank')}
          className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl hover:shadow-blue-500/20"
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13 ```javascript
.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
          </svg>
          Join Now
        </motion.button>
      </motion.div>

      <style jsx global>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes slideRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .scroll-left {
          animation: slideLeft 30s linear infinite;
        }

        .scroll-right {
          animation: slideRight 30s linear infinite;
        }

        .photo-stream {
          display: flex;
          gap: 1rem;
          padding: 1rem 0;
        }

        .photo-stream:hover {
          animation-play-state: paused;
        }

        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </motion.div>
  );
};

const LandingPage = () => {
  const featuredEvents = [
    {
      id: '1',
      title: 'Tech Conference 2025',
      date: 'April 15-17, 2025',
      location: 'VIT CHENNAI',
      imageUrl: '/eventsBannerbg.png',
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Music Festival',
      date: 'May 22-24, 2025',
      location: 'VIT CHENNAI',
      imageUrl: '/eventsBannerbg.png',
      category: 'Entertainment'
    },
    {
      id: '3',
      title: 'NEXTJS:3000',
      date: 'MARCH 8, 2025',
      location: 'VIT CHENNAI',
      imageUrl: '/eventsBannerbg.png',
      category: 'Business'
    }
  ];

  const categories = [
    { name: 'Technology', icon: '/chrome.svg' },
    { name: 'Business', icon: '/window.svg' },
    { name: 'Entertainment', icon: '/globe.svg' },
    { name: 'Education', icon: '/file.svg' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Hero />
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-16 text-3xl font-bold text-center md:text-4xl">Explore by Category</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.map((category, index) => (
              <div key={index} className="group">
                <Link href={`/console/events?category=${category.name}`}>
                  <Card className="h-full p-6 text-center transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                    <div className="flex justify-center mb-4">
                      <div className="flex items-center justify-center w-16 h-16 transition-colors duration-300 bg-blue-100 rounded-full group-hover:bg-blue-600">
                        <Image src={category.icon} alt={category.name} width={32} height={32} />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold md:text-4xl">Featured Events</h2>
            <Link href="/console/events">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
                View All →
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <Link key={event.id} href={`/console/events/${event.id}`}>
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative w-full h-48">
                    <Image 
                      src={event.imageUrl} 
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute px-3 py-1 text-sm text-white bg-blue-600 rounded-full top-4 right-4">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold">{event.title}</h3>
                    <div className="flex items-center mb-1 text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text- 5xl bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: 1,
                title: "Find Events",
                description: "Browse through our curated list of events or search for specific ones that interest you.",
                icon: "🔍"
              },
              {
                step: 2,
                title: "Book Tickets",
                description: "Select your preferred event and secure your spot with our easy booking process.",
                icon: "🎟️"
              },
              {
                step: 3,
                title: "Attend & Enjoy",
                description: "Get ready for an amazing experience at your chosen event.",
                icon: "🎉"
              }
            ].map((item, index) => (
              <div key={index} className="group perspective-1000">
                <div className="relative p-6 transition-all duration-500 transform bg-white rounded-lg shadow-xl group-hover:scale-105 group-hover:rotate-y-12">
                  <div className="absolute inset-0 transition-opacity duration-500 rounded-lg opacity-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 group-hover:opacity-100"></div>
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-3xl transition-transform transform rounded-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div className="relative">
                    <h3 className="mb-4 text-2xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                      Step {item.step}: {item.title}
                    </h3>
                    <p className="text-gray-600 transition-colors group-hover:text-gray-700">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-white bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-xl font-bold">Event Platform</h3>
              <p className="text-gray-400">Your ultimate platform for discovering and booking amazing events.</p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/console/events" className="text-gray-400 hover:text-white">Browse Events</Link></li>
                <li><Link href="/console/events/new" className="text-gray-400 hover:text-white">Create Event</Link></li>
                <li><Link href="/console/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Support</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://gdg.community.dev/gdg-on-campus-vellore-institute-of-technology-chennai-india/" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4 .797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2 .549z"></path>
                  </svg>
                </a>
                <a href="https://gdg.community.dev/gdg-on-campus-vellore-institute-of-technology-chennai-india/" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="https://gdg.community.dev/gdg-on-campus-vellore-institute-of-technology-chennai-india/" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;