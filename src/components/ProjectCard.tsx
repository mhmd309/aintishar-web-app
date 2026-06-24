import type { Project, ProjectStatus } from '../types';
import { isSafeHref } from '../utils/security';

const statusStyles: Record<ProjectStatus, string> = {
  جديد: 'badge-new',
  'قريباً': 'badge-soon',
  'محدّث': 'badge-updated',
  مجاني: 'badge-free',
  مدفوع: 'badge-paid',
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasDemo = Boolean(project.demoUrl && isSafeHref(project.demoUrl));

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 dark:border-gray-700 dark:bg-slate-800 dark:hover:border-primary-700">
      {/* صورة المشروع */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="h-52 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {project.statuses.map((status) => (
            <span
              key={status}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm ${statusStyles[status]}`}
            >
              {status}
            </span>
          ))}
        </div>

        {hasDemo && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-label={`عرض تجربة ${project.name}`}
          >
            <span className="flex items-center gap-2 rounded-xl bg-white/95 px-5 py-2.5 text-sm font-semibold text-primary-700 backdrop-blur-sm transition-transform hover:scale-105">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              معاينة مباشرة
            </span>
          </a>
        )}
      </div>

      {/* المحتوى */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="card-title mb-2 line-clamp-1">{project.name}</h3>

        {project.description && (
          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        )}
      </div>
    </article>
  );
}
