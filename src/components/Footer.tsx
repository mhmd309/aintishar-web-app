import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { COMPANY } from '../data/company';
import type { SocialLink } from '../types';

const quickLinks = [
  { href: '#home', label: 'الرئيسية' },
  { href: '#projects', label: 'المشاريع' },
  { href: '#about', label: 'من نحن' },
  { href: '#contact', label: 'تواصل معنا' },
];

const socialLinks: (SocialLink & { className: string })[] = [
  { name: 'فيسبوك', url: 'https://facebook.com', icon: 'facebook', className: 'footer-social-facebook' },
  { name: 'واتساب', url: 'https://wa.me/+201024704900', icon: 'whatsapp', className: 'footer-social-whatsapp' },
];

function SocialIcon({ type }: { type: SocialLink['icon'] }) {
  const icons: Record<SocialLink['icon'], ReactNode> = {
    facebook: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
    whatsapp: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    ),
  };

  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      {icons[type]}
    </svg>
  );
}

function FooterLinkIcon() {
  return (
    <svg className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-primary-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-primary-600/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-primary-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.0 }} className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* العلامة التجارية */}
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-400">
              {COMPANY.description}
            </p>
            <a href="#contact" className="btn-hero mt-6 inline-flex text-sm">
              ابدأ مشروعك الآن
              <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* روابط سريعة */}
          <div className="lg:col-span-2">
            <h4 className="footer-heading">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link group">
                    <FooterLinkIcon />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* تواصل */}
          <div className="lg:col-span-3">
            <h4 className="footer-heading">تواصل معنا</h4>
            <div className="space-y-3">
              <a href={`mailto:${COMPANY.email}`} className="footer-contact-item group">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-500/20 text-primary-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="transition-colors group-hover:text-white">{COMPANY.email}</span>
              </a>
              <div className="footer-contact-item">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-500/20 text-primary-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>الأحد – الخميس: 9 ص – 6 م</span>
              </div>
            </div>
          </div>

          {/* سوشيال */}
          <div className="lg:col-span-2">
            <h4 className="footer-heading">تابعنا</h4>
            <p className="mb-4 text-sm text-gray-500">تواصل معنا عبر منصات التواصل</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`footer-social ${social.className}`}
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-sm text-gray-500 sm:text-right">
             جميع الحقوق محفوظة © {currentYear} {COMPANY.fullName}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
            <span>برمجيات</span>
            <span className="text-gray-700">•</span>
            <span>تسويق إلكتروني</span>
            <span className="text-gray-700">•</span>
            <span>تصميم مواقع</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
