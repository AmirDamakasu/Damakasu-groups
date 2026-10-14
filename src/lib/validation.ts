/** Basic email format validation. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Basic phone number validation (allows +, digits, spaces, dashes, brackets). */
export function isValidPhone(phone: string): boolean {
  return phone === '' || /^[+\d\s\-()]{6,20}$/.test(phone);
}
