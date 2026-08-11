import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { COMPANY } from '../data/company';
import { getCompletedProjectsCount, getYearsOfExperience } from '../utils/statistics';

const ABOUT_IMAGES = [
  {
    src: '/img/about/about-01.jpeg',
    alt: `${COMPANY.fullName} - خدمات البرمجة والتسويق`,
  },
  {
    src: '/img/about/about-2.png',
    alt: `${COMPANY.fullName} - حلول رقمية متكاملة`,
  },
  {
    src: '/img/about/about-3.png',
    alt: `${COMPANY.fullName} - تصميم وتسويق إلكتروني`,
  },
] as const;

function StatIcon({ type }: { type: string }) {
  const icons: Record<string, ReactNode> = {
    projects: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    clients: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    experience: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };
  return <>{icons[type]}</>;
}

function StatCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: string;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center p-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
        <StatIcon type={icon} />
      </div>
      <p className="mb-1 text-4xl font-bold text-white">{value}</p>
      <p className="text-primary-100">{label}</p>
    </div>
  );
}

export default function AboutUs() {
  const completedProjects = getCompletedProjectsCount();
  const yearsOfExperience = getYearsOfExperience();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeImage = ABOUT_IMAGES[activeImageIndex];

  const statistics = [
    { id: 1, label: 'مشروع مكتمل', value: String(completedProjects), icon: 'projects' },
    { id: 2, label: 'عميل سعيد', value: String(COMPANY.happyClients), icon: 'clients' },
    { id: 3, label: 'سنوات خبرة', value: String(yearsOfExperience), icon: 'experience' },
  ] as const;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % ABOUT_IMAGES.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
      const tryPlay = async () => {
        try {
          if (videoRef.current) {
            videoRef.current.muted = false;
            await videoRef.current.play();
          }
        } catch {
          try {
            if (videoRef.current) {
              videoRef.current.muted = true;
              await videoRef.current.play();
            }
          } catch {
            // ignore - user will click play manually
          }
        }
      };
      tryPlay();
    } else {
      document.body.style.overflow = '';
      try {
        videoRef.current?.pause();
      } catch {
        // ignore
      }
      if (videoRef.current) videoRef.current.currentTime = 0;
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVideoOpen]);

  const closeVideo = () => setIsVideoOpen(false);

  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.0 }} className="mb-16 text-center">
          <h2 className="section-title mb-4">من نحن</h2>
          <p className="section-subtitle mx-auto max-w-2xl">{COMPANY.aboutSubtitle}</p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.0 }} className="space-y-8">
            <div className="rounded-2xl border border-primary-100 bg-white p-8 shadow-sm dark:border-primary-900/60 dark:bg-slate-800">
              <h3 className="card-heading mb-4">عن الشركة</h3>
              <p className="text-body">{COMPANY.description}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-6 shadow-sm dark:border-primary-900/50 dark:from-primary-950/60 dark:to-slate-800">
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">رسالتنا</h3>
                <p className="text-sm text-body">{COMPANY.mission}</p>
              </div>

              <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-6 shadow-sm dark:border-primary-900/50 dark:from-primary-950/60 dark:to-slate-800">
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">رؤيتنا</h3>
                <p className="text-sm text-body">{COMPANY.vision}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-slate-800">
                <h4 className="mb-2 font-bold text-primary-700 dark:text-primary-400">البرمجيات</h4>
                <p className="text-sm text-body">
                  تطوير المواقع، التطبيقات، الأنظمة السحابية، والمتاجر الإلكترونية.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-slate-800">
                <h4 className="mb-2 font-bold text-primary-700 dark:text-primary-400">التسويق الإلكتروني</h4>
                <p className="text-sm text-body">
                  إدارة السوشيال ميديا، SEO، الإعلانات المدفوعة، وتحليل الأداء الرقمي.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.0 }} className="relative">
            <div className="mt-10 overflow-hidden rounded-2xl border border-primary-100 dark:border-primary-900/60" style={{ aspectRatio: '2560 / 1440' }}>
              <motion.img
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                className="h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
            </div>

            <div className="mt-4 flex justify-center gap-2" dir="ltr">
              {ABOUT_IMAGES.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    activeImageIndex === index
                      ? 'w-8 bg-primary-500'
                      : 'w-2.5 bg-primary-200 hover:bg-primary-300 dark:bg-white/20 dark:hover:bg-white/30'
                  }`}
                  aria-label={`عرض صورة ${index + 1}`}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-primary-500/40 active:scale-[0.98]"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                رؤية الشرح التوضيحي عن الشركة
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.0 }} className="mt-16 overflow-hidden rounded-3xl border border-primary-400/20 bg-gradient-to-r from-[#071326] via-[#10233e] to-primary-700 shadow-xl shadow-primary-900/15">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {statistics.map((stat) => (
              <StatCard
                key={stat.id}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all duration-200 hover:bg-red-500/80"
                aria-label="إغلاق الفيديو"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="aspect-video w-full bg-black">
                <video
                  ref={videoRef}
                  controls
                  controlsList="nodownload"
                  playsInline
                  preload="auto"
                  className="h-full w-full object-contain"
                >
                  <source src="/video/explanation.mp4" type="video/mp4;codecs=avc1,mp4a.40.2" />
                  <source src="/video/explanation.mp4" type="video/mp4" />
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center text-white">
                    <svg className="h-16 w-16 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5M3 5.25h18a2.25 2.25 0 012.25 2.25v9A2.25 2.25 0 0121 18.75H3A2.25 2.25 0 01.75 16.5v-9A2.25 2.25 0 013 5.25z" />
                    </svg>
                    <p className="text-lg font-semibold">تعذر تشغيل الفيديو</p>
                    <p className="text-sm text-white/60">
                      المتصفح لديه لا يدعم تنسيق الفيديو.
                      <a href="/video/explanation.mp4" className="ml-1 text-primary-400 underline hover:text-primary-300" download>
                        اضغط هنا لتحميل الفيديو
                      </a>
                    </p>
                  </div>
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
