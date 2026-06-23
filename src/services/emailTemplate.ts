import { COMPANY } from '../data/company';
import type { ContactFormData } from '../types';

/**
 * حقول قالب EmailJS — الأسماء يجب أن تطابق {{متغير}} في لوحة التحكم.
 *
 * | المتغير        | الاستخدام في القالب                          |
 * |----------------|-----------------------------------------------|
 * | name           | From Name + عنوان المرسل في جسم الرسالة       |
 * | email          | Reply To                                      |
 * | user_message   | نص الرسالة فقط (بدون تفاصيل إضافية)           |
 * | message        | نص الرسالة + بيانات المرسل (للعرض الكامل)     |
 * | subject        | موضوع البريد                                  |
 * | summary        | جملة تمهيدية عربية بدل النص الإنجليزي الافتراضي |
 */
export interface EmailJsTemplateParams {
  name: string;
  email: string;
  user_message: string;
  message: string;
  subject: string;
  summary: string;
}

function formatSentAt(date: Date): string {
  return new Intl.DateTimeFormat('ar-SA', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);
}

function formatEmailBody(name: string, email: string, userMessage: string): string {
  return [
    userMessage,
    '',
    '──────────────────────────────',
    'تفاصيل المرسل',
    '──────────────────────────────',
    `الاسم: ${name}`,
    `البريد الإلكتروني: ${email}`,
    `وقت الإرسال: ${formatSentAt(new Date())}`,
    `المصدر: موقع ${COMPANY.fullName}`,
  ].join('\n');
}

export function buildEmailJsParams(data: ContactFormData): EmailJsTemplateParams {
  const name = data.name.trim();
  const email = data.email.trim();
  const userMessage = data.message.trim();

  return {
    name,
    email,
    user_message: userMessage,
    message: formatEmailBody(name, email, userMessage),
    subject: `رسالة تواصل — ${name}`,
    summary: `وصلتك رسالة جديدة من ${name} عبر موقع ${COMPANY.name}. يرجى الرد في أقرب وقت.`,
  };
}
