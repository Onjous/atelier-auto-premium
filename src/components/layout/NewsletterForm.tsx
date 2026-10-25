'use client';

import { useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Demonstration newsletter sign-up: validates locally, sends nothing. */
export function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setState(EMAIL.test(email.trim()) ? 'done' : 'error');
      }}
    >
      <label htmlFor={`${id}-email`} className="field-label">
        The Journal, by email
      </label>
      <div className="flex items-end gap-3">
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="name@domain.com"
          className="field-input"
          value={email}
          aria-invalid={state === 'error'}
          aria-describedby={`${id}-msg`}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== 'idle') setState('idle');
          }}
        />
        <button type="submit" aria-label="Subscribe" className="grid grid-cols-1 size-12 shrink-0 place-items-center border border-line-strong transition-colors hover:border-champagne hover:text-champagne">
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
        </button>
      </div>
      <p id={`${id}-msg`} role="status" aria-live="polite" className="mt-3 min-h-[2.5em] text-[0.8rem] leading-snug">
        {state === 'error' && <span className="text-danger">Enter a valid email address.</span>}
        {state === 'done' && <span className="text-mist">Thank you. This is a demonstration — no subscription was created and nothing was sent.</span>}
        {state === 'idle' && <span className="text-mist">Occasional notes on care and protection. Demonstration only.</span>}
      </p>
    </form>
  );
}
