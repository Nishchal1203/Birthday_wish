import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

interface InteractiveCakeProps {
  onSliced: () => void;
}

export function InteractiveCake({ onSliced }: InteractiveCakeProps) {
  const [isSliced, setIsSliced] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSlicing, setIsSlicing] = useState(false);

  const handleCakeTap = () => {
    if (!isSliced && !isSlicing) {
      setIsSlicing(true);
      // Start slicing animation
      setTimeout(() => {
        setIsSliced(true);
        setShowConfetti(true);
        // Hide confetti after animation
        setTimeout(() => {
          setShowConfetti(false);
          onSliced();
        }, 2000);
      }, 800);
    }
  };

  // Handle swipe gesture for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isSliced && !isSlicing) {
      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      
      const handleTouchEnd = (e: TouchEvent) => {
        const touch = e.changedTouches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Check if it's a horizontal swipe (more horizontal than vertical)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
          handleCakeTap();
        }
        
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      document.addEventListener('touchend', handleTouchEnd);
    }
  };

  // Get window dimensions for confetti
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-creamy-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <motion.h2 
        className="font-heading text-charcoal-grey text-center mb-16 text-3xl md:text-4xl lg:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Make a Wish!
      </motion.h2>

      <div className="relative">
        {/* Cake Plate */}
        <motion.div 
          className="w-80 h-6 bg-white rounded-full shadow-lg mb-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Cake Base */}
        <motion.div 
          className="relative w-64 h-32 mx-auto cursor-pointer"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: isSlicing ? 1.05 : 1, 
            opacity: 1,
            rotate: isSlicing ? [0, -2, 2, 0] : 0
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.5,
            rotate: isSlicing ? { duration: 0.3, repeat: 2 } : {}
          }}
          onClick={handleCakeTap}
          onTouchStart={handleTouchStart}
          whileHover={!isSliced && !isSlicing ? { scale: 1.02 } : {}}
          whileTap={!isSliced && !isSlicing ? { scale: 0.98 } : {}}
        >
          {/* Main cake body */}
          <div className="w-full h-full bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-3xl relative overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 left-4 w-8 h-6 bg-white rounded-b-full opacity-90"></div>
            <div className="absolute top-0 left-16 w-6 h-4 bg-white rounded-b-full opacity-90"></div>
            <div className="absolute top-0 left-28 w-10 h-8 bg-white rounded-b-full opacity-90"></div>
            <div className="absolute top-0 left-44 w-7 h-5 bg-white rounded-b-full opacity-90"></div>
            <div className="absolute top-0 left-56 w-6 h-6 bg-white rounded-b-full opacity-90"></div>
            
            {/* Cake decoration */}
            <div className="absolute inset-4 border-2 border-dusty-rose rounded-2xl opacity-50"></div>
            
            {/* Gold sprinkles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-3 bg-soft-gold rounded-full animate-sparkle"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 60 + 20}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Slice line (appears when slicing) */}
          <AnimatePresence>
            {isSlicing && (
              <motion.div
                className="absolute top-0 left-1/3 w-0.5 h-full bg-charcoal-grey z-10"
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            )}
          </AnimatePresence>

          {/* Cake slice (appears after slicing) */}
          <AnimatePresence>
            {isSliced && (
              <motion.div
                className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-b from-pink-200 to-pink-300 rounded-tl-3xl origin-right"
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: -20, rotate: -15 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ transformOrigin: "right center" }}
              >
                {/* Inner cake layers visible */}
                <div className="absolute inset-x-1 top-4 h-1 bg-yellow-200"></div>
                <div className="absolute inset-x-1 top-8 h-1 bg-pink-400"></div>
                <div className="absolute inset-x-1 top-12 h-1 bg-yellow-200"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Candles */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="relative">
              {/* Candle */}
              <motion.div 
                className="w-2 h-12 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              />
              {/* Flame */}
              <motion.div 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
              >
                <motion.div 
                  className="w-full h-full bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full"
                  animate={{ 
                    scaleY: [1, 1.2, 1],
                    scaleX: [1, 0.8, 1]
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.2
                  }}
                />
              </motion.div>
              {/* Wick */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-gray-800"></div>
            </div>
          ))}
        </div>

        {/* Tap instruction */}
        {!isSliced && !isSlicing && (
          <motion.div 
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.p 
              className="font-body text-muted-taupe text-sm sm:text-base"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap or swipe the cake to slice it! 🍰
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#D4AF37', '#E7BDB6', '#F4C2C2', '#FFB6C1', '#FFC0CB']}
          gravity={0.3}
          initialVelocityY={20}
          initialVelocityX={5}
        />
      )}

      {/* Backup Continue Button */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.8, delay: 3 }}
      >
        <motion.button
          className="bg-soft-gold text-white px-6 py-3 rounded-full font-body shadow-lg hover:bg-opacity-90 transition-colors duration-300 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            onSliced();
          }}
        >
          Continue to Finale →
        </motion.button>
      </motion.div>
    </div>
  );
}