'use client';

import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function FadeIn({ children, delay = 0, className = "", direction = 'up' }: FadeInProps) {
  
  // Define direction logic
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1], // Custom "Apple-like" ease curve
        delay: delay
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} // Trigger when 100px into view
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}