import { COMPANY } from '../data/company';
import type { ContactFormData } from '../types';

/**
 * متغيرات EmailJS — الأسماء تطابق إعدادات القالب:
 *
 * Settings:
 *   From Name → {{name}}
 *   Reply To  → {{email}}
 *
 * Content (ضع هذا فقط واحذف النص الإنجليزي):
 *   {{message}}
 */
export interface EmailJsTemplateParams {
  name: string;
  email: string;
  message: string;
  subject: string;
}

function formatSentAt(date: Date): string {
  return new Intl.DateTimeFormat('ar-SA', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);
}

function buildEmailBody(
  name: string,
  email: string,
  userMessage: string,
  sentAt: string,
  source: string,
): string {
  return [
    `تم وصول رسالة من ${name} . يرجى الرد في أقرب وقت ممكن.`,
    '',
    `الاسم: ${name}`,
    `البريد الإلكتروني: ${email}`,
    `الرسالة: ${userMessage}`,
    `وقت الإرسال: ${sentAt}`,
    `المصدر: ${source}`,
  ].join('\n');
}

export function buildEmailJsParams(data: ContactFormData): EmailJsTemplateParams {
  const name = data.name.trim();
  const email = data.email.trim();
  const userMessage = data.message.trim();
  const sentAt = formatSentAt(new Date());
  const source = `موقع ${COMPANY.fullName}`;

  return {
    name,
    email,
    message: buildEmailBody(name, email, userMessage, sentAt, source),
    subject: `رسالة تواصل — ${name}`,
  };
}
