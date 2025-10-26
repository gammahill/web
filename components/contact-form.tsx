"use client"

import type React from "react"

import { FormEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useRecaptcha } from "@/hooks/use-recaptcha"

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
  const { isLoaded, executeRecaptcha } = useRecaptcha(siteKey);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Execute reCAPTCHA
      if (!isLoaded) {
        throw new Error('reCAPTCHA not loaded yet');
      }

      const recaptchaToken = await executeRecaptcha('submit_form');

      // Submit form with reCAPTCHA token
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setStatus('success');
        setDisabled(true);
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
        setDisabled(false);
        setErrorMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setDisabled(false);
      setErrorMessage('Failed to submit form. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          {/* <Label htmlFor="name" className="text-sm text-muted-foreground font-mono">
          NAME
        </Label> */}
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="transition-all duration-300 focus-visible:ring-[3px]"
          />
        </div>

        <div className="space-y-2">
          {/* <Label htmlFor="email" className="text-sm text-muted-foreground font-mono">
          EMAIL
        </Label> */}
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="transition-all duration-300 focus-visible:ring-[3px]"
          />
        </div>

        <div className="space-y-2">
          {/* <Label htmlFor="company" className="text-sm text-muted-foreground font-mono">
          COMPANY
        </Label> */}
          <Input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company (optional)"
            className="transition-all duration-300 focus-visible:ring-[3px]"
          />
        </div>

        <div className="space-y-2">
          {/* <Label htmlFor="message" className="text-sm text-muted-foreground font-mono">
          MESSAGE
        </Label> */}
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell me about your project..."
            className="min-h-32 transition-all duration-300 focus-visible:ring-[3px] resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="group w-full sm:w-auto px-8 py-3 bg-main text-white rounded-lg font-medium transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              Sending...
            </>
          ) : status === "success" ? (
            <>
              Sent!
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          ) : (
            <>
              Send Message
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>

        {status === "success" && (
          <p className="text-sm text-muted-foreground">Thanks for reaching out! I'll get back to you soon.</p>
        )}

        {status === 'error' && (
          <p className="text-red-600 text-sm">{errorMessage}</p>
        )}
      </form>

      <div className="mt-4 text-xs text-muted-foreground">
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and{' '}
        <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.
      </div>
    </>
  )
}
