import { useCallback, useState, type FormEvent } from 'react';
import { COMPANY } from '../data/company';
import {
  ContactFormConfigError,
  ContactFormSubmitError,
  submitContactForm,
} from '../services/contactForm';
import type { ContactFormData, FormErrors } from '../types';
import ContactPopup, { type PopupType } from './ContactPopup';

const EMAIL = COMPANY.email;

interface PopupState {
  type: PopupType;
  title: string;
  message: string;
}

function validateForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'الاسم مطلوب';
  } else if (data.name.trim().length < 2) {
    errors.name = 'يجب أن يكون الاسم حرفين على الأقل';
  }

  if (!data.email.trim()) {
    errors.email = 'البريد الإلكتروني مطلوب';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'يرجى إدخال بريد إلكتروني صالح';
  }

  if (!data.message.trim()) {
    errors.message = 'الرسالة مطلوبة';
  } else if (data.message.trim().length < 10) {
    errors.message = 'يجب أن تكون الرسالة 10 أحرف على الأقل';
  }

  return errors;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState<PopupState | null>(null);

  const closePopup = useCallback(() => setPopup(null), []);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setPopup({
        type: 'error',
        title: 'فشل الإرسال',
        message: 'يرجى التحقق من جميع الحقول المطلوبة وإصلاح الأخطاء قبل إرسال الرسالة.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm(formData);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setPopup({
        type: 'success',
        title: 'تم الإرسال بنجاح!',
        message: 'شكراً لتواصلك معنا. استلمنا رسالتك وسنرد عليك في أقرب وقت ممكن.',
      });
    } catch (error) {
      if (error instanceof ContactFormConfigError) {
        setPopup({
          type: 'error',
          title: 'الإرسال غير مفعّل',
          message:
            'لم يتم إعداد EmailJS بعد. أنشئ ملف .env وأضف SERVICE_ID و TEMPLATE_ID و PUBLIC_KEY من emailjs.com',
        });
      } else if (error instanceof ContactFormSubmitError) {
        setPopup({
          type: 'error',
          title: 'فشل الإرسال',
          message: error.message,
        });
      } else {
        setPopup({
          type: 'error',
          title: 'حدث خطأ',
          message:
            'لم نتمكن من إرسال رسالتك. تحقق من اتصال الإنترنت وحاول مرة أخرى، أو راسلنا مباشرة على البريد الإلكتروني.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="contact" className="bg-gray-50 py-20 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="section-title mb-4">تواصل معنا</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              نحن هنا للإجابة على استفساراتك ومساعدتك في تحقيق أهدافك
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-slate-800">
                <h3 className="card-heading mb-6">معلومات التواصل</h3>

                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-primary-200 hover:bg-primary-50 dark:border-gray-700 dark:bg-slate-900 dark:hover:border-primary-700 dark:hover:bg-primary-950/40"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-950/60 dark:text-primary-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted">البريد الإلكتروني</p>
                    <p className="font-semibold text-gray-900 transition-colors group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-400">
                      {EMAIL}
                    </p>
                  </div>
                </a>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="mb-0.5 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        سرعة الرد
                      </p>
                      <p className="text-sm leading-relaxed text-emerald-700/80 dark:text-emerald-400/90">
                        نرد على جميع الرسائل خلال 24 ساعة عمل
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border border-primary-100 bg-primary-50/60 p-4 dark:border-primary-900/40 dark:bg-primary-950/20">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="mb-0.5 text-sm font-semibold text-primary-800 dark:text-primary-300">
                        ساعات العمل
                      </p>
                      <p className="text-sm leading-relaxed text-primary-700/80 dark:text-primary-400/90">
                        الأحد – الخميس: 9:00 ص – 6:00 م
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-slate-800"
              >
                <div className="mb-6">
                  <label htmlFor="name" className="text-label mb-2 block">
                    الاسم <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`input-field ${errors.name ? 'input-field-error' : ''}`}
                    placeholder="أدخل اسمك الكامل"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="text-label mb-2 block">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`input-field ${errors.email ? 'input-field-error' : ''}`}
                    placeholder="example@email.com"
                    dir="ltr"
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="text-label mb-2 block">
                    الرسالة <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`input-field resize-none ${errors.message ? 'input-field-error' : ''}`}
                    placeholder="اكتب رسالتك هنا..."
                    disabled={isSubmitting}
                  />
                  {errors.message && <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {popup && (
        <ContactPopup
          type={popup.type}
          title={popup.title}
          message={popup.message}
          onClose={closePopup}
        />
      )}
    </>
  );
}
