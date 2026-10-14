/** Email format validation — same rule as the submit-quote function (no "?", "&", spaces or quotes). */
export function isValidEmail(email: string): boolean {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(email);
}

/** Basic phone number validation (allows +, digits, spaces, dashes, brackets). */
export function isValidPhone(phone: string): boolean {
  return phone === '' || /^[+\d\s\-()]{6,20}$/.test(phone);
}
