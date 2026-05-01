import { useCallback, useEffect, useId, useState } from 'react'
import logoImg from './assets/logo.png'
import heroBg from './assets/hero.jpeg'
import './App.css'

const PHONE_DISPLAY = '0800 123 4567'
const PHONE_HREF = 'tel:08001234567'

const HERO_BENEFIT_TICK_PLATE_FILL = 'hero-benefit-tick-plate-sheen'

const SERVICES = [
  {
    iconId: 'investment',
    title: 'Investment Scam Recovery',
    body: 'Lost money to a fraudulent investment opportunity? We assess your case and help you explore potential routes to recover funds lost through investment scams.',
  },
  {
    iconId: 'trading',
    title: 'Trading and Forex Scam Recovery',
    body: 'Trading scams can lead to significant losses. We guide you through your situation and outline the steps that may be available to recover your funds.',
  },
  {
    iconId: 'pushPayment',
    title: 'Push Payment Fraud',
    body: 'If you were persuaded to transfer money by someone posing as a trusted source, we analyse your case and help identify ways to challenge the transaction.',
  },
  {
    iconId: 'romance',
    title: 'Romance Scam Recovery',
    body: 'If you have been manipulated into sending money through an online relationship, we provide discreet guidance to help you explore your options.',
  },
]

const FAQS = [
  {
    q: 'Can money lost to a scam be recovered in the UK?',
    a: 'In many cases, it is possible to recover money lost to a scam in the UK. This depends on factors such as how the payment was made and the circumstances involved. We help you understand whether recovery may be achievable in your situation.',
  },
  {
    q: 'What should I do if I have lost money to a scam?',
    a: 'If you have lost money to a scam, acting promptly can make a difference. Gathering key information and seeking professional guidance early can help you understand your options and what steps may be available.',
  },
  {
    q: 'Can cryptocurrency scam losses be recovered?',
    a: 'While cryptocurrency scams can be complex, recovery may be possible in many situations. If you have lost funds through crypto or online platforms, we can help you understand your position and what options may be available.',
  },
  {
    q: 'What types of scams do you help with?',
    a: 'We assist with a wide range of financial fraud cases, including investment scams, cryptocurrency scams, trading and forex scams, impersonation fraud, and authorised push payment fraud.',
  },
  {
    q: 'How long does fraud recovery take?',
    a: 'Timescales can vary depending on the nature of the case and the approach taken. Each situation is different, and we will provide clarity on what to expect during your consultation.',
  },
  {
    q: 'Is my enquiry confidential?',
    a: 'Yes. Every enquiry is handled with complete discretion. Your information is treated in strict confidence from the moment you contact us.',
  },
  {
    q: 'How do I start a fraud recovery claim?',
    a: 'If you have lost £5,000 or more to a scam, you can begin by arranging a free, confidential consultation. We will discuss your situation and explain what options may be available to you.',
  },
]

const SCAM_OPTIONS = [
  'Investment',
  'Cryptocurrency',
  'Impersonation',
  'Romance',
  'Trading',
  'Other',
]

function CloseIconMono() {
  return (
    <svg
      className="pointer-events-none h-[1.125rem] w-[1.125rem] shrink-0"
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

function PhoneCallIcon({ className }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function ServiceIconInvestment({ className }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.65"
        d="m3 16 6-6 4 4 8-8"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65" d="M14 6h7v7" />
    </svg>
  )
}

function ServiceIconTrading({ className }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeWidth="1.65" d="M4 20V4" />
      <path strokeLinecap="round" strokeWidth="1.65" d="M20 20H4" />
      <path strokeLinecap="round" strokeWidth="1.65" d="M8 16V10" />
      <path strokeLinecap="round" strokeWidth="1.65" d="M12 16V8" />
      <path strokeLinecap="round" strokeWidth="1.65" d="M16 16V12" />
    </svg>
  )
}

function ServiceIconPushPayment({ className }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.65"
        x="4"
        y="5"
        width="16"
        height="13"
        rx="2"
      />
      <path strokeLinecap="round" strokeWidth="1.65" d="M4 11h16" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.65"
        d="m12 17 2-2.5H10L12 17Z"
      />
    </svg>
  )
}

function ServiceIconRomance({ className }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.65"
        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
      />
    </svg>
  )
}

const SERVICE_ICON_BY_ID = {
  investment: ServiceIconInvestment,
  trading: ServiceIconTrading,
  pushPayment: ServiceIconPushPayment,
  romance: ServiceIconRomance,
}

function ServiceCardIconDecor({ iconId }) {
  const Icon = SERVICE_ICON_BY_ID[iconId] ?? ServiceIconInvestment
  return (
    <div className="service-card-icon-shell" aria-hidden="true">
      <Icon className="service-card-icon-svg" />
    </div>
  )
}

function HeroBenefitTick() {
  return (
    <span className="hero-benefit-tick" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" className="hero-benefit-tick-icon">
        <circle className="hero-benefit-tick-plate" cx="12" cy="12" r="10.25" fill={`url(#${HERO_BENEFIT_TICK_PLATE_FILL})`} />
        <circle className="hero-benefit-tick-ring" cx="12" cy="12" r="10.25" strokeWidth="1.2" />
        <path
          className="hero-benefit-tick-mark"
          d="M7 12.15 10.72 15.75 17.35 9.2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function ContactForm({ onSubmitted, headingId, layout = 'page' }) {
  const [scamType, setScamType] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmitted()
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
        Check your eligibility for a free,
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
      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="btn-brand w-full rounded-lg px-10 py-3.5 text-base font-semibold text-white shadow-md transition sm:w-auto sm:min-w-[200px]"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

function ThankYouView({ onBack }) {
  return (
    <div className="site-landing thank-you-bg flex min-h-svh flex-col items-center justify-center px-4 py-16">
      <img src={logoImg} alt="Malton Wealth Recovery" className="mb-8 h-14 w-auto object-contain opacity-95" />
      <div className="thank-you-card max-w-lg rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
        <h1 className="heading-thanks mb-4 text-center">
          Thank you for your submission.
        </h1>
        <p className="mb-8 text-center text-lg">
          One of our experts will be in contact shortly.
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onBack}
            className="btn-brand rounded-lg px-8 py-3 font-semibold text-white shadow-md transition"
          >
            Back to website
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [submitted, setSubmitted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const formHeadingId = useId()
  const modalTitleId = useId()

  const openForm = useCallback(() => setModalOpen(true), [])
  const closeForm = useCallback(() => setModalOpen(false), [])

  const handleSubmitted = useCallback(() => {
    setModalOpen(false)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeForm()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [modalOpen, closeForm])

  const toggleFaq = (i) => {
    setOpenFaq((prev) => (prev === i ? null : i))
  }

  if (submitted) {
    return <ThankYouView onBack={() => setSubmitted(false)} />
  }

  return (
    <div className="site-landing min-h-svh bg-white text-left text-slate-700 antialiased">
      <header className="bg-brand-header sticky top-0 z-40 border-b border-slate-200 shadow-sm shadow-slate-900/8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5">
          <a href="#" className="inline-flex shrink-0" aria-label="Malton Wealth Recovery — home">
            <img src={logoImg} alt="" className="h-10 w-auto object-contain sm:h-11" />
          </a>
          <a
            href={PHONE_HREF}
            className="header-phone-cta inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition sm:px-4 sm:text-base"
          >
            <PhoneCallIcon className="h-[1.125em] w-[1.125em] shrink-0" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      <section
        className="hero-section flex min-h-[min(88dvh,56rem)] flex-col justify-center px-4 py-12 text-white sm:px-6 sm:py-14 lg:py-16"
        style={{ '--hero-bg-image': `url(${heroBg})` }}
      >
        <svg
          className="pointer-events-none absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <radialGradient id={HERO_BENEFIT_TICK_PLATE_FILL} cx="28%" cy="18%" fx="28%" fy="18%" r="92%">
              <stop offset="0%" stopColor="rgb(255 255 255)" stopOpacity="0.28" />
              <stop offset="42%" stopColor="rgb(255 255 255)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="rgb(201 212 223)" stopOpacity="0.06" />
            </radialGradient>
          </defs>
        </svg>
        <div className="hero-section-content mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="w-full max-w-xl text-left">
            <h1 className="hero-heading mb-4">
              Have you lost £5,000 or more to a scam or fraud?
            </h1>
            <p className="text-hero-muted mb-8 max-w-xl text-lg sm:text-xl">
              Recover what is rightfully yours with expert support.
            </p>
            <ul className="hero-benefits mb-8 flex max-w-xl flex-col gap-3.5 text-left text-base sm:gap-4 sm:text-lg">
              <li className="flex items-start gap-3">
                <HeroBenefitTick />
                <span className="text-hero-muted min-w-0 pt-px sm:text-balance">
                  Supported by experienced solicitors and financial experts
                </span>
              </li>
              <li className="flex items-start gap-3">
                <HeroBenefitTick />
                <span className="text-hero-muted min-w-0 pt-px sm:text-balance">
                  Confidential, professional support
                </span>
              </li>
              <li className="flex items-start gap-3">
                <HeroBenefitTick />
                <span className="text-hero-muted min-w-0 pt-px sm:text-balance">
                  Specialists in high-value fraud recovery
                </span>
              </li>
            </ul>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#lead-form"
                className="btn-brand inline-flex justify-center rounded-lg px-8 py-3 text-center text-base font-semibold text-white shadow-lg shadow-black/25 transition max-sm:w-full"
              >
                Check your eligibility
              </a>
              <a
                href={PHONE_HREF}
                className="btn-brand-outline inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-center text-base font-semibold transition max-sm:w-full"
              >
                <PhoneCallIcon className="h-[1.125em] w-[1.125em] shrink-0 opacity-95" />
                Call now
              </a>
            </div>
          </div>
          <div id="lead-form" className="scroll-mt-28 w-full max-w-xl lg:sticky lg:top-28 lg:justify-self-end">
            <ContactForm onSubmitted={handleSubmitted} headingId={formHeadingId} />
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 px-4 py-16 sm:px-6 lg:py-20">
        <div className="about-section-inner mx-auto max-w-3xl text-center text-balance">
          <p className="text-brand-muted heading-eyebrow mb-3 uppercase">Who we are</p>
          <h2 className="text-brand heading-section mb-6">About Us</h2>
          <p className="mb-4 leading-relaxed text-lg text-slate-600">
            With over 15 years of combined experience in fraud recovery, we support individuals across the UK who
            have lost significant sums to scams, including investment scams, cryptocurrency fraud, and online
            financial deception.
          </p>
          <p className="leading-relaxed text-lg text-slate-600">
            We understand how complex and distressing it can be to lose money to a scam. That is why our approach
            focuses on discretion, professionalism, and helping you understand your options for recovering money lost
            to fraud.
          </p>
        </div>
      </section>

      <section id="services" className="section-muted scroll-mt-28 px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-brand heading-section mb-4 text-center">Our Services</h2>
          <div className="mb-12 flex w-full justify-center lg:mb-14">
            <p className="services-section-intro w-full max-w-2xl px-4 text-lg leading-relaxed text-slate-600 sm:text-pretty md:max-w-[44rem]">
              Each case is handled with discretion, with a focus on helping you understand your options and the next steps
              available.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
            {SERVICES.map((svc) => (
              <article
                key={svc.title}
                className="service-card-top service-card flex h-full flex-col rounded-2xl p-7 sm:p-8"
              >
                <div className="service-card-title-row mb-4 flex items-start gap-3">
                  <ServiceCardIconDecor iconId={svc.iconId} />
                  <h3 className="text-brand heading-card min-w-0 flex-1">{svc.title}</h3>
                </div>
                <p className="mb-0 flex-1 text-base leading-relaxed text-slate-600 sm:text-[1.05rem]">{svc.body}</p>
                <div className="mt-5 shrink-0 pt-1 sm:mt-6">
                  <button
                    type="button"
                    onClick={openForm}
                    className="service-card-cta btn-brand w-full rounded-lg px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md sm:text-base"
                  >
                    Start Your Claim Today
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="steps" className="scroll-mt-28 px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-brand heading-section mb-14 text-center">3 Simple Steps</h2>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <div className="step-card rounded-2xl p-8">
              <div className="step-num">1</div>
              <h3 className="text-brand heading-step mb-3">Initial Consultation</h3>
              <p className="leading-relaxed text-slate-600">
                We begin with a free, confidential consultation to understand your situation and analyse the key
                details of your case.
              </p>
            </div>
            <div className="step-card rounded-2xl p-8">
              <div className="step-num">2</div>
              <h3 className="text-brand heading-step mb-3">Case Assessment</h3>
              <p className="leading-relaxed text-slate-600">
                Your case is carefully assessed alongside experienced legal and financial professionals to determine
                the most appropriate approach.
              </p>
            </div>
            <div className="step-card rounded-2xl p-8">
              <div className="step-num">3</div>
              <h3 className="text-brand heading-step mb-3">Recovery Process</h3>
              <p className="leading-relaxed text-slate-600">
                We guide you through the recovery process, keeping you informed at every stage as your case progresses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-muted px-4 py-16 sm:px-6 lg:py-20">
        <div className="border-brand-line mx-auto max-w-2xl rounded-2xl border bg-white px-6 py-12 text-center shadow-sm sm:px-12 sm:py-14">
          <h2 className="text-brand heading-callout mb-6 text-center">Think you may have been scammed?</h2>
          <p className="mb-0 text-lg leading-relaxed text-slate-600">
            If you have sent money and suspect fraud, do not ignore it. Speak to our team today to understand your
            options and what steps may be available to you.
          </p>
          <div className="mt-6 flex justify-center pt-1 sm:mt-8 sm:pt-2">
            <button
              type="button"
              onClick={openForm}
              className="btn-brand rounded-lg px-10 py-3.5 text-lg font-semibold text-white shadow-lg transition"
            >
              Check your eligibility now
            </button>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section scroll-mt-28 px-4 py-16 sm:px-6 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-brand-muted heading-eyebrow mb-3 text-center uppercase">Got questions?</p>
          <h2 className="text-brand heading-section mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {FAQS.map((item, i) => (
              <li key={item.q} className="bg-white">
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition hover:bg-slate-50/80"
                  aria-expanded={openFaq === i}
                >
                  <span className="faq-topic min-w-0 flex-1 text-slate-900">
                    {item.q}
                  </span>
                  <span className="text-brand shrink-0 text-xl font-bold" aria-hidden="true">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                <div className={`faq-panel ${openFaq === i ? 'faq-panel-open' : ''}`}>
                  <div className="faq-panel-inner">
                    <p className="pb-5 pr-4 text-lg leading-relaxed text-slate-600 sm:pr-10">{item.a}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={openForm}
              className="btn-brand rounded-xl px-12 py-4 text-lg font-bold text-white shadow-lg transition"
            >
              Start your claim today
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-brand-header border-t border-slate-200 px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <img src={logoImg} alt="" className="mx-auto mb-4 h-10 w-auto object-contain md:mx-0" />
            <p className="max-w-xs text-sm text-slate-600">
              Fraud recovery support for victims across the United Kingdom.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium" aria-label="Footer">
            <a href="#about" className="footer-site-link">
              About
            </a>
            <a href="#services" className="footer-site-link">
              Services
            </a>
            <a href="#faq" className="footer-site-link">
              FAQ
            </a>
            <a href={PHONE_HREF} className="footer-site-link inline-flex items-center gap-1.5">
              <PhoneCallIcon className="h-4 w-4 shrink-0" />
              {PHONE_DISPLAY}
            </a>
          </nav>
        </div>
      </footer>

      {modalOpen && (
        <div
          role="presentation"
          className="modal-root fixed inset-0 z-50 flex min-h-0 flex-col pt-[max(0.625rem,env(safe-area-inset-top))] pb-[max(0.625rem,env(safe-area-inset-bottom))] pl-[max(0.625rem,env(safe-area-inset-left))] pr-[max(0.625rem,env(safe-area-inset-right))] sm:items-center sm:justify-center sm:p-4"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm transition-opacity"
            aria-label="Close form"
            onClick={closeForm}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${modalTitleId}-h`}
            tabIndex={-1}
            className="modal-panel modal-dialog-sheet relative z-10 flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl sm:max-h-[min(92dvh,840px)] sm:max-w-[min(100%,32rem)] sm:flex-none sm:shadow-2xl"
          >
            <header className="modal-dialog-toolbar flex shrink-0 items-center justify-end border-b border-slate-200/90 bg-white px-4 py-3 sm:px-5 sm:py-3.5">
              <button
                type="button"
                onClick={closeForm}
                className="modal-close-btn"
                aria-label="Close dialog"
              >
                <CloseIconMono />
              </button>
            </header>
            <div className="modal-dialog-scroll flex min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
              <ContactForm
                layout="modal"
                onSubmitted={handleSubmitted}
                headingId={`${modalTitleId}-h`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
