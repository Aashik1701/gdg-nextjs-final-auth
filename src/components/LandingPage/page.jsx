"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className="absolute top-0 left-0 right-0 z-30 flex flex-col items-center justify-between p-4 md:flex-row">
      <Link href="/" className="flex items-center mb-4 space-x-2 md:mb-0">
        <Image 
          src="/gdgLogo.svg"
          alt="GDG Logo"
          width={200}
          height={50}
          className="w-auto h-8 md:h-10"
        />
      </Link>
      <div className="flex flex-wrap justify-center gap-2">
        {!session ? (
          <>
            <Button 
              variant="ghost" 
              onClick={() => router.push("/sign-in")}
              className="text-sm text-white md:text-base hover:bg-white/20"
            >
              Login
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => router.push("/sign-up")}
              className="text-sm text-white md:text-base hover:bg-white/20"
            >
              Sign Up
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

const LandingPage = () => {
  // Example featured events data
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

  // Categories with icons
  const categories = [
    { name: 'Technology', icon: '/chrome.svg' },
    { name: 'Business', icon: '/window.svg' },
    { name: 'Entertainment', icon: '/globe.svg' },
    { name: 'Education', icon: '/file.svg' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 z-10 bg-gradient-to-r from-blue-900/80 to-purple-900/80"
          ></div>
          <Image
            src="/eventsBannerbg.png"
            alt="Events Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="container z-20 px-4 mx-auto text-center">
          <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl animate-fadeIn">
            Discover Amazing Events
          </h1>
          <p className="max-w-3xl mx-auto mb-10 text-xl md:text-2xl text-white/90">
            Find and book the best events happening around you. From conferences to concerts, we've got you covered.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/console/events">
              <Button size="lg" className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                Browse Events
              </Button>
            </Link>
            <Link href="/console/events/new">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg text-white bg-transparent border-2 border-white hover:bg-white/10">
                Create Event
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Event Categories */}
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

      {/* Featured Events */}
      <section className="bg-white py -20">
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
          <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
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

      {/* Footer */}
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
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2 .549z"></path>
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