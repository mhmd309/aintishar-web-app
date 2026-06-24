import type { Project } from '../types';

const WORK_IMAGES = {
  w01: '/img/work/w01.png',
  w02: '/img/work/w02.png',
  w03: '/img/work/w03.png',
  w04: '/img/work/w04.png',
  w05: '/img/work/w05.png',
  w06: '/img/work/w06.png',
  w07: '/img/work/w07.png',
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
  {
    id: 4,
    name: 'موقع رمضان كريم',
    image: WORK_IMAGES.w04,
    statuses: ['مجاني'],
    demoUrl: 'https://ramadankareem23.iceiy.com/',
    description: 'موقع تفاعلي للمناسبات الدينية مع محتوى يومي وأذكار ومواقيت الصلاة.',
  },
  {
    id: 5,
    name: 'موقع اطعمتك',
    image: WORK_IMAGES.w05,
    statuses: ['مجاني'],
    demoUrl: 'https://mhmd309.github.io/Cookster/',
    description: 'تطبيق ويب لطلب الطعام وإدارة المطاعم والتوصيل في الوقت الفعلي.',
  },
  {
    id: 6,
    name: 'موقع إسلامى',
    image: WORK_IMAGES.w06,
    statuses: ['مجاني', 'جديد'],
    demoUrl: 'https://mhmd309.github.io/Eslami/',
    description: 'منصة محتوى إسلامي تشمل القرآن والأحاديث والفتاوى والدروس الصوتية.',
  },
];

export const PROJECTS_PER_PAGE = 6;

export const ALL_STATUSES = ['الكل', 'جديد', 'قريباً', 'محدّث', 'مجاني', 'مدفوع'] as const;
