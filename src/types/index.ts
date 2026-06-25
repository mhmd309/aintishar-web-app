export type ProjectStatus = 'جديد' | 'قريباً' | 'محدّث' | 'مجاني' | 'مدفوع';

export interface Project {
  id: number;
  name: string;
  image: string;
  statuses: ProjectStatus[];
  demoUrl: string;
  description?: string;
}

export interface Slide {
  id: number;
  image: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: 'whatsapp' | 'facebook';
}
