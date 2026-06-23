import type { ReactNode } from 'react';
import { COMPANY } from '../data/company';
import type { Statistic } from '../types';

const ABOUT_IMAGES = {
  primary: '/img/about/01.png',
  secondary: '/img/about/02.png',
} as const;

const statistics: Statistic[] = [
  { id: 1, label: 'مشروع مكتمل', value: '0', icon: 'projects' },
  { id: 2, label: 'عميل سعيد', value: '0', icon: 'clients' },
  { id: 3, label: 'سنوات خبرة', value: '0', icon: 'experience' },
];

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

export default function AboutUs() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="section-title mb-4">من نحن</h2>
          <p className="section-subtitle mx-auto max-w-2xl">{COMPANY.aboutSubtitle}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-slate-800">
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
          </div>

          <div className="relative">
            <div className="grid gap-4">
              <img
                src={ABOUT_IMAGES.primary}
                alt={`${COMPANY.fullName} - صورة 1`}
                className="h-64 w-full rounded-2xl object-cover shadow-xl sm:h-72"
              />
              <img
                src={ABOUT_IMAGES.secondary}
                alt={`${COMPANY.fullName} - صورة 2`}
                className="h-48 w-full rounded-2xl object-cover shadow-lg sm:h-56 lg:-mt-20 lg:mr-12 lg:w-[85%]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-primary-900/30 to-transparent" />
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {statistics.map((stat) => (
            <div
              key={stat.id}
              className="group rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg dark:border-gray-700 dark:bg-slate-800 dark:hover:border-primary-700"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-950/60 dark:text-primary-400">
                <StatIcon type={stat.icon} />
              </div>
              <p className="mb-1 text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
