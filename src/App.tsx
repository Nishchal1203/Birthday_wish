import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GiftBoxInvitation } from "./components/GiftBoxInvitation";
import { PhotoGallery } from "./components/PhotoGallery";
import { FlowerSurprise } from "./components/FlowerSurprise";
import { InteractiveCake } from "./components/InteractiveCake";
import { BirthdayFinale } from "./components/BirthdayFinale";

type Screen = 'invitation' | 'gallery' | 'flower' | 'cake' | 'finale';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('invitation');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [backgroundMusicPlaying, setBackgroundMusicPlaying] = useState(false);
  
  // Audio refs
  const backgroundAudioRef = useRef<HTMLAudioElement>(null);
  const birthdayAudioRef = useRef<HTMLAudioElement>(null);

  const handleTransition = (nextScreen: Screen) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(nextScreen);
      setIsTransitioning(false);
    }, 500);
  };

  const handleGiftBoxOpen = () => {
    // Start background music when gift box is opened
    if (backgroundAudioRef.current && !backgroundMusicPlaying) {
      backgroundAudioRef.current.play().catch(() => {});
      setBackgroundMusicPlaying(true);
    }
    handleTransition('gallery');
  };

  const handleGalleryComplete = () => {
    handleTransition('flower');
  };

  const handleVideoReveal = () => {
    // Called when video is revealed - no immediate action needed
  };

  const handleFlowerComplete = () => {
    handleTransition('cake');
  };

  const handleCakeSliced = () => {
    // Stop background music and start birthday song
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
      setBackgroundMusicPlaying(false);
    }
    if (birthdayAudioRef.current) {
      birthdayAudioRef.current.play().catch(() => {});
    }
    handleTransition('finale');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'invitation':
        return <GiftBoxInvitation onOpen={handleGiftBoxOpen} />;
      case 'gallery':
        return <PhotoGallery onComplete={handleGalleryComplete} />;
      case 'flower':
        return <FlowerSurprise onVideoReveal={handleVideoReveal} onComplete={handleFlowerComplete} />;
      case 'cake':
        return <InteractiveCake onSliced={handleCakeSliced} />;
      case 'finale':
        return <BirthdayFinale />;
      default:
        return <GiftBoxInvitation onOpen={handleGiftBoxOpen} />;
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
      }
      if (birthdayAudioRef.current) {
        birthdayAudioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-creamy-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isTransitioning ? (
          <motion.div
            key="transition"
            className="fixed inset-0 bg-creamy-white flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-dusty-rose border-t-soft-gold rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            {renderCurrentScreen()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen progress indicator (subtle) */}
      <motion.div 
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
      >
        {(['invitation', 'gallery', 'flower', 'cake', 'finale'] as const).map((screen, index) => (
          <motion.div
            key={screen}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              currentScreen === screen ? 'bg-soft-gold' : 'bg-dusty-rose opacity-40'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </motion.div>

      {/* Audio Elements */}
      <audio
        ref={backgroundAudioRef}
        src="/audio/background_song.mp3"
        loop
        preload="auto"
      />
      <audio
        ref={birthdayAudioRef}
        src="/audio/background_song.mp3"
        preload="auto"
      />
    </div>
  );
}