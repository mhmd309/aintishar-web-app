import type { Project } from '../types';

const WORK_IMAGES = {
  w01: '/img/work/w01.png',
  w02: '/img/work/w02.png',
  w03: '/img/work/w03.png',
} as const;

export const projects: Project[] = [
  {
    id: 1,
    name: 'موقع لإدارة المحاميات',
    image: WORK_IMAGES.w01,
    statuses: ['مدفوع', 'جديد'],
    demoUrl: '#',
    description: 'نظام متكامل لإدارة العملاء والقضايا والمواعيد للمكاتب القانونية.',
  },
  {
    id: 2,
    name: 'موقع لإدارة تحاليل الحمض النووى',
    image: WORK_IMAGES.w02,
    statuses: ['مدفوع', 'جديد'],
    demoUrl: '#',
    description: 'لوحة تحكم لإدارة نتائج التحاليل ومتابعة الحالات والتقارير الطبية.',
  },
  {
    id: 3,
    name: 'متجر إلكتروني متكامل',
    image: WORK_IMAGES.w03,
    statuses: ['مدفوع', 'جديد'],
    demoUrl: '#',
    description: 'منصة تجارة إلكترونية مع إدارة المنتجات والطلبات والدفع الإلكتروني.',
  },
];

export const PROJECTS_PER_PAGE = 6;

export const ALL_STATUSES = ['الكل', 'جديد', 'قريباً', 'محدّث', 'مجاني', 'مدفوع'] as const;
