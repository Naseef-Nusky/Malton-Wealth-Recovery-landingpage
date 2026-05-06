import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { CONTACT_FORM_ENDPOINT, SCAM_OPTIONS } from './constants.js'

const EMAILJS_SERVICE_ID = 'service_1o99vue'
const EMAILJS_TEMPLATE_ID = 'template_rpoe9rq'
const EMAILJS_PUBLIC_KEY = 'eoGlKrTZChB9V6_vo'

export function ContactForm({
  onSubmitted,
  headingId,
  layout = 'page',
  submitLabel = 'Submit',
}) {
  const [scamType, setScamType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const formatEmailJsError = (err) => {
    if (!err || typeof err !== 'object') return 'Email service error.'
    const maybeText =
      typeof err.text === 'string' && err.text.trim() !== '' ? err.text.trim() : ''
    const maybeStatus =
      typeof err.status === 'number' || typeof err.status === 'string'
        ? String(err.status)
        : ''
    if (maybeText && maybeStatus) return `Email service error (${maybeStatus}): ${maybeText}`
    if (maybeText) return `Email service error: ${maybeText}`
    if (maybeStatus) return `Email service error (${maybeStatus}).`
    return 'Email service error.'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    setSubmitError('')
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      fullName: String(formData.get('fullName') ?? '').trim(),
      mobile: String(formData.get('mobile') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      amountLost: String(formData.get('amountLost') ?? '').trim(),
      scamType: String(formData.get('scamType') ?? '').trim(),
    }

    try {
      if (typeof EMAILJS_PUBLIC_KEY === 'string' && EMAILJS_PUBLIC_KEY.trim() !== '') {
        const templateParams = {
          ...payload,
          from_name: payload.fullName,
          reply_to: payload.email,
          phone: payload.mobile,
        }
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          { publicKey: EMAILJS_PUBLIC_KEY }
        )
      } else {
        const response = await fetch(CONTACT_FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        const contentType = response.headers.get('content-type') || ''
        const isJson = contentType.includes('application/json')
        const result = isJson ? await response.json().catch(() => ({})) : {}

        if (!response.ok || !result.ok) {
          const message =
            typeof result.message === 'string' && result.message
              ? result.message
              : 'Form backend is unavailable. If you are testing locally, run the site on a PHP-enabled server.'
          setSubmitError(message)
          return
        }
      }

      onSubmitted()
    } catch (err) {
      const maybeEmailJs = formatEmailJsError(err)
      setSubmitError(maybeEmailJs || 'Unable to send your enquiry right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formOuter =
    layout === 'modal'
      ? 'modal-form-inner w-full min-w-0 bg-transparent px-5 pb-10 pt-8 shadow-none sm:px-8'
      : 'contact-form-card rounded-2xl bg-white p-6 sm:p-8'

  return (
    <form
      className={formOuter}
      onSubmit={handleSubmit}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="heading-form mb-6 text-center">
        Check your eligibility for a <span className="form-heading-accent">FREE</span>,
        <br />
        confidential consultation
      </h2>
      <div className="space-y-4 text-left">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Full name</span>
          <input
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className="input-field w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Mobile number</span>
          <input
            name="mobile"
            type="tel"
            required
            autoComplete="tel"
            className="input-field w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Email address</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="input-field w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Approximate amount lost</span>
          <input
            name="amountLost"
            type="text"
            required
            className="input-field w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Type of scam</span>
          <select
            name="scamType"
            required
            value={scamType}
            onChange={(e) => setScamType(e.target.value)}
            className={`select-modern w-full${scamType ? '' : ' select-modern-placeholder'}`}
          >
            <option value="">Select an option</option>
            {SCAM_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>
      {submitError ? (
        <p
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}
      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-brand w-full rounded-lg px-10 py-3.5 text-base font-semibold text-white shadow-md transition sm:w-auto sm:min-w-[200px] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Sending...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
