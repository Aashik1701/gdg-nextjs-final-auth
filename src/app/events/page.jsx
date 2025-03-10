// events/page.jsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);

  // Simulated categories - in a real app, these might come from your API
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'music', name: 'Music' },
    { id: 'tech', name: 'Technology' },
    { id: 'art', name: 'Art & Culture' },
    { id: 'food', name: 'Food & Drink' },
    { id: 'sports', name: 'Sports' }
  ];

  // Simulated event data - replace with your actual API call
  useEffect(() => {
    const fetchEvents = async () => {
      // Simulate API loading delay
      setLoading(true);
      
      // In a real app, replace this with an actual API call
      setTimeout(() => {
        const mockEvents = [
          {
            id: 1,
            title: "Summer Music Festival",
            date: "2025-06-15",
            time: "12:00 PM",
            location: "Central Park",
            category: "music",
            image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1708404715/sample.jpg",
            featured: true,
            attendees: 1250,
            description: "A day-long celebration of music featuring top artists from around the world."
          },
          {
            id: 2,
            title: "Tech Conference 2025",
            date: "2025-04-20",
            time: "9:00 AM",
            location: "Tech Hub Center",
            category: "tech",
            image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1708404756/cld-sample.jpg",
            featured: true,
            attendees: 850,
            description: "Explore the latest in AI, blockchain, and future tech trends."
          },
          {
            id: 3,
            title: "Modern Art Exhibition",
            date: "2025-05-10",
            time: "10:00 AM",
            location: "National Gallery",
            category: "art",
            image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1708404758/cld-sample-4.jpg",
            featured: false,
            attendees: 430,
            description: "Featuring works from established and emerging contemporary artists."
          },
          {
            id: 4,
            title: "Food Truck Festival",
            date: "2025-07-22",
            time: "11:00 AM",
            location: "Waterfront Plaza",
            category: "food",
            image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1708404757/cld-sample-2.jpg",
            featured: false,
            attendees: 750,
            description: "Sample cuisine from over 30 food trucks from around the region."
          },
          {
            id: 5,
            title: "Marathon Championship",
            date: "2025-04-05",
            time: "8:00 AM",
            location: "Downtown",
            category: "sports",
            image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1708404757/cld-sample-3.jpg",
            featured: false,
            attendees: 2000,
            description: "Annual marathon with professional and amateur categories."
          },
          {
            id: 6,
            title: "Jazz Night",
            date: "2025-03-28",
            time: "8:00 PM",
            location: "Blue Note Club",
            category: "music",
            image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1708404749/samples/balloons.jpg",
            featured: false,
            attendees: 150,
            description: "An intimate evening featuring renowned jazz musicians."
          },
          {
            id: 7,
            title: "AI Ethics Workshop",
            date: "2025-05-15",
            time: "2:00 PM",
            location: "University Auditorium",
            category: "tech",
            image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1708404754/samples/dessert-on-a-plate.jpg",
            featured: false,
            attendees: 300,
            description: "Discussions on ethical implications of artificial intelligence."
          },
          {
            id: 8,
            title: "Photography Walk",
            date: "2025-06-10",
            time: "9:00 AM",
            location: "Botanical Gardens",
            category: "art",
            image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1738690925/samples/coffee.jpg", 
            featured: false,
            attendees: 90,
            description: "Guided photography session through beautiful gardens."
          }
        ];
        setEvents(mockEvents);
        setLoading(false);
      }, 1000);
    };

    fetchEvents();
    
    // Add scroll listener for parallax effect
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrollTop / scrollHeight) * 100;
      setScrollPercentage(percentage);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter events based on active category and search
  const filteredEvents = events.filter(event => {
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Format date 
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"
          style={{ 
            top: `${10 + scrollPercentage * 0.2}%`, 
            left: '10%',
            transform: `scale(${1 + scrollPercentage * 0.01})` 
          }}
        ></div>
        <div 
          className="absolute bg-indigo-200 rounded-full w-96 h-96 opacity-20 blur-3xl"
          style={{ 
            top: '60%', 
            right: `${10 - scrollPercentage * 0.1}%`,
            transform: `scale(${1 + scrollPercentage * 0.005})` 
          }}
        ></div>
        <div 
          className="absolute bg-pink-200 rounded-full w-72 h-72 opacity-15 blur-3xl"
          style={{ 
            bottom: '10%', 
            left: '30%',
            transform: `rotate(${scrollPercentage}deg)` 
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="container relative z-10 px-4 py-12 mx-auto">
        {/* Page header with parallax effect */}
        <div className="mb-16 text-center">
          <h1 
            className="mb-4 text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"
            style={{ transform: `translateY(${scrollPercentage * 0.5}px)` }}
          >
            Discover Events
          </h1>
          <p 
            className="max-w-2xl mx-auto text-xl text-gray-600"
            style={{ transform: `translateY(${scrollPercentage * 0.3}px)` }}
          >
            Find and join amazing events happening around you
          </p>
        </div>

        {/* Search and filter section */}
        <div className="sticky z-20 p-4 mb-8 transition-all duration-300 border border-indigo-100 shadow-lg top-4 bg-white/80 backdrop-blur-lg rounded-2xl">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full py-3 pl-10 pr-4 transition-all border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center px-4 py-2 space-x-1 text-indigo-700 transition-all rounded-lg bg-indigo-50 hover:bg-indigo-100"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filters</span>
              </button>

              <div className="flex overflow-hidden border rounded-lg">
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`p-2 ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-2 ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Expandable filter section */}
          <div className={`overflow-hidden transition-all duration-300 ${filterOpen ? 'max-h-40 mt-4' : 'max-h-0'}`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Events (Horizontal Scroll) */}
        {filteredEvents.some(event => event.featured) && (
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Featured Events</h2>
            <div className="flex pb-4 space-x-6 overflow-x-auto snap-x scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent">
              {filteredEvents
                .filter(event => event.featured)
                .map(event => (
                  <div 
                    key={event.id} 
                    className="flex-none w-full sm:w-3/4 md:w-1/2 lg:w-1/3 snap-start"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full transform hover:scale-[1.02] transition-all duration-300 border border-indigo-100">
                      <div className="relative">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="object-cover w-full h-48"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="mb-2 text-xl font-bold text-gray-800">{event.title}</h3>
                        <p className="mb-3 text-gray-600">{event.description}</p>
                        <div className="flex items-center mb-3 text-sm text-gray-500">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="w-4 h-4 mr-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(event.date)} • {event.time}</span>
                        </div>
                        <div className="flex items-center mb-4 text-sm text-gray-500">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="w-4 h-4 mr-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="w-4 h-4 mr-1 text-indigo-600" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-medium text-indigo-600">{event.attendees}+ attending</span>
                          </div>
                          <Link href={`/events/${event.id}`} className="inline-block px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Events Grid/List */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">All Events</h2>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-16 h-16 mx-auto mb-4 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mb-2 text-xl font-medium text-gray-700">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 mt-4 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredEvents.map(event => (
                <div 
                  key={event.id} 
                  className={`bg-white rounded-xl shadow-md overflow-hidden border border-indigo-50 hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'flex' : 'block'
                  }`}
                >
                  <div className={viewMode === 'list' ? 'w-1/3 flex-shrink-0' : ''}>
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className={`w-full ${viewMode === 'grid' ? 'h-48' : 'h-full'} object-cover`}
                    />
                  </div>
                  <div className={`p-5 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full">
                        {categories.find(cat => cat.id === event.category)?.name || event.category}
                      </span>
                      <span className="text-sm text-gray-500">{event.attendees}+ attending</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800">{event.title}</h3>
                    <p className="mb-3 text-sm text-gray-600 line-clamp-2">{event.description}</p>
                    
                    <div className="flex flex-col justify-between gap-2 text-sm text-gray-500 sm:flex-row sm:items-center">
                      <div className="flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="w-4 h-4 mr-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.date)} • {event.time}
                      </div>
                      <div className="flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="w-4 h-4 mr-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Link href={`/events/${event.id}`} className="inline-block px-4 py-2 text-sm font-medium text-indigo-600 transition-colors bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}