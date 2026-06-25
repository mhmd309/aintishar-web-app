import { COMPANY } from '../data/company';
import { sanitizeText } from '../utils/security';
import type { ContactFormData } from '../types';

/**
 * متوافق مع القالب الافتراضي في EmailJS:
 *
 * Settings:
 *   From Name → {{name}}
 *   Reply To  → {{email}}
 *
 * Content — لا تحذف هيكل القالب! غيّر السطر الإنجليزي فقط إلى {{intro}}
 * القالب يعرض {{name}} في الأعلى و {{message}} في الأسفل تلقائياً.
 */
export interface EmailJsTemplateParams {
  name: string;
  email: string;
  message: string;
  intro: string;
  subject: string;
}

function formatSentAt(date: Date): string {
  return new Intl.DateTimeFormat('ar-SA', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);
}

function buildMessageBody(
  name: string,
  email: string,
  userMessage: string,
  sentAt: string,
  source: string,
): string {
  return [
    `الاسم: ${name}`,
    '',
    `البريد الإلكتروني: ${email}`,
    '',
    `الرسالة: ${userMessage}`,
    '',
    `وقت الإرسال: ${sentAt}`,
    '',
    `المصدر: ${source}`,
  ].join('\n');
}

export function buildEmailJsParams(data: ContactFormData): EmailJsTemplateParams {
  const name = sanitizeText(data.name);
  const email = sanitizeText(data.email);
  const userMessage = sanitizeText(data.message, true);
  const sentAt = formatSentAt(new Date());
  const source = `موقع ${COMPANY.fullName}`;

  return {
    name,
    email,
    message: buildMessageBody(name, email, userMessage, sentAt, source),
    intro: `تم وصول رسالة من ${name} . يرجى الرد في أقرب وقت ممكن.`,
    subject: `رسالة تواصل — ${name}`,
  };
}
