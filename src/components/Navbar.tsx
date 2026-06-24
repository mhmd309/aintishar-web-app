import { useEffect, useState } from 'react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { href: '#home', label: 'الرئيسية' },
  { href: '#projects', label: 'المشاريع' },
  { href: '#about', label: 'من نحن' },
  { href: '#contact', label: 'تواصل معنا' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(
    () => window.location.hash || '#home',
  );

  useEffect(() => {
    const updateActiveSection = () => {
      const offset = 120;
      const scrollPos = window.scrollY + offset;
      let current = '#home';

      for (const link of navLinks) {
        const section = document.getElementById(link.href.slice(1));
        if (section && section.offsetTop <= scrollPos) {
          current = link.href;
        }
      }

      setActiveSection(current);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      updateActiveSection();
    };

    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveSection(window.location.hash);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setIsMenuOpen(false);
  };

  const isSolidHeader = isScrolled || isMenuOpen;

  const getLinkClass = (isActive: boolean) => {
    if (isSolidHeader) {
      return isActive
        ? 'text-primary-600 font-bold dark:text-primary-400'
        : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400';
    }
    return isActive
      ? 'text-white font-bold'
      : 'text-white/80 hover:text-primary-200';
  };

  const getMobileLinkClass = (isActive: boolean) =>
    isActive
      ? 'block rounded-lg px-4 py-3 text-base font-bold bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-400'
      : 'block rounded-lg px-4 py-3 text-base font-medium text-gray-800 transition-colors hover:bg-primary-50 hover:text-primary-700 dark:text-gray-100 dark:hover:bg-primary-950/50 dark:hover:text-primary-400';

  const iconBtnClass = isSolidHeader ? 'btn-nav-icon-scrolled' : 'btn-nav-icon-hero';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isSolidHeader
          ? 'border-b border-gray-200/70 bg-white/95 shadow-sm backdrop-blur-lg dark:border-gray-800/70 dark:bg-slate-900/95'
          : 'bg-transparent'
      }`}
    >
      <nav className="relative z-[60] mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo variant={isSolidHeader ? 'default' : 'light'} />

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setActiveSection(link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors ${getLinkClass(isActive)}`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
            className={iconBtnClass}
          >
            {isDark ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={isMenuOpen}
            className={`${iconBtnClass} md:hidden`}
          >
            {isMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[55] bg-slate-900/50 transition-opacity md:hidden ${
          isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-x-0 top-[73px] z-[58] max-h-[calc(100dvh-73px)] overflow-y-auto border-b border-gray-200 bg-white shadow-lg transition-all duration-300 md:hidden dark:border-gray-800 dark:bg-slate-900 ${
          isMenuOpen ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={getMobileLinkClass(isActive)}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
