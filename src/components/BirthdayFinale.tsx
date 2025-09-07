import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function BirthdayFinale() {
  const [showParchment, setShowParchment] = useState(false);
  
  const birthdayText = "Happy Birthday, Somya!";
  const personalMessage = "";

  useEffect(() => {
    // Show parchment after main text animation
    const timer = setTimeout(() => {
      setShowParchment(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-creamy-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating sparkles */}
        {Array.from({ length: 20 }).map((_, i) => (
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
      <div className="text-center mb-16 relative z-10">
        <motion.h1 className="font-heading text-charcoal-grey text-5xl md:text-6xl lg:text-7xl">
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
        className="relative max-w-2xl mx-auto"
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
          <svg
            viewBox="0 0 400 300"
            className="w-full max-w-2xl drop-shadow-2xl"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Paper texture gradient */}
            <defs>
              <linearGradient id="parchment" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF8DC" />
                <stop offset="50%" stopColor="#F5F5DC" />
                <stop offset="100%" stopColor="#FFFACD" />
              </linearGradient>
              <filter id="roughPaper">
                <feTurbulence baseFrequency="0.04" numOctaves="5" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
              </filter>
            </defs>
            
            {/* Parchment shape */}
            <path
              d="M20 30 Q15 20 25 15 L370 15 Q385 20 380 30 L380 260 Q385 275 375 280 L25 280 Q10 275 15 260 Z"
              fill="url(#parchment)"
              stroke="#D4AF37"
              strokeWidth="1"
              filter="url(#roughPaper)"
            />
            
            {/* Decorative corners */}
            <circle cx="50" cy="50" r="3" fill="var(--soft-gold)" opacity="0.3" />
            <circle cx="350" cy="50" r="3" fill="var(--soft-gold)" opacity="0.3" />
            <circle cx="350" cy="250" r="3" fill="var(--soft-gold)" opacity="0.3" />
            <circle cx="50" cy="250" r="3" fill="var(--soft-gold)" opacity="0.3" />
          </svg>

          {/* Message text overlay */}
          <div className="absolute inset-8 flex items-center justify-center p-4">
            <motion.div 
              className="w-full max-w-md"
              initial={{ opacity: 0 }}
              animate={showParchment ? { opacity: 1 } : {}}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <motion.p
                className="font-script text-charcoal-grey text-lg md:text-xl text-center leading-relaxed break-words"
                initial={{ opacity: 0 }}
                animate={showParchment ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1.5 }}
              >
                {personalMessage}
              </motion.p>
              
              {/* Blinking cursor effect */}
              <motion.span
                className="inline-block w-0.5 h-6 bg-charcoal-grey ml-1"
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
          </div>

          {/* Signature area */}
          <motion.div 
            className="absolute bottom-4 right-8"
            initial={{ opacity: 0 }}
            animate={showParchment ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 4 }}
          >
            <p className="font-script text-muted-taupe text-lg">
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
        className="mt-12 text-6xl"
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