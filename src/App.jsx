import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  // State to manage the active section for navigation
  const [activeSection, setActiveSection] = useState('home');
  // State to control the visibility of elements for animation
  const [isVisible, setIsVisible] = useState({
    heroText: false,
    aboutContent: false,
    projectCards: false,
    blogContent: false,
  });

  // Effect for initial hero text animation
  useEffect(() => {
    setIsVisible(prev => ({ ...prev, heroText: true }));
  }, []);

  // Effect for scroll-triggered animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Helper to check if element is in view
      const isInViewport = (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top < windowHeight * 0.85 && rect.bottom >= 0; // Adjusted threshold for earlier trigger
        }
        return false;
      };

      if (isInViewport('about')) {
        setIsVisible(prev => ({ ...prev, aboutContent: true }));
      }
      if (isInViewport('projects')) {
        setIsVisible(prev => ({ ...prev, projectCards: true }));
      }
      if (isInViewport('blog')) {
        setIsVisible(prev => ({ ...prev, blogContent: true }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case content is already in view on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to smoothly scroll to a section
  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // SVG Icon for App Store Links
  const AppStoreIcon = ({ store }) => {
    // Common classes for icons
    const iconClasses = "w-5 h-5 inline-block mr-1";
    if (store === 'android') {
      return (
        <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          {/* Android Icon Path */}
          <path d="M20.771 11.152L16.892 7.272a.748.748 0 00-1.058 0L11.95 11.152l2.942 2.942 5.879-2.942a.748.748 0 000-1.058v.058zm-9.925 4.29L7.272 11.868a.748.748 0 00-1.058 0L2.33 15.752l2.942 2.942L9.152 14.81a.748.748 0 000-1.058l-3.88-3.88.058.058zm3.946-8.164l3.88 3.88-3.88 3.88-3.88-3.88 3.88-3.88zm-4.29 9.925l3.88-3.88-3.88-3.88-3.88 3.88 3.88 3.88zM15.834 4.23l-2.942 2.942-2.942-2.942 2.942-2.942 2.942 2.942zm-7.004 15.54l2.942-2.942 2.942 2.942-2.942 2.942-2.942-2.942z"/>
          <path d="M17.318 1.39L6.682 1.39a.75.75 0 00-.53.22L1.39 6.372a.75.75 0 000 1.06l4.762 4.762a.75.75 0 00.53.22h10.636a.75.75 0 00.53-.22l4.762-4.762a.75.75 0 000-1.06L17.848 1.61a.75.75 0 00-.53-.22zM7.75 11.25L3.5 7l4.25-4.25L12 7l-4.25 4.25zm8.5 0L12 7l4.25-4.25L20.5 7l-4.25 4.25z"/>
        </svg>
      );
    }
    if (store === 'ios') {
      return (
        <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          {/* iOS Icon Path */}
          <path d="M17.623 11.083C17.62 8.399 19.832 6.6 19.832 6.6c-1.426-1.691-3.532-1.917-4.332-1.944-2.054-.054-3.91.998-4.884.998-.998 0-2.51-.998-4.126-.944-2.16.081-4.048 1.213-5.076 3.048C-1.43 10.456.656 15.038 2.636 17.722c.998 1.349 2.133 2.834 3.586 2.834 1.426 0 1.944-.89 3.726-.89s2.246.89 3.754.89c1.534 0 2.562-1.457 3.56-2.861 1.16-1.608 1.636-3.131 1.663-3.212-.055-.027-3.292-1.213-3.292-3.346zM15.07 4.718c.863-.998 1.454-2.375 1.322-3.726-.97.055-2.482.675-3.346 1.664-.755.863-1.509 2.321-1.349 3.645.971.136 2.51.562 3.373-1.583z"/>
        </svg>
      );
    }
    return null;
  };


  return (
    <div className="font-inter bg-gray-900 text-gray-100 antialiased"> {/* Main background and text color */}
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90 shadow-lg backdrop-blur-sm p-3 sm:p-4"> {/* Nav background, adjusted padding */}
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold text-teal-400">Hinal Tilavat</div> {/* Accent color for name, responsive text */}
          <ul className="flex space-x-3 sm:space-x-4 md:space-x-6"> {/* Responsive spacing */}
            {['home', 'about', 'projects', 'blog'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`text-sm sm:text-base md:text-lg font-medium transition duration-300 ease-in-out
                    ${activeSection === section ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-300 hover:text-teal-300 hover:border-b-2 hover:border-teal-300'}
                    focus:outline-none pb-1`} // Responsive text, added padding-bottom for border visibility
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center text-center bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden px-4" // Dark gradient, added padding for small screens
      >
        <div className="absolute inset-0 z-0 opacity-10"> {/* Decorative shapes */}
          <div className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-teal-500 rounded-full -top-12 -left-12 sm:-top-16 sm:-left-16 animate-pulse-slow opacity-50"></div>
          <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-purple-500 rounded-full -bottom-24 -right-24 sm:-bottom-32 sm:-right-32 animate-pulse-slow delay-1000 opacity-50"></div>
          <div className="absolute w-32 h-32 sm:w-48 sm:h-48 bg-indigo-500 rounded-full top-1/3 right-1/4 sm:top-1/4 sm:right-1/4 animate-pulse-slow delay-2000 opacity-50"></div>
        </div>
        <div className="relative z-10 p-4 sm:p-8">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-3 sm:mb-4 transition-all duration-1000 ease-out
              ${isVisible.heroText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} // Responsive text
          >
            Hi, I'm <span className="text-teal-300">Hinal Tilavat</span>
          </h1>
          <p
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 opacity-90 transition-all duration-1000 ease-out delay-300
              ${isVisible.heroText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} // Responsive text
          >
            A passionate <span className="font-semibold text-teal-300">React Native Developer</span>
          </p>
          <button
            onClick={() => scrollToSection('projects')}
            className={`mt-6 sm:mt-8 px-6 py-2 sm:px-8 sm:py-3 bg-teal-500 text-gray-900 font-bold rounded-full shadow-lg hover:bg-teal-400
              transition duration-300 ease-in-out transform hover:scale-105
              ${isVisible.heroText ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-10'}`} // Responsive padding
          >
            View My Work
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto py-16 sm:py-20 px-6 sm:px-8"> {/* Responsive padding */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-50 mb-10 sm:mb-12">About Me</h2>
        <div
          className={`flex flex-col items-center text-center transition-all duration-1000 ease-out
            ${isVisible.aboutContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="w-full md:w-3/4 lg:w-2/3 text-base sm:text-lg leading-relaxed text-gray-300"> {/* Responsive width and text */}
            <p className="mb-4">
              Hello! I'm <span className="font-semibold text-teal-400">Hinal Tilavat</span>, a dedicated and creative React Native Developer with a passion for building beautiful and functional mobile applications. With 4 years of experience in mobile app development, I thrive on solving complex problems and bringing innovative ideas to life on iOS and Android platforms.
            </p>
            <p className="mb-4">
              My expertise spans across <span className="font-semibold text-teal-400">React Native, JavaScript, TypeScript, Redux/Zustand, Firebase, REST APIs, and third-party library integration</span>. I love learning new technologies and constantly pushing the boundaries of what's possible in the mobile ecosystem.
            </p>
            <p>
              When I’m not immersed in code, you’ll find me exploring new tech, contributing to open source, or enjoying a good book. I believe in continuous growth and the power of collaboration. Let’s create something amazing together!
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gray-800 py-16 sm:py-20 px-6 sm:px-8"> {/* Responsive padding */}
        <div className="container mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-50 mb-10 sm:mb-12">My Projects</h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 transition-all duration-1000 ease-out
              ${isVisible.projectCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} // Responsive gap
          >
            {/* Project Card 1 */}
            <div className="bg-gray-700 rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col justify-between">
              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-50 mb-2">Referaly</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4">
                  Develop, Centralize, and Manage your business referral networks.
                </p>
              </div>
              <div className="p-5 sm:p-6 pt-0">
                <a
                  href="https://play.google.com/store/apps/details?id=com.referaly&pli=1" // Placeholder link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-green-400 transition duration-300 mr-2 mb-2" // Responsive padding and text
                >
                  <AppStoreIcon store="android" /> Play Store
                </a>
                <a
                  href="https://apps.apple.com/in/app/referaly/id6502189377" // Placeholder link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-400 transition duration-300 mb-2" // Responsive padding and text
                >
                  <AppStoreIcon store="ios" /> App Store
                </a>
              </div>
            </div>

            {/* Project Card 2 */}
             <div className="bg-gray-700 rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col justify-between">
              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-50 mb-2">Chipper</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4">
                  Chipper helps you save big by connecting you with the best coupons, tailored to your interests and location. Discover, save, and enjoy unlimited discounts — anytime, anywhere!
                </p>
              </div>
              <div className="p-5 sm:p-6 pt-0">
                <a
                  href="https://play.google.com/store/apps/details?id=com.chipper&hl=en_IN" // Placeholder link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-green-400 transition duration-300 mr-2 mb-2"
                >
                  <AppStoreIcon store="android" /> Play Store
                </a>
                <a
                  href="https://apps.apple.com/us/app/chipper/id1538769004" // Placeholder link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-400 transition duration-300 mb-2"
                >
                  <AppStoreIcon store="ios" /> App Store
                </a>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="bg-gray-700 rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col justify-between">
              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-50 mb-2">FreJun</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4">
                 FreJun lets you make and track business calls in India with ease — identify incoming calls, make outgoing calls, and access all call records seamlessly.
                </p>
              </div>
              <div className="p-5 sm:p-6 pt-0">
                 <a
                  href="https://play.google.com/store/apps/details?id=com.frejun.FreJunApp&hl=en_IN&pli=1" // Placeholder link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-green-400 transition duration-300 mr-2 mb-2"
                >
                  <AppStoreIcon store="android" /> Play Store
                </a>
                <a
                  href="https://apps.apple.com/us/app/frejun-dialer/id1621698092" // Placeholder link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-400 transition duration-300 mb-2"
                >
                  <AppStoreIcon store="ios" /> App Store
                </a>
              </div>
            </div>

            {/* Project Card 4 */}
            <div className="bg-gray-700 rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col justify-between">
              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-50 mb-2">Timealign</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4">
                  Timealign is a productivity app designed to help you manage your time effectively. With features like task scheduling, reminders, and analytics, you can optimize your workflow and stay focused on what matters most.
                </p>
              </div>
              <div className="p-5 sm:p-6 pt-0">
                <a
                  href="https://apps.apple.com/us/app/timealign-track-manage-time/id6448807385" // Placeholder link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-400 transition duration-300 mb-2"
                >
                  <AppStoreIcon store="ios" /> App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="container mx-auto py-16 sm:py-20 px-6 sm:px-8 min-h-[calc(80vh-160px)] sm:min-h-[calc(100vh-160px)] flex flex-col items-center justify-center"> {/* Adjusted min-height for mobile */}
        <div
          className={`text-center transition-all duration-1000 ease-out
            ${isVisible.blogContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-50 mb-4 sm:mb-6">Blog</h2> {/* Responsive text */}
          <p className="text-2xl sm:text-3xl text-teal-400 mb-3 sm:mb-4">Coming Soon!</p> {/* Responsive text */}
          <p className="text-lg sm:text-xl text-gray-300"> {/* Responsive text */}
            I'm working on some exciting content. Stay tuned!
          </p>
           <svg className="mx-auto mt-6 sm:mt-8 w-16 h-16 sm:w-24 sm:h-24 text-teal-500 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Responsive icon size */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 text-center p-6 sm:p-8"> {/* Responsive padding */}
        <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Hinal Tilavat. All rights reserved.</p>
        <div className="flex justify-center space-x-4 sm:space-x-6 mt-3 sm:mt-4"> {/* Responsive spacing */}
          <a href="https://www.linkedin.com/in/hinal-tilavat" className="text-gray-400 hover:text-teal-400 transition duration-300 text-sm sm:text-base">
            LinkedIn
          </a>
          <a href="https://github.com/hinaltilavat" className="text-gray-400 hover:text-teal-400 transition duration-300 text-sm sm:text-base">
            GitHub
          </a>
         
        </div>
      </footer>

      {/* Custom CSS for animations and Inter font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        @keyframes pulse-slow {
          0% {
            transform: scale(1);
            opacity: 0.2; 
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3; 
          }
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }

        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }

        /* Ensure smooth scrolling behavior is applied */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default App;
