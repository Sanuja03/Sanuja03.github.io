import { useState } from 'react'

import { ArrowUpRight, Check, Send } from 'lucide-react'

import { profile } from '../data/portfolio'

import Reveal from '../components/Reveal'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState('idle')
  const apiUrl =
    import.meta.env.VITE_API_URL?.trim() ||
    (import.meta.env.DEV ? 'http://localhost:3001' : '')

  const submit = async (event) => {
    event.preventDefault()

    if (
      !form.name ||
      !/^\S+@\S+\.\S+$/.test(form.email) ||
      !form.message
    ) {
      return setStatus('error')
    }

    if (!apiUrl) {
      return setStatus('unavailable')
    }

    setStatus('sending')

    try {
      const response = await fetch(
        `${apiUrl.replace(/\/$/, '')}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      )

      if (!response.ok) {
        throw new Error('Unable to send')
      }

      setStatus('success')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <main className="contact-page shell">
      <Reveal>
        <p className="eyebrow cobalt">Contact / 04</p>

        <h1 className="page-title">
          Let’s begin with a <em>good conversation.</em>
        </h1>
      </Reveal>

      <div className="contact-page-grid">
        <Reveal>
          <p className="contact-intro">
            I’m open to internship opportunities and conversations around
            software, IT, and useful ideas.
          </p>

          <a className="big-email" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight size={20} />
          </a>

          <div className="contact-list">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>

            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>

            <span>{profile.location}</span>
          </div>
        </Reveal>

        <Reveal>
          <form className="contact-form" onSubmit={submit} noValidate>
            <label>
              Name
              <input
                value={form.name}
                onChange={(event) =>
                  setForm({
                    ...form,
                    name: event.target.value,
                  })
                }
                placeholder="Your name"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({
                    ...form,
                    email: event.target.value,
                  })
                }
                placeholder="you@example.com"
              />
            </label>

            <label>
              Message
              <textarea
                rows="5"
                value={form.message}
                onChange={(event) =>
                  setForm({
                    ...form,
                    message: event.target.value,
                  })
                }
                placeholder="What would you like to talk about?"
              />
            </label>

            {status === 'error' && (
              <p className="form-error">
                Please complete all fields with a valid email.
              </p>
            )}

            {status === 'failed' && (
              <p className="form-error">
                The message could not be sent. Please use the email link
                instead.
              </p>
            )}

            {status === 'unavailable' && (
              <p className="form-error">
                The contact form is not configured yet. Please use the email link instead.
              </p>
            )}

            {status === 'success' && (
              <p className="form-success">
                <Check size={15} />
                Thanks — your message has been sent.
              </p>
            )}

            <button
              disabled={status === 'sending' || status === 'success'}
            >
              {status === 'sending'
                ? 'Sending…'
                : status === 'success'
                  ? 'Sent'
                  : 'Send message'}

              <Send size={15} />
            </button>
          </form>
        </Reveal>
      </div>
    </main>
  )
}
