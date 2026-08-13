import { motion } from 'framer-motion';
import { useViewCounter } from '../hooks/useViewCounter';

export default function FloatingViewCounter() {
  const views = useViewCounter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 1, type: 'spring', bounce: 0.4 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-2xl bg-[#071326]/80 px-5 py-3 shadow-2xl backdrop-blur-md border border-primary-500/20 group hover:border-primary-500/50 transition-colors"
      style={{ direction: 'rtl' }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500/20 text-primary-400 group-hover:scale-110 transition-transform duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>
      <div>
        <p className="text-xs text-gray-400">عدد المشاهدات</p>
        <p className="text-lg font-bold text-white tracking-wider">
          {views !== null ? views.toLocaleString('en-US') : '...'}
        </p>
      </div>
    </motion.div>
  );
}
