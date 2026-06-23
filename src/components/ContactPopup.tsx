import { useEffect } from 'react';

export type PopupType = 'success' | 'error';

interface ContactPopupProps {
  type: PopupType;
  title: string;
  message: string;
  onClose: () => void;
}

export default function ContactPopup({ type, title, message, onClose }: ContactPopupProps) {
  const isSuccess = type === 'success';

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="إغلاق"
      />

      <div className="relative w-full max-w-md animate-fade-in rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-gray-700 dark:bg-slate-800">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-700 dark:hover:text-white"
          aria-label="إغلاق"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-5 flex h-16 w-16 items-center justify-center rounded-full ${
              isSuccess
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                : 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
            }`}
          >
            {isSuccess ? (
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          <h3
            id="popup-title"
            className={`mb-2 text-xl font-bold ${
              isSuccess ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'
            }`}
          >
            {title}
          </h3>

          <p className="mb-8 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{message}</p>

          <button
            type="button"
            onClick={onClose}
            className={isSuccess ? 'btn-primary w-full' : 'btn-outline w-full border-red-200 text-red-700 hover:border-red-300 hover:bg-red-50 hover:text-red-800 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40'}
          >
            {isSuccess ? 'حسناً' : 'حاول مرة أخرى'}
          </button>
        </div>
      </div>
    </div>
  );
}
