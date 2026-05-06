import { useCallback, useEffect, useId, useState } from 'react'
import logoImg from './assets/logo.png'
import heroBg from './assets/hero.jpeg'
import { ContactForm } from './ContactForm.jsx'
import './App.css'

const PHONE_DISPLAY = '+44 7787 071561'
const PHONE_HREF = 'tel:+447787071561'

const CONTACT_ADDRESS_LINES = ["535 King's Road", 'London SW10 0SZ']
const EMAIL_DISPLAY = 'info@maltonwealthrecovery.com'
const EMAIL_HREF = `mailto:${EMAIL_DISPLAY}`

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
  {
    iconId: 'otherCases',
    title: 'Something We Haven’t Mentioned?',
    body: 'Financial fraud can take many forms, and not every situation fits into a defined category. If your circumstances are not listed above, it does not mean that there are no options available. If you have lost £5,000 or more to a potential scam, we can help you understand your position and take the first steps to help you recover your funds.',
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

function MailIcon({ className }) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  )
}

function MapPinIcon({ className }) {
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
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

function ServiceIconOtherCases({ className }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.65"
        d="M12.83 2.18a2 2 0 00-1.66 0L2.6 6.08a1 1 0 000 1.84l8.57 3.91a2 2 0 001.66 0l8.57-3.9a1 1 0 000-1.84L12.83 2.18z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.65"
        d="M2 12.5l9.07 4.14a2 2 0 001.86 0L22 12.5M2 17.5l9.07 4.14a2 2 0 001.86 0L22 17.5"
      />
    </svg>
  )
}

const SERVICE_ICON_BY_ID = {
  investment: ServiceIconInvestment,
  trading: ServiceIconTrading,
  pushPayment: ServiceIconPushPayment,
  romance: ServiceIconRomance,
  otherCases: ServiceIconOtherCases,
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
        <circle className="hero-benefit-tick-plate" cx="12" cy="12" r="10.25" />
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

function ThankYouView() {
  return (
    <div className="site-landing thank-you-bg flex min-h-svh flex-col items-center justify-center px-4 py-16">
      <img src={logoImg} alt="Malton Wealth Recovery" className="mb-8 h-24 w-auto object-contain opacity-95 sm:h-28" />
      <div className="thank-you-card max-w-lg rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
        <h1 className="heading-thanks mb-4 text-center">
          Thank you for your submission.
        </h1>
        <p className="mb-0 text-center text-lg">
          One of our experts will be in contact shortly.
        </p>
      </div>
    </div>
  )
}

function App() {
  const [submitted, setSubmitted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const formHeadingId = useId()
  const claimFormHeadingId = useId()
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
    return <ThankYouView />
  }

  return (
    <div className="site-landing min-h-svh bg-white text-left text-slate-700 antialiased">
      <header className="bg-brand-header sticky top-0 z-40 border-b border-slate-200 shadow-sm shadow-slate-900/8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5">
          <a href="#" className="inline-flex shrink-0" aria-label="Malton Wealth Recovery — home">
            <img src={logoImg} alt="" className="h-[4rem] w-auto object-contain sm:h-20" />
          </a>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <a
              href={PHONE_HREF}
              className="header-phone-cta inline-flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition sm:px-4 sm:text-base"
            >
              <PhoneCallIcon className="h-[1.125em] w-[1.125em] shrink-0" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>

      <section
        className="hero-section flex min-h-[min(88dvh,56rem)] flex-col justify-center px-4 py-12 text-white sm:px-6 sm:py-14 lg:py-16"
        style={{ '--hero-bg-image': `url(${heroBg})` }}
      >
        <div className="hero-section-content mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="w-full max-w-xl text-left">
            <h1 className="hero-heading hero-heading-stack mb-0">
              <span className="hero-heading-first-line">
                Have you lost <span className="hero-accent-amount">£5,000</span>
              </span>
              <span className="hero-heading-line hero-heading-line-2">or more to a scam</span>
              <span className="hero-heading-line hero-heading-line-3">or fraud?</span>
            </h1>
            <div className="hero-lead-wrap max-w-xl py-6 sm:py-8 lg:py-10">
              <p className="text-hero-muted hero-lead-copy m-0 text-lg leading-relaxed sm:text-xl">
                Recover what is rightfully yours with expert support.
              </p>
            </div>
            <ul className="hero-benefits mb-9 flex max-w-xl flex-col gap-4 text-left text-base leading-snug sm:mb-10 sm:gap-[1.15rem] sm:text-lg">
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
            <div className="hero-cta-group">
              <a
                href={PHONE_HREF}
                className="hero-call-outline inline-flex max-w-full items-center justify-center gap-2 rounded-lg px-8 py-[0.6875rem] text-center text-base font-semibold transition max-sm:w-full"
              >
                <PhoneCallIcon className="h-[1.125em] w-[1.125em] shrink-0 text-current" />
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
        <div className="about-section-inner mx-auto max-w-3xl text-balance">
          <h2 className="text-brand heading-section mb-6 text-center">About Us</h2>
          <p className="about-section-body mb-4 leading-relaxed text-lg text-slate-600">
            With over 15 years of combined experience in fraud recovery, we support individuals across the UK who
            have lost significant sums to scams, including investment scams, cryptocurrency fraud, and online
            financial deception.
          </p>
          <p className="about-section-body leading-relaxed text-lg text-slate-600">
            We understand how complex and distressing it can be to lose money to a scam. That is why our approach
            focuses on discretion, professionalism, and helping you understand your options for recovering money lost to
            fraud.
          </p>
        </div>
      </section>

      <section id="services" className="section-muted scroll-mt-28 px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-brand heading-section mb-10 text-center sm:mb-12 lg:mb-14">Our Services</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
            {SERVICES.map((svc, i) => {
              const centerLastOnLg =
                SERVICES.length % 2 === 1 && i === SERVICES.length - 1
              return (
              <article
                key={svc.title}
                className={`service-card-top service-card flex h-full flex-col rounded-2xl p-7 sm:p-8${
                  centerLastOnLg
                    ? ' lg:col-span-2 lg:justify-self-center lg:w-[calc((100%-2.5rem)/2)]'
                    : ''
                }`}
              >
                <div className="service-card-title-row mb-4 flex w-full items-center gap-3">
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
              )
            })}
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
              className="btn-brand rounded-lg px-10 py-3.5 text-lg font-semibold text-white shadow-md transition"
            >
              Check your eligibility now
            </button>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section scroll-mt-28 px-4 py-16 sm:px-6 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-3xl">
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
        </div>
      </section>

      <section id="claim-form" className="section-muted scroll-mt-28 px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-xl">
          <ContactForm
            onSubmitted={handleSubmitted}
            headingId={claimFormHeadingId}
            layout="page"
            submitLabel="Start your claim today"
          />
        </div>
      </section>

      <footer className="bg-brand-header border-t border-slate-200 px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-left">
            <img src={logoImg} alt="" className="mb-4 h-[4rem] w-auto object-contain sm:h-20" />
            <p className="max-w-xs text-sm text-slate-600">
              Fraud recovery support for victims across the United Kingdom.
            </p>
            <div className="mt-4 flex flex-col items-start gap-2 text-sm text-slate-600">
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 whitespace-nowrap transition hover:text-slate-800">
                <PhoneCallIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
              <a href={EMAIL_HREF} className="inline-flex items-center gap-2 whitespace-nowrap font-medium transition hover:text-slate-800">
                <MailIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {EMAIL_DISPLAY}
              </a>
            </div>
            <address className="mt-3 flex gap-2 text-sm not-italic text-slate-600">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <div className="space-y-0.5">
                {CONTACT_ADDRESS_LINES.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </address>
          </div>
          <nav className="flex flex-wrap justify-start gap-x-8 gap-y-3 text-sm font-medium" aria-label="Footer">
            <a href="#about" className="footer-site-link">
              About
            </a>
            <a href="#services" className="footer-site-link">
              Services
            </a>
            <a href="#faq" className="footer-site-link">
              FAQ
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
                submitLabel="Start your claim today"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
