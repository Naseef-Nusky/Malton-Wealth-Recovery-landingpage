import { useCallback, useEffect, useId, useState } from 'react'
import logoImg from './assets/logo.jpeg'
import heroBg from './assets/hero.jpeg'
import './App.css'

const PHONE_DISPLAY = '0800 123 4567'
const PHONE_HREF = 'tel:08001234567'

const HERO_BENEFIT_TICK_PLATE_FILL = 'hero-benefit-tick-plate-sheen'

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#steps', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
]

const TRUST_STATS = [
  { value: '15+ years', label: 'Combined fraud recovery experience' },
  { value: 'UK-wide', label: 'Support for victims across Britain' },
  { value: 'Confidential', label: 'Strict discretion throughout' },
  { value: 'Free review', label: 'No-obligation initial consultation' },
]

const SERVICES = [
  {
    title: 'Investment Scam Recovery',
    body: 'Lost money to a fraudulent investment opportunity? We assess your case and help you explore potential routes to recover funds lost through investment scams.',
  },
  {
    title: 'Trading and Forex Scam Recovery',
    body: 'Trading scams can lead to significant losses. We guide you through your situation and outline the steps that may be available to recover your funds.',
  },
  {
    title: 'Push Payment Fraud',
    body: 'If you were persuaded to transfer money by someone posing as a trusted source, we analyse your case and help identify ways to challenge the transaction.',
  },
  {
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
      className="pointer-events-none h-6 w-6 shrink-0"
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
  const [openFaq, setOpenFaq] = useState(null)

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
      <header className="bg-brand-header sticky top-0 z-40 border-b border-white/10 shadow-lg shadow-slate-900/35">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-3.5">
          <div className="flex items-center justify-between gap-4 sm:contents">
            <a href="#" className="inline-flex shrink-0" aria-label="Malton Wealth Recovery — home">
              <img src={logoImg} alt="" className="h-10 w-auto object-contain sm:h-11" />
            </a>
            <a
              href={PHONE_HREF}
              className="rounded-lg border-2 border-white/45 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20 sm:hidden"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-3 sm:flex-1 sm:border-t-0 sm:pt-0"
            aria-label="Page sections"
          >
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={PHONE_HREF}
            className="hidden rounded-lg border-2 border-white/45 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 sm:inline-flex sm:shrink-0 sm:text-base"
          >
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
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#lead-form"
                className="btn-brand inline-flex rounded-lg px-8 py-3 text-base font-semibold text-white shadow-lg shadow-black/25 transition"
              >
                Check your eligibility
              </a>
              <a href={PHONE_HREF} className="btn-brand-outline inline-flex rounded-lg px-6 py-3 text-base font-semibold transition">
                Call now
              </a>
            </div>
          </div>
          <div id="lead-form" className="scroll-mt-28 w-full max-w-xl lg:sticky lg:top-28 lg:justify-self-end">
            <ContactForm onSubmitted={handleSubmitted} headingId={formHeadingId} />
          </div>
        </div>
      </section>

      <section className="scroll-mt-28 border-y border-slate-200 bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="stat-card rounded-xl px-6 py-5 text-center">
              <p className="topic-stat-lead text-brand mb-2 text-xl sm:text-2xl">{s.value}</p>
              <p className="text-sm leading-snug text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="scroll-mt-28 px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-brand-muted heading-eyebrow mb-3 text-center uppercase">
            Who we are
          </p>
          <h2 className="text-brand heading-section mb-6 text-center">About Us</h2>
          <p className="mb-4 leading-relaxed text-lg text-slate-600">
            With over 15 years of combined experience in fraud recovery, we support individuals across the UK who
            have lost significant sums to scams, including investment scams, cryptocurrency fraud, and online
            financial deception.
          </p>
          <p className="leading-relaxed text-lg text-slate-600">
            We understand how complex and distressing it can be to lose money to a scam. That is why our approach
            focuses on discretion, professionalism, and helping you understand your options for recovering money
            lost to fraud.
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
                <h3 className="text-brand heading-card mb-4">{svc.title}</h3>
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

      <footer className="bg-brand-header px-4 py-12 text-slate-300 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <img src={logoImg} alt="" className="mx-auto mb-4 h-10 w-auto opacity-95 md:mx-0" />
            <p className="max-w-xs text-sm text-slate-400">
              Fraud recovery support for victims across the United Kingdom.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium" aria-label="Footer">
            <a href="#about" className="text-white hover:underline">
              About
            </a>
            <a href="#services" className="text-white hover:underline">
              Services
            </a>
            <a href="#faq" className="text-white hover:underline">
              FAQ
            </a>
            <a href={PHONE_HREF} className="text-white hover:underline">
              {PHONE_DISPLAY}
            </a>
          </nav>
        </div>
      </footer>

      {modalOpen && (
        <div
          role="presentation"
          className="modal-root fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          style={{
            paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
            paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
            paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
            paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
          }}
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
            className="modal-panel modal-dialog-sheet relative z-10 flex max-h-[min(90dvh,720px)] w-full max-w-[min(100%,32rem)] flex-col overflow-hidden rounded-t-[1.25rem] border border-slate-200/90 bg-white shadow-2xl sm:max-h-[min(92dvh,840px)] sm:rounded-[1rem]"
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
