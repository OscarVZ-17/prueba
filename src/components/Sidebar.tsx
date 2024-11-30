import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Book, Heart, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, text: 'Inicio', path: '/home' },
    { icon: Heart, text: 'Recuerdos', path: '/memories' },
    { icon: Book, text: 'Poemas', path: '/poems' },
    { icon: BookOpen, text: 'Diario', path: '/diary' },
  ];

  return (
    <>
      <motion.div
        initial={false}
        animate={{ 
          width: isCollapsed ? '80px' : '280px',
          transition: { duration: 0.3, ease: 'easeInOut' }
        }}
        className="fixed left-0 top-0 h-full bg-white shadow-lg py-6 z-40"
      >
        {/* Heart Icon Button - Now positioned relative to viewport */}
        <div className="fixed top-6 z-50" style={{
          left: isCollapsed ? '20px' : '220px',
          transition: 'left 0.3s ease-in-out'
        }}>
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          >
            <Heart className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        <div className="px-4">
          <motion.div 
            className="flex items-center mb-8 ml-2"
            animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
          >
            <Heart className="w-8 h-8 text-pink-500" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="ml-3 text-xl font-bold text-gray-800"
                >
                  Nuestro Amor
                </motion.h2>
              )}
            </AnimatePresence>
          </motion.div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-600'
                      : 'text-gray-600 hover:bg-pink-50'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="ml-3"
                    >
                      {item.text}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>
      
      <motion.div
        animate={{ 
          marginLeft: isCollapsed ? '80px' : '280px',
          width: isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 280px)',
          transition: { duration: 0.3, ease: 'easeInOut' }
        }}
        className="min-h-screen bg-gray-50"
      >
        <div className="p-8">
          <slot />
        </div>
      </motion.div>
    </>
  );
}