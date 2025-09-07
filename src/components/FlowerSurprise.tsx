import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface FlowerSurpriseProps {
  onVideoReveal: () => void;
  onComplete: () => void;
}

export function FlowerSurprise({ onVideoReveal, onComplete }: FlowerSurpriseProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleFlowerClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      // Start video reveal after flower blooming animation
      setTimeout(() => {
        setShowVideo(true);
        onVideoReveal();
      }, 2500);
    }
  };

  const closeVideo = () => {
    setShowVideo(false);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-creamy-white flex flex-col items-center justify-center p-8 relative">
      <AnimatePresence>
        {!showVideo && (
          <>
            <motion.p 
              className="font-body text-muted-taupe mb-12 text-center text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              A little surprise for you...
            </motion.p>
            
            {/* Flower Bud/Bloom */}
            <motion.div
              className="relative cursor-pointer"
              onClick={handleFlowerClick}
              whileHover={!isClicked ? { scale: 1.05 } : {}}
              whileTap={!isClicked ? { scale: 0.95 } : {}}
            >
              <svg 
                width="200" 
                height="200" 
                viewBox="0 0 200 200" 
                className="drop-shadow-2xl"
              >
                {/* Stem */}
                <motion.path
                  d="M100 200 L100 120"
                  stroke="#8FBC8F"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                
                {/* Leaves */}
                <motion.path
                  d="M100 150 Q80 140 85 125 Q90 135 100 140"
                  fill="#9ACD32"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                />
                <motion.path
                  d="M100 160 Q120 150 115 135 Q110 145 100 150"
                  fill="#9ACD32"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                />

                {!isClicked ? (
                  /* Closed Bud */
                  <>
                    <motion.ellipse
                      cx="100"
                      cy="100"
                      rx="15"
                      ry="25"
                      fill="var(--dusty-rose)"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: 1.5 }}
                    />
                    <motion.ellipse
                      cx="100"
                      cy="95"
                      rx="12"
                      ry="20"
                      fill="#D8A7CA"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                    />
                  </>
                ) : (
                  /* Blooming Flower */
                  <>
                    {/* Outer petals */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.ellipse
                        key={`outer-${i}`}
                        cx="100"
                        cy="100"
                        rx="25"
                        ry="15"
                        fill="var(--dusty-rose)"
                        style={{ 
                          transformOrigin: '100px 100px',
                        }}
                        initial={{ 
                          scale: 0, 
                          rotate: i * 45,
                          opacity: 0 
                        }}
                        animate={{ 
                          scale: 1, 
                          rotate: i * 45,
                          opacity: 0.8 
                        }}
                        transition={{ 
                          duration: 0.8, 
                          delay: i * 0.1,
                          ease: "easeOut" 
                        }}
                      />
                    ))}
                    
                    {/* Inner petals */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.ellipse
                        key={`inner-${i}`}
                        cx="100"
                        cy="100"
                        rx="18"
                        ry="10"
                        fill="#F4C2C2"
                        style={{ 
                          transformOrigin: '100px 100px',
                        }}
                        initial={{ 
                          scale: 0, 
                          rotate: i * 60 + 30,
                          opacity: 0 
                        }}
                        animate={{ 
                          scale: 1, 
                          rotate: i * 60 + 30,
                          opacity: 0.9 
                        }}
                        transition={{ 
                          duration: 0.6, 
                          delay: 0.8 + i * 0.08,
                          ease: "easeOut" 
                        }}
                      />
                    ))}
                    
                    {/* Center */}
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="8"
                      fill="var(--soft-gold)"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.5 }}
                    />
                    
                    {/* Sparkle particles */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.circle
                        key={`sparkle-${i}`}
                        cx={100 + (Math.cos(i * 30 * Math.PI / 180) * 60)}
                        cy={100 + (Math.sin(i * 30 * Math.PI / 180) * 60)}
                        r="2"
                        fill="var(--soft-gold)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1.5, 0], 
                          opacity: [0, 1, 0] 
                        }}
                        transition={{ 
                          duration: 1.5, 
                          delay: 1.8 + i * 0.1,
                          ease: "easeInOut" 
                        }}
                      />
                    ))}
                  </>
                )}
              </svg>
              
              {!isClicked && (
                <motion.p 
                  className="font-body text-muted-taupe mt-6 text-center opacity-70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 0.8, delay: 2.5 }}
                >
                  Tap to bloom
                </motion.p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Close button */}
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-60 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl transition-all duration-200"
              >
                ×
              </button>
              
              {/* Video Player */}
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onEnded={closeVideo}
              >
                <source src="/videos/birthday_video.mp4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}