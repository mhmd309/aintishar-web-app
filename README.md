# إنتشار | موقع الشركة

موقع تعريفي لشركة إنتشار للبرمجيات والتسويق الإلكتروني.

## التشغيل محلياً

```bash
npm install
cp .env.example .env
npm run dev
```

## إعداد نموذج التواصل (EmailJS)

1. أنشئ حساباً على [emailjs.com](https://www.emailjs.com/)
2. انسخ `.env.example` إلى `.env` وأضف المفاتيح من لوحة التحكم
3. **لا ترفع ملف `.env` إلى Git أبداً**
4. في لوحة EmailJS: فعّل **Domain restriction** وحدّد معدل الإرسال (rate limit)

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> إذا تسرّبت المفاتيح سابقاً في Git، أنشئ مفاتيح جديدة من EmailJS فوراً.

## البناء للإنتاج

```bash
npm run build
npm run preview
```
