'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6">
      {/* Animated icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
        className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center shadow-lg mb-8"
      >
        <Sparkles size={28} className="text-white" />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl font-bold text-text-primary tracking-tight text-center"
      >
        How can I help your research today?
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-text-secondary text-[15px] mt-3 text-center max-w-md"
      >
        Ask me about patents, competitors, similarity analysis, or freedom to operate
      </motion.p>
    </div>
  );
}
