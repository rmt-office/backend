import nodemailer from 'nodemailer'
import { NewUser } from './types'

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_ACC,
    pass: process.env.GMAIL_PASS
  }
})

export const sendMail = async (email: string, user: NewUser) => {
  await transporter.sendMail({
    from: `Remote Office Team ${process.env.GMAIL_USER}`,
    to: email,
    subject: 'Email verification - Remote Office',
    html: `<a href='${process.env.ROOT}/auth/${user._id}' target='_blank' rel='noreferrer' rel='noopener'> Click here to verify your email </a>`
  })
}