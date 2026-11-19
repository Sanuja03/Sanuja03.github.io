import { useState } from 'react'

import { ArrowUpRight, Check, Send } from 'lucide-react'

import { contact, profile } from '../data/portfolio'

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
    <main className="page shell">
      <Reveal className="page-intro">
        <h1 className="page-title">{contact.title}</h1>
        <p className="page-lead">{contact.description}</p>
      </Reveal>

      <div className="contact-grid">
        <Reveal className="contact-details">
          <p>The quickest way to reach me is by email.</p>

          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight size={18} />
          </a>

          <ul className="contact-list">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            </li>
            <li>{profile.location}</li>
          </ul>
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
