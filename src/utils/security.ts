export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

const SUBMIT_COOLDOWN_MS = 30_000;
const CONTACT_SUBMIT_KEY = 'contact-last-submit';

export function sanitizeText(value: string, allowNewlines = false): string {
  let result = value.replace(/\0/g, '');

  if (!allowNewlines) {
    result = result.replace(/[\r\n]/g, ' ');
  } else {
    result = result.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  }

  return result.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

export function isSafeHref(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed || trimmed === '#') return false;

  if (trimmed.startsWith('#')) {
    return /^#[a-zA-Z][\w-]*$/.test(trimmed);
  }

  try {
    const url = new URL(trimmed);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function canSubmitContactForm(): boolean {
  try {
    const last = sessionStorage.getItem(CONTACT_SUBMIT_KEY);
    if (!last) return true;
    return Date.now() - Number(last) >= SUBMIT_COOLDOWN_MS;
  } catch {
    return true;
  }
}

export function markContactFormSubmitted(): void {
  try {
    sessionStorage.setItem(CONTACT_SUBMIT_KEY, String(Date.now()));
  } catch {
    // sessionStorage may be unavailable in private mode
  }
}
