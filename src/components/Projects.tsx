import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ALL_STATUSES, PROJECTS_PER_PAGE, projects } from '../data/projects';
import type { ProjectStatus } from '../types';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('الكل');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === 'الكل' ||
        project.statuses.includes(statusFilter as ProjectStatus);
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
  const effectivePage = Math.min(currentPage, totalPages);

  const paginatedProjects = useMemo(() => {
    const start = (effectivePage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, effectivePage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <section id="projects" className="bg-gray-50 py-20 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <h2 className="section-title mb-4">مشاريعنا</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            استكشف مشاريعنا في البرمجيات والتسويق الإلكتروني المصممة لتحقيق أهداف عملك
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <svg
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="search"
              placeholder="ابحث عن مشروع..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="input-field py-3 pr-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {ALL_STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleStatusChange(status)}
                className={statusFilter === status ? 'btn-filter-active' : 'btn-filter'}
              >
                {status}
              </button>
            ))}
          </div>
        </motion.div>

        {paginatedProjects.length > 0 ? (
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center dark:border-gray-600 dark:bg-slate-800">
            <p className="text-lg text-muted">لم يتم العثور على مشاريع مطابقة</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(effectivePage - 1)}
              disabled={effectivePage === 1}
              aria-label="الصفحة السابقة"
              className="btn-icon"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                aria-label={`الصفحة ${page}`}
                aria-current={page === effectivePage ? 'page' : undefined}
                className={page === effectivePage ? 'btn-icon-active' : 'btn-icon'}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(effectivePage + 1)}
              disabled={effectivePage === totalPages}
              aria-label="الصفحة التالية"
              className="btn-icon"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
