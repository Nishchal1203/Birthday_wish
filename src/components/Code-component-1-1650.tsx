import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface GiftBoxInvitationProps {
  onOpen: () => void;
}

export function GiftBoxInvitation({ onOpen }: GiftBoxInvitationProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onOpen();
  };

  return (
    <div className="min-h-screen bg-creamy-white flex flex-col items-center justify-center p-8">
      <motion.h1 
        className="font-heading text-charcoal-grey mb-16 text-center text-4xl md:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        For my dearest, Behli
      </motion.h1>
      
      <motion.div
        className="relative cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Gift Box */}
        <div className="relative">
          {/* Box Base */}
          <motion.div 
            className="w-48 h-48 md:w-64 md:h-64 bg-dusty-rose rounded-xl shadow-2xl"
            animate={{ 
              rotateY: isHovered ? 5 : 0,
              rotateX: isHovered ? 5 : 0 
            }}
            transition={{ duration: 0.3 }}
            style={{ transformStyle: "preserve-3d" }}
          />
          
          {/* Ribbon Vertical */}
          <motion.div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-full bg-soft-gold shadow-lg"
            animate={{ 
              scaleY: isHovered ? 1.02 : 1
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Ribbon Horizontal */}
          <motion.div 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-8 bg-soft-gold shadow-lg"
            animate={{ 
              scaleX: isHovered ? 1.02 : 1
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Bow */}
          <motion.div 
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 3 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Left bow */}
              <div className="absolute -left-4 w-8 h-12 bg-soft-gold rounded-full transform rotate-12 shadow-lg"></div>
              {/* Right bow */}
              <div className="absolute -right-4 w-8 h-12 bg-soft-gold rounded-full transform -rotate-12 shadow-lg"></div>
              {/* Center knot */}
              <div className="w-6 h-6 bg-soft-gold rounded-full mx-auto shadow-lg"></div>
            </div>
          </motion.div>
          
          {/* Sparkles */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div
                  className="absolute -top-8 -left-8 w-2 h-2 bg-soft-gold rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute -top-12 -right-6 w-1.5 h-1.5 bg-soft-gold rounded-full animate-sparkle"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-10 w-2.5 h-2.5 bg-dusty-rose rounded-full animate-sparkle"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      <motion.p 
        className="font-body text-muted-taupe mt-8 text-center text-lg opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        Tap to unwrap your surprise
      </motion.p>
    </div>
  );
}