/* global process */
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { Resend } from 'resend'
const app = express(); const port = process.env.PORT || 3001
app.use(cors({ origin: process.env.FRONTEND_ORIGIN?.split(',') || 'http://localhost:5173' })); app.use(express.json({ limit: '10kb' })); app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }))
app.post('/api/contact', async (req, res) => { const { name, email, message } = req.body || {}; if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) return res.status(400).json({ error: 'Valid name, email and message are required.' }); if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO) return res.status(503).json({ error: 'Contact service is not configured.' }); try { await new Resend(process.env.RESEND_API_KEY).emails.send({ from: 'Portfolio <onboarding@resend.dev>', to: process.env.CONTACT_TO, replyTo: email, subject: `Portfolio message from ${name}`, text: message }); res.json({ ok: true }) } catch (error) { console.error(error); res.status(500).json({ error: 'Unable to send message.' }) } })
app.listen(port, () => console.log(`Contact API listening on ${port}`))
