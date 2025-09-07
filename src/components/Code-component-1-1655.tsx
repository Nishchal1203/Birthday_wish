import { motion } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Photo {
  id: number;
  url: string;
  caption: string;
}

interface PhotoGalleryProps {
  onComplete: () => void;
}

export function PhotoGallery({ onComplete }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  
  const photos: Photo[] = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1638644074459-9067407b72a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwbGF1Z2hpbmclMjB0b2dldGhlcnxlbnwxfHx8fDE3NTcyNjcyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      caption: "That day we couldn't stop laughing"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1729870526122-0de9a7113dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc1NzI2NzI1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      caption: "Celebrating life's beautiful moments"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1706874807253-7c04fb2c8887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMG1lbW9yaWVzJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzU3MjY3MjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      caption: "Making memories that last forever"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1615574147300-62cc3e37868f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwZnVuJTIwdGltZXN8ZW58MXx8fHwxNzU3MjY3MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      caption: "Adventures and fun times"
    }
  ];

  // Floating balloons for background animation
  const balloons = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    size: 20 + Math.random() * 20,
    color: i % 2 === 0 ? 'bg-dusty-rose' : 'bg-soft-gold'
  }));

  return (
    <div className="min-h-screen bg-creamy-white relative overflow-hidden">
      {/* Floating Balloons Background */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className={`fixed w-${balloon.size} h-${balloon.size} ${balloon.color} rounded-full opacity-20 pointer-events-none`}
          style={{
            left: `${balloon.left}%`,
            width: `${balloon.size}px`,
            height: `${balloon.size}px`
          }}
          initial={{ y: '100vh' }}
          animate={{ y: '-100vh' }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: balloon.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 5,
            ease: 'linear'
          }}
        />
      ))}

      <div className="relative z-10 pt-16 pb-32">
        <motion.h2 
          className="font-heading text-charcoal-grey text-center mb-16 text-3xl md:text-4xl lg:text-5xl px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Beautiful Journey
        </motion.h2>

        {/* Photo Timeline */}
        <div className="space-y-24 px-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className={`flex ${index % 2 === 0 ? 'justify-start md:justify-end' : 'justify-end md:justify-start'} relative`}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -100 : 100,
                rotate: index % 2 === 0 ? -5 : 5
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0, 
                rotate: 0 
              }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2 
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Polaroid Style Photo */}
              <motion.div
                className={`bg-white p-4 pb-8 shadow-2xl cursor-pointer transform ${
                  index % 2 === 0 ? 'rotate-2' : '-rotate-2'
                } hover:rotate-0 transition-transform duration-300 max-w-sm relative z-20`}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                onClick={() => setSelectedPhoto(photo.id)}
              >
                <ImageWithFallback
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-64 object-cover rounded-sm"
                />
                <p className="font-script text-charcoal-grey mt-4 text-center text-lg">
                  {photo.caption}
                </p>
                
                {/* Polaroid tape effect */}
                <div className="absolute -top-2 left-8 w-16 h-6 bg-white opacity-80 shadow-sm transform -rotate-12"></div>
                <div className="absolute -top-1 right-12 w-12 h-4 bg-white opacity-80 shadow-sm transform rotate-45"></div>
              </motion.div>

              {/* Timeline connector (only visible on larger screens) */}
              {index < photos.length - 1 && (
                <div className={`hidden md:block absolute top-1/2 ${
                  index % 2 === 0 ? 'right-0 md:left-0' : 'left-0 md:right-0'
                } w-24 h-0.5 bg-dusty-rose opacity-30 transform -translate-y-1/2`} 
                style={{ 
                  left: index % 2 === 0 ? '-6rem' : 'auto',
                  right: index % 2 !== 0 ? '-6rem' : 'auto'
                }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div 
          className="flex justify-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button
            className="bg-soft-gold text-white px-8 py-4 rounded-full font-body shadow-lg hover:bg-opacity-90 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
          >
            Continue the Journey
          </motion.button>
        </motion.div>
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div
            className="bg-white p-6 pb-10 rounded-lg max-w-2xl max-h-[80vh] overflow-hidden"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={photos.find(p => p.id === selectedPhoto)?.url || ''}
              alt={photos.find(p => p.id === selectedPhoto)?.caption || ''}
              className="w-full h-auto max-h-[60vh] object-contain rounded"
            />
            <p className="font-script text-charcoal-grey mt-4 text-center text-xl">
              {photos.find(p => p.id === selectedPhoto)?.caption}
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}