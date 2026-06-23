import { COMPANY } from '../data/company';
import type { ContactFormData } from '../types';

export interface EmailJsTemplateParams {
  name: string;
  email: string;
  message: string;
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

function formatEmailDetails(
  name: string,
  email: string,
  sentAt: string,
  source: string,
): string {
  return [
    `الاسم: ${name}`,
    `البريد الإلكتروني: ${email}`,
    `وقت الإرسال: ${sentAt}`,
    `المصدر: ${source}`,
  ].join('\n');
}

export function buildEmailJsParams(data: ContactFormData): EmailJsTemplateParams {
  const name = data.name.trim();
  const email = data.email.trim();
  const sentAt = formatSentAt(new Date());
  const source = `موقع ${COMPANY.fullName}`;

  return {
    name,
    email,
    sent_at: sentAt,
    source,
    user_message: data.message.trim(),
    message: formatEmailDetails(name, email, sentAt, source),
    subject: `رسالة تواصل — ${name}`,
  };
}
