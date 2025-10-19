import { useState } from 'react';
import { Menu, X, Calendar, Users, Trophy, Image, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'party-details', label: 'Informasjon', icon: Info },
    { id: 'event-details', label: 'Eventdetaljer', icon: Calendar },
    { id: 'nominees', label: 'Årets Nominerte', icon: Trophy },
    { id: 'gallery', label: 'Bildegalleri', icon: Image },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Button - Sticky */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-party-blue to-party-blue-light rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-party-blue/30 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-party-blue to-party-blue-light p-6">
                <h2 className="text-2xl font-bold text-white">Meny</h2>
              </div>

              {/* Menu Items */}
              <div className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-party-blue/50 transition-all group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-party-blue to-party-blue-light rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-medium text-left">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10">
                <p className="text-white/60 text-xs text-center">
                  Transcom Awards 2025
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationMenu;

