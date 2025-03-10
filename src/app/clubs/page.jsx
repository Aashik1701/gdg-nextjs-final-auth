'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const clubsData = [
  {
    id: 'e2pc',
    name: 'ENVIRONMENT & ENERGY PROTECTION CLUB (E2PC)',
    shortName: 'E2PC',
    description: 'Dedicated to sustainable practices and environmental conservation through innovative energy solutions and community awareness initiatives.',
    color: 'from-green-500 to-emerald-400',
    textColor: 'text-green-400',
    icon: '🌿',
    memberCount: 83,
    events: 12,
    projects: 7
  },
  {
    id: 'gamedev',
    name: 'GAME DEVELOPMENT CLUB',
    shortName: 'GameDev',
    description: 'Creating interactive experiences through game design, programming, and digital art while exploring cutting-edge technologies like AR and VR.',
    color: 'from-purple-500 to-indigo-400',
    textColor: 'text-purple-400',
    icon: '🎮',
    memberCount: 124,
    events: 9,
    projects: 15
  },
  {
    id: 'gdsc',
    name: 'GOOGLE DEVELOPER STUDENT CLUB (GDSC)',
    shortName: 'GDSC',
    description: 'Bridging the gap between theory and practice with Google technologies through workshops, study jams, and hands-on projects.',
    color: 'from-blue-500 to-sky-400',
    textColor: 'text-blue-400',
    icon: '🔍',
    memberCount: 210,
    events: 22,
    projects: 18
  },
  {
    id: 'humanoid',
    name: 'HUMANOID CLUB',
    shortName: 'Humanoid',
    description: 'Exploring the frontiers of robotics with a focus on human-like machines, artificial intelligence, and the future of human-robot interaction.',
    color: 'from-red-500 to-orange-400',
    textColor: 'text-red-400',
    icon: '🤖',
    memberCount: 67,
    events: 7,
    projects: 5
  },
  {
    id: 'iothinc',
    name: 'INTERNET OF THINGS COMMUNITY (IOTHINC)',
    shortName: 'IoThinc',
    description: 'Connecting the physical and digital worlds through smart devices, sensors, and interconnected systems that transform how we interact with technology.',
    color: 'from-cyan-500 to-teal-400',
    textColor: 'text-cyan-400',
    icon: '📱',
    memberCount: 96,
    events: 14,
    projects: 11
  },
  {
    id: 'linux',
    name: 'LINUX CLUB',
    shortName: 'Linux',
    description: 'Championing open-source technologies, system administration, and the Linux ecosystem through workshops, installations, and community support.',
    color: 'from-yellow-500 to-amber-400',
    textColor: 'text-yellow-400',
    icon: '🐧',
    memberCount: 118,
    events: 16,
    projects: 9
  },
  {
    id: 'math',
    name: 'MATHEMATICS CLUB',
    shortName: 'MathClub',
    description: 'Exploring the beauty of numbers, patterns, and abstract thinking through puzzles, competitions, and the application of mathematics to real-world problems.',
    color: 'from-pink-500 to-rose-400',
    textColor: 'text-pink-400',
    icon: '🧮',
    memberCount: 72,
    events: 11,
    projects: 4
  },
  {
    id: 'microsoft',
    name: 'MICROSOFT INNOVATION CLUB',
    shortName: 'MS Club',
    description: 'Leveraging Microsoft technologies to build innovative solutions, enhance technical skills, and prepare students for industry careers through practical projects.',
    color: 'from-blue-600 to-blue-400',
    textColor: 'text-blue-400',
    icon: '⊞',
    memberCount: 145,
    events: 18,
    projects: 13
  },
  {
    id: 'newton',
    name: 'NEWTON SCHOOL CODING CLUB',
    shortName: 'Newton',
    description: 'Developing coding proficiency through competitive programming, algorithm design, and collaborative problem-solving in a supportive learning environment.',
    color: 'from-violet-500 to-purple-400',
    textColor: 'text-violet-400',
    icon: '💻',
    memberCount: 132,
    events: 20,
    projects: 16
  }
];

const Clubs = () => {
  const [selectedClub, setSelectedClub] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'
  const carouselRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Filter clubs based on search term
  const filteredClubs = clubsData.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    club.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openClubDetails = (club) => {
    setSelectedClub(club);
    document.body.style.overflow = 'hidden';
  };

  const closeClubDetails = () => {
    setSelectedClub(null);
    document.body.style.overflow = 'auto';
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeClubDetails();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Club Card Component
  const ClubCard = ({ club, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative overflow-hidden bg-gray-900 shadow-xl rounded-2xl group"
      onClick={() => openClubDetails(club)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${club.color} opacity-10 group-hover:opacity-15 transition-opacity duration-300`}></div>
      
      {/* Icon Circle */}
      <div className="absolute flex items-end justify-start w-24 h-24 p-2 text-2xl bg-gray-800 rounded-full opacity-50 -top-8 -right-8">
        {club.icon}
      </div>
      
      <div className="flex flex-col h-full p-6">
        <div className="mb-2">
          <div className={`text-sm font-medium ${club.textColor}`}>{club.shortName}</div>
          <h3 className="mt-1 text-xl font-bold text-white line-clamp-2">{club.name}</h3>
        </div>
        
        <p className="flex-grow mt-2 mb-4 text-sm text-gray-300 line-clamp-3">{club.description}</p>
        
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-800">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
              {club.memberCount}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"></path>
              </svg>
              {club.projects}
            </div>
          </div>
          
          <motion.div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${club.textColor} bg-gray-800`}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen text-white bg-black">
      {/* Header with parallax effect */}
      <div className="relative h-64 overflow-hidden md:h-80">
        <motion.div 
          className="absolute inset-0 z-0 bg-gradient-to-b from-blue-600/30 via-purple-600/30 to-transparent"
          style={{ y: parallaxY }}
        ></motion.div>
        
        <div className="absolute inset-0 bg-[url('/images/clubs-pattern.png')] bg-repeat opacity-10 z-0"></div>
        
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold md:text-5xl"
          >
            Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Student Clubs</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mt-4 text-gray-300"
          >
            Join a vibrant community of like-minded students and explore your interests through our diverse range of clubs
          </motion.p>
        </div>
      </div>
      
      {/* Search and filter controls */}
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-start justify-between mb-8 space-y-4 md:flex-row md:items-center md:space-y-0">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              className="w-full py-3 pl-10 pr-4 text-white bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Search clubs by name or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg flex items-center ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'} transition-colors duration-200`}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              Grid
            </button>
            <button 
              onClick={() => setViewMode('carousel')}
              className={`px-4 py-2 rounded-lg flex items-center ${viewMode === 'carousel' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'} transition-colors duration-200`}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
              </svg>
              Carousel
            </button>
          </div>
        </div>
        
        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredClubs.length > 0 ? (
              filteredClubs.map((club, index) => (
                <ClubCard key={club.id} club={club} index={index} />
              ))
            ) : (
              <div className="py-12 text-center col-span-full">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-400"
                >
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <p className="text-xl">No clubs found matching your search</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-purple-400 underline hover:text-purple-300"
                  >
                    Clear search
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        )}
        
        {/* Carousel View */}
        {viewMode === 'carousel' && (
          <div className="relative overflow-hidden" ref={carouselRef}>
            {filteredClubs.length > 0 ? (
              <>
                <div className="flex pb-8 space-x-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                  {filteredClubs.map((club, index) => (
                    <div key={club.id} className="flex-none w-full sm:w-3/4 md:w-1/2 lg:w-1/3 snap-center">
                      <ClubCard club={club} index={index} />
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center py-3 space-x-2">
                  {filteredClubs.map((club, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-purple-500' : 'bg-gray-600'} transition-colors duration-200`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="py-12 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-400"
                >
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <p className="text-xl">No clubs found matching your search</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-purple-400 underline hover:text-purple-300"
                  >
                    Clear search
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Club Detail Modal */}
      <AnimatePresence>
        {selectedClub && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0"
            onClick={closeClubDetails}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gray-900 rounded-2xl shadow-2xl z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div className={`relative h-32 rounded-t-2xl overflow-hidden bg-gradient-to-r ${selectedClub.color}`}>
                <div className="absolute inset-0 opacity-20 bg-[url('/images/pattern-dot.png')] bg-repeat"></div>
                <button
                  onClick={closeClubDetails}
                  className="absolute flex items-center justify-center w-10 h-10 text-white transition-colors rounded-full top-4 right-4 bg-black/30 backdrop-blur-sm hover:bg-black/50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {/* Icon and title */}
              <div className="flex flex-col px-6 mb-6 -mt-10 md:flex-row">
                <div className={`w-20 h-20 rounded-2xl bg-gray-800 flex items-center justify-center text-4xl shadow-lg border-4 border-gray-900 ${selectedClub.textColor}`}>
                  {selectedClub.icon}
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 md:pt-2">
                  <div className={`text-sm font-medium ${selectedClub.textColor}`}>{selectedClub.shortName}</div>
                  <h2 className="mt-1 text-2xl font-bold text-white">{selectedClub.name}</h2>
                </div>
              </div>
              
              {/* Content */}
              <div className="px-6 pb-8">
                <p className="mb-8 text-gray-300">{selectedClub.description}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 text-center bg-gray-800 rounded-xl">
                    <div className="text-2xl font-bold text-white">{selectedClub.memberCount}</div>
                    <div className="text-sm text-gray-400">Members</div>
                  </div>
                  <div className="p-4 text-center bg-gray-800 rounded-xl">
                    <div className="text-2xl font-bold text-white">{selectedClub.events}</div>
                    <div className="text-sm text-gray-400">Events</div>
                  </div>
                  <div className="p-4 text-center bg-gray-800 rounded-xl">
                    <div className="text-2xl font-bold text-white">{selectedClub.projects}</div>
                    <div className="text-sm text-gray-400">Projects</div>
                  </div>
                </div>
                
                {/* Activities - Just placeholders */}
                <h3 className="mb-4 text-xl font-bold text-white">Recent Activities</h3>
                <div className="mb-8 space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center p-4 bg-gray-800 rounded-xl">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${selectedClub.textColor} bg-gray-900`}>
                        {i === 0 ? '🏆' : i === 1 ? '📊' : '💡'}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-white">
                          {i === 0 ? 'Won 1st place in National Competition' : 
                           i === 1 ? 'Hosted a workshop on advanced techniques' : 
                           'Launched new collaborative project'}
                        </div>
                        <div className="text-sm text-gray-400">{i === 0 ? '2 weeks ago' : i === 1 ? '1 month ago' : '2 months ago'}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* CTA */}
                <div className="flex flex-col gap-4 md:flex-row">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex-1 py-3 px-6 rounded-xl bg-gradient-to-r ${selectedClub.color} text-white font-medium shadow-lg`}
                  >
                    Join Club
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 px-6 py-3 font-medium text-white bg-gray-800 rounded-xl"
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CSS for hiding scrollbar in carousel */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Clubs;