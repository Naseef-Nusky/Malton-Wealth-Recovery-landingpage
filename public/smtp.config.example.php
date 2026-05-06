<?php

/**
 * Copy this file on the SERVER to smtp.secret.php (same folder as contact.php).
 * Never commit smtp.secret.php or upload it to public Git repos.
 *
 * Microsoft 365 (GoDaddy Email Essentials typical):
 *   Host: smtp.office365.com
 *   Port: 587
 *   Encryption: tls (STARTTLS)
 *   Username: full mailbox email
 *   Password: that mailbox password (or app password if your org requires MFA)
 */

return [
    'smtp_host' => 'smtp.office365.com',
    'smtp_port' => 587,
    /** 'tls' = STARTTLS (Office 365) */
    'smtp_secure' => 'tls',
    'smtp_username' => 'info@maltonwealthrecovery.com',
    'smtp_password' => 'PASTE_MAILBOX_PASSWORD_HERE',

    /** Shown as the sender (should match authorised mailbox). */
    'mail_from_email' => 'info@maltonwealthrecovery.com',
    'mail_from_name' => 'Malton Wealth Recovery',

    /** Where enquiries are delivered. */
    'mail_to_email' => 'naseefnusky09@gmail.com',
];
