export const SCAM_OPTIONS = [
  'Investment',
  'Cryptocurrency',
  'Impersonation',
  'Romance',
  'Trading',
  'Other',
]

/** Relative URL beside built index.html; override with VITE_CONTACT_PHP_URL when needed. */
export const CONTACT_FORM_ENDPOINT =
  typeof import.meta.env.VITE_CONTACT_PHP_URL === 'string' &&
  import.meta.env.VITE_CONTACT_PHP_URL.trim() !== ''
    ? import.meta.env.VITE_CONTACT_PHP_URL.trim()
    : '/contact.php'
