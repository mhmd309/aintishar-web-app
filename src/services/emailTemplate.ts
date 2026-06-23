import { COMPANY } from '../data/company';
import type { ContactFormData } from '../types';

/**
 * حقول EmailJS — يجب أن يطابق Content في لوحة التحكم:
 *
 *   {{intro}}
 *
 *   {{details}}
 *
 * أو محتوى كامل في سطر واحد: {{body}}
 *
 * مهم: احذف النص الإنجليزي الافتراضي من القالب.
 * {{message}} = نص رسالة الزائر فقط (معيار EmailJS).
 */
export interface EmailJsTemplateParams {
  name: string;
  email: string;
  message: string;
  intro: string;
  details: string;
  body: string;
  sent_at: string;
  source: string;
  user_message: string;
  subject: string;
}

function formatSentAt(date: Date): string {
  return new Intl.DateTimeFormat('ar-SA', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);
}

function buildIntro(name: string): string {
  return `تم وصول رسالة من ${name} . يرجى الرد في أقرب وقت ممكن.`;
}

function buildDetails(
  name: string,
  email: string,
  userMessage: string,
  sentAt: string,
  source: string,
): string {
  return [
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
  const intro = buildIntro(name);
  const details = buildDetails(name, email, userMessage, sentAt, source);

  return {
    name,
    email,
    message: userMessage,
    intro,
    details,
    body: `${intro}\n\n${details}`,
    sent_at: sentAt,
    source,
    user_message: userMessage,
    subject: `رسالة تواصل — ${name}`,
  };
}
