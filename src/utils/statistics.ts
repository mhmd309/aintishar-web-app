import { projects } from '../data/projects';
import { COMPANY } from '../data/company';
import type { ProjectStatus } from '../types';

const COMPLETED_STATUSES: ProjectStatus[] = ['جديد', 'مدفوع', 'مجاني', 'محدّث'];

export function getCompletedProjectsCount(): number {
  return projects.filter(
    (project) =>
      project.statuses.some((status) => COMPLETED_STATUSES.includes(status)) &&
      !project.statuses.includes('قريباً'),
  ).length;
}

export function getYearsOfExperience(): number {
  const currentYear = new Date().getFullYear();
  return Math.max(1, currentYear - COMPANY.foundingYear);
}
