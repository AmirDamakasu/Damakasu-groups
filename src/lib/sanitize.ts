import DOMPurify from 'dompurify';

/**
 * Sanitize a string to remove XSS payloads (strips HTML/script tags).
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') return '';
  // Strip HTML tags via DOMPurify (safe in browser context)
  const clean = DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  // Trim and collapse whitespace
  return clean.trim().replace(/\s+/g, ' ');
}

/**
 * Sanitize an entire form data object.
 */
export function sanitizeFormData<T extends Record<string, string>>(data: T): T {
  const result = {} as T;
  for (const key in data) {
    result[key] = sanitizeText(data[key]) as T[typeof key];
  }
  return result;
}

export { isValidEmail, isValidPhone } from './validation';
