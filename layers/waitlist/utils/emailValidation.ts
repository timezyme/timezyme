// Common disposable email domains to block
const DISPOSABLE_EMAIL_DOMAINS = [
  // 10 minute mail services
  '10minutemail.com',
  '10minutemail.net',
  '10minemail.com',
  '10minut.com.pl',
  '10minutemail.de',
  '10minutemail.nl',

  // Temporary mail services
  'tempmail.com',
  'temp-mail.org',
  'tmpmail.org',
  'tmpmail.net',
  'tempmail.net',
  'temporarymail.com',
  'temporaryinbox.com',
  'throwemail.com',
  'throwaway.email',
  'throwawaymail.com',

  // Guerrilla mail
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamail.biz',
  'guerrillamail.de',
  'guerrillamailblock.com',

  // Mailinator and similar
  'mailinator.com',
  'mailinator.net',
  'mailinator.org',
  'mailinator2.com',
  'mailinater.com',
  'mailnator.com',
  'trashmail.com',
  'trashmail.net',
  'trashmail.org',
  'trashmail.de',
  'trashmail.ws',
  'trashmails.com',
  'trashymail.com',
  'trashymail.net',

  // Yopmail
  'yopmail.com',
  'yopmail.net',
  'yopmail.fr',

  // Other common disposable services
  'dispostable.com',
  'disposemail.com',
  'discard.email',
  'discardmail.com',
  'discardmail.de',
  'spambox.us',
  'spam.la',
  'mytrashmail.com',
  'mt2009.com',
  'thankyou2010.com',
  'trash2009.com',
  'trash2010.com',
  'trash2011.com',
  'getnada.com',
  'nada.email',
  'maildrop.cc',
  'inboxkitten.com',
  'getairmail.com',
  'anonaddy.com',
  'burnermail.io',
  'fakermail.com',
  'emailondeck.com',
  'tempail.com',
  'tempr.email',
  'tempmailaddress.com',
  'tempmailplus.com',
]

// Common role-based email prefixes to potentially flag
const ROLE_BASED_PREFIXES = [
  'admin',
  'administrator',
  'info',
  'contact',
  'support',
  'sales',
  'marketing',
  'noreply',
  'no-reply',
  'donotreply',
  'do-not-reply',
  'postmaster',
  'webmaster',
  'hostmaster',
  'abuse',
]

export interface EmailValidationResult {
  domain: string
  errors: Array<string>
  isDisposable: boolean
  isRoleBased: boolean
  isValid: boolean
  localPart: string
}

/**
 * Validates an email address and checks for disposable domains
 */
export function validateEmail (email: string): EmailValidationResult {
  const errors: Array<string> = []
  const result: EmailValidationResult = {
    domain: '',
    errors,
    isDisposable: false,
    isRoleBased: false,
    isValid: true,
    localPart: '',
  }

  // Basic format validation
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    errors.push('Invalid email format')
    result.isValid = false
    return result
  }

  // Extract parts
  const emailParts = email.toLowerCase().split('@')
  if (emailParts.length !== 2) {
    errors.push('Invalid email format')
    result.isValid = false
    return result
  }

  const localPart = emailParts[0]!
  const domain = emailParts[1]!
  result.localPart = localPart
  result.domain = domain

  // Check length constraints
  if (email.length > 254) {
    errors.push('Email address too long')
    result.isValid = false
  }

  if (localPart.length > 64) {
    errors.push('Local part too long')
    result.isValid = false
  }

  // Check for disposable domain
  if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
    result.isDisposable = true
    errors.push('Disposable email addresses are not allowed')
    result.isValid = false
  }

  // Check for role-based email
  if (ROLE_BASED_PREFIXES.includes(localPart)) {
    result.isRoleBased = true
    // We might allow role-based emails, but flag them
  }

  // Additional domain validation
  const domainParts = domain.split('.')
  if (domainParts.length < 2) {
    errors.push('Invalid domain format')
    result.isValid = false
  }

  // Check for consecutive dots
  if (email.includes('..')) {
    errors.push('Consecutive dots not allowed')
    result.isValid = false
  }

  // Check for special characters at start/end
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    errors.push('Local part cannot start or end with a dot')
    result.isValid = false
  }

  return result
}

/**
 * Checks if a domain is in the disposable list
 */
export function isDisposableEmailDomain (domain: string): boolean {
  return DISPOSABLE_EMAIL_DOMAINS.includes(domain.toLowerCase())
}

/**
 * Adds a domain to the disposable list (for runtime additions)
 */
export function addDisposableDomain (domain: string): void {
  if (!DISPOSABLE_EMAIL_DOMAINS.includes(domain.toLowerCase())) {
    DISPOSABLE_EMAIL_DOMAINS.push(domain.toLowerCase())
  }
}

/**
 * Gets the list of disposable domains (for testing/debugging)
 */
export function getDisposableDomains (): Array<string> {
  return [...DISPOSABLE_EMAIL_DOMAINS]
}
