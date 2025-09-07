import React from "react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function BirthdayFinale() {
  const [showParchment, setShowParchment] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const birthdayText = "Happy Birthday, Somya!";
  const personalMessage = "May your special day be filled with endless joy and beautiful memories! ❤️";
  useEffect(() => {
    // Show parchment after main text animation
    const timer = setTimeout(() => {
      setShowParchment(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Error boundary for the component
  if (hasError) {
    return (
      <div className="min-h-screen bg-creamy-white flex flex-col items-center justify-center p-8">
        <h1 className="font-heading text-charcoal-grey text-4xl mb-4">Happy Birthday, Somya!</h1>
        <p className="font-body text-muted-taupe text-lg text-center">
          May your special day be filled with endless joy and beautiful memories! ❤️
        </p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-creamy-white flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden"
      onError={() => setHasError(true)}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating sparkles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-soft-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 4,
              repeat: Infinity,
              repeatDelay: Math.random() * 3
            }}
          />
        ))}
        
        {/* Gentle floating hearts */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-dusty-rose text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Main Birthday Message */}
      <div className="text-center mb-8 sm:mb-16 relative z-10 px-4">
        <motion.h1 className="font-heading text-charcoal-grey text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl">
          {birthdayText.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut"
              }}
              className="inline-block"
              style={{ transformOrigin: "bottom center" }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Music note animation */}
        <motion.div 
          className="flex justify-center mt-8 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          {['🎵', '🎶', '🎵'].map((note, i) => (
            <motion.span
              key={i}
              className="text-2xl text-soft-gold"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {note}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Parchment with Personal Message */}
      <motion.div
        className="relative max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
        animate={showParchment ? { 
          opacity: 1, 
          scale: 1, 
          rotateX: 0 
        } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Parchment background */}
        <div className="relative">
          <div className="w-full h-72 sm:h-80 md:h-96 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-2xl border-2 border-yellow-200 relative overflow-hidden">
            {/* Parchment texture */}
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg"></div>
            </div>
            
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
          </div>

          {/* Message text overlay */}
          <div className="absolute inset-4 sm:inset-6 md:inset-8 flex items-center justify-center p-3 sm:p-4">
            <motion.div 
              className="w-full h-full flex flex-col justify-center items-center"
              initial={{ opacity: 0 }}
              animate={showParchment ? { opacity: 1 } : {}}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <motion.div
                className="w-full max-w-full overflow-hidden border border-yellow-300 border-opacity-30 rounded-lg p-3 bg-white bg-opacity-20"
                initial={{ opacity: 0 }}
                animate={showParchment ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <p className="font-script text-charcoal-grey text-xs sm:text-sm md:text-base lg:text-lg text-center leading-relaxed break-words hyphens-auto px-2 max-h-full overflow-y-auto">
                  {personalMessage}
                </p>
                
                {/* Blinking cursor effect */}
                <motion.span
                  className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-charcoal-grey ml-1"
                  initial={{ opacity: 0 }}
                  animate={showParchment ? { 
                    opacity: [0, 1, 1, 0]
                  } : {}}
                  transition={{ 
                    duration: 1,
                    delay: 2.5,
                    repeat: 3,
                    repeatType: "loop"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Signature area */}
          <motion.div 
            className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 md:bottom-6 md:right-8"
            initial={{ opacity: 0 }}
            animate={showParchment ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 4 }}
          >
            <p className="font-script text-muted-taupe text-xs sm:text-sm md:text-base lg:text-lg">
              With all my love and wishes ❤️ Nischal
            </p>
          </motion.div>
        </div>
        {/* Magical sparkles around parchment */}
        {showParchment && Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`parchment-sparkle-${i}`}
            className="absolute w-2 h-2 bg-soft-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: 1 + Math.random() * 2,
              repeat: Infinity,
              repeatDelay: 3 + Math.random() * 2
            }}
          />
        ))}
      </motion.div>

      {/* Final decorative flourish */}
      <motion.div 
        className="mt-6 sm:mt-12 text-3xl sm:text-4xl md:text-6xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={showParchment ? { 
          opacity: 1, 
          scale: 1,
          rotate: [0, -5, 5, 0]
        } : {}}
        transition={{ 
          duration: 1, 
          delay: 5,
          rotate: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      >
        🎂✨🎉
      </motion.div>
    </div>
  );
}