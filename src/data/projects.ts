import type { Project } from '../types';

const WORK_IMAGES = {
  w01: '/img/work/w01.png',
  w02: '/img/work/w02.png',
  w03: '/img/work/w03.png',
  w04: '/img/work/w04.png',
} as const;

export const projects: Project[] = [
  {
    id: 1,
    name: 'موقع لإدارة المحاماه',
    image: WORK_IMAGES.w01,
    statuses: ['مدفوع', 'جديد'],
    demoUrl: 'https://law-firm-management-system-blue.vercel.app/',
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
  {
    id: 4,
    name: 'نظام إدارة الصيدليات',
    image: WORK_IMAGES.w04,
    statuses: ['مدفوع', 'جديد'],
    demoUrl: '#',
    description: 'نظام سحابي متعدد الصيدليات يجمع البيع، المخزون، الخزينة، والإدارة في منصة واحدة — سهل الاستخدام ومصمم للعمل اليومي.',
  },
];

export const PROJECTS_PER_PAGE = 6;

export const ALL_STATUSES = ['الكل', 'جديد', 'قريباً', 'محدّث', 'مجاني', 'مدفوع'] as const;
