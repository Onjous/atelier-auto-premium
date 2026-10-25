'use client';

import { useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Enter your name.';
  if (!EMAIL.test(f.email.trim())) e.email = 'Enter a valid email address.';
  if (f.message.trim().length < 10) e.message = 'Tell us a little more — at least 10 characters.';
  return e;
}

/** General enquiry (demonstration): validates locally, sends nothing. */
export function EnquiryForm() {
  const id = useId();
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const summary = useRef<HTMLDivElement>(null);

  const field = (key: keyof Fields, label: string, input: React.ReactNode) => (
    <div>
      <label htmlFor={`${id}-${key}`} className="field-label">
        {label}
      </label>
      {input}
      {errors[key] && (
        <p id={`${id}-${key}-err`} className="field-error">
          {errors[key]}
        </p>
      )}
    </div>
  );

  const common = (key: keyof Fields) => ({
    id: `${id}-${key}`,
    value: fields[key],
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${id}-${key}-err` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFields((f) => ({ ...f, [key]: e.target.value })),
    className: 'field-input',
  });

  if (sent) {
    return (
      <div role="status" className="border border-line p-8" tabIndex={-1} ref={(el) => el?.focus()}>
        <p className="t-eyebrow text-champagne">Demonstration</p>
        <p className="t-h3 mt-4">Your message was validated — and not sent.</p>
        <p className="mt-3 text-mist">This website is a demonstration. No message has been delivered to anyone. In production this form connects to the studio’s inbox or CRM.</p>
        <Button variant="ghost" className="mt-8" onClick={() => { setSent(false); setFields({ name: '', email: '', message: '' }); }}>
          Write another
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        const errs = validate(fields);
        setErrors(errs);
        if (Object.keys(errs).length === 0) setSent(true);
        else requestAnimationFrame(() => summary.current?.focus());
      }}
    >
      {Object.keys(errors).length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="border border-danger/50 p-4 text-[0.9rem] text-danger">
          Please correct {Object.keys(errors).length === 1 ? 'one field' : `${Object.keys(errors).length} fields`} below.
        </div>
      )}
      {field('name', 'Name', <input type="text" autoComplete="name" {...common('name')} />)}
      {field('email', 'Email', <input type="email" autoComplete="email" {...common('email')} />)}
      {field('message', 'Message', <textarea rows={5} {...common('message')} className="field-input resize-y" />)}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.8rem] text-mist">Demonstration form — nothing is sent.</p>
        <Button type="submit" icon>
          Send message
        </Button>
      </div>
    </form>
  );
}
