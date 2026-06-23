import emailjs from '@emailjs/browser';
import { buildEmailJsParams } from './emailTemplate';
import type { ContactFormData } from '../types';

export class ContactFormConfigError extends Error {
  constructor() {
    super('MISSING_EMAILJS_CONFIG');
    this.name = 'ContactFormConfigError';
  }
}

export class ContactFormSubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContactFormSubmitError';
  }
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new ContactFormConfigError();
  }

  try {
    const templateParams = buildEmailJsParams(data);

    const result = await emailjs.send(
      serviceId,
      templateId,
      { ...templateParams },
      { publicKey },
    );

    if (result.status !== 200) {
      throw new ContactFormSubmitError('فشل إرسال الرسالة. حاول مرة أخرى.');
    }
  } catch (error) {
    if (error instanceof ContactFormSubmitError) throw error;

    const message =
      error instanceof Error ? error.message : 'تعذّر إرسال الرسالة.';
    throw new ContactFormSubmitError(message);
  }
}
