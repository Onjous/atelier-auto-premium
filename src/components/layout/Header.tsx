'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { bookingHref, primaryNav, secondaryNav } from '@/data/navigation';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes (state adjustment during render).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > lastY + 4);
      if (y < lastY - 4 || y < 480) setHidden(false);
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Scroll lock, Escape to close, focus trap.
  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
      if (e.key === 'Tab') {
        const items = [toggleRef.current, ...focusables()].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-700 ease-[var(--ease-expo)]',
          'border-b',
          scrolled && !menuOpen ? 'border-line bg-ink-900/85 backdrop-blur-md' : 'border-transparent bg-transparent',
          hidden && !menuOpen && '-translate-y-full',
        )}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} — home`} className="relative z-10 -my-2 py-2">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group relative flex h-11 items-center px-4 text-[0.8rem] tracking-[0.08em] transition-colors',
                        active ? 'text-bone' : 'text-mist hover:text-bone',
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          'absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-champagne transition-[opacity,transform] duration-500',
                          active ? 'opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-60',
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href={bookingHref} className="btn btn-ghost hidden !min-h-11 !px-5 sm:inline-flex">
              <span>Book a consultation</span>
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="relative z-10 -mr-2 grid grid-cols-1 size-11 place-items-center lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            >
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={cn(
                    'absolute left-0 h-px w-6 bg-bone transition-transform duration-500 ease-[var(--ease-expo)]',
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute right-0 h-px bg-bone transition-all duration-500 ease-[var(--ease-expo)]',
                    menuOpen ? 'top-1.5 w-6 -rotate-45' : 'top-3 w-4',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!menuOpen}
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-ink-950 transition-[clip-path,visibility] duration-700 ease-[var(--ease-expo)] lg:hidden',
          menuOpen ? 'visible [clip-path:inset(0_0_0_0)]' : 'invisible [clip-path:inset(0_0_100%_0)]',
        )}
        style={{ paddingTop: 'calc(var(--header-h) + env(safe-area-inset-top))', paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center overflow-y-auto py-8">
          <ul>
            {[...primaryNav, ...secondaryNav].map((item, i) => (
              <li
                key={item.href}
                className={cn(
                  'border-b border-line transition-[opacity,transform] duration-700 ease-[var(--ease-expo)]',
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                )}
                style={{ transitionDelay: menuOpen ? `${150 + i * 55}ms` : '0ms' }}
              >
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className="flex items-baseline gap-5 py-4 text-[clamp(1.9rem,8vw,3rem)] leading-none font-light tracking-[-0.03em] uppercase aria-[current=page]:text-champagne"
                >
                  <span className="t-meta w-6 text-mist">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className={cn(
            'shell flex flex-col gap-6 pb-8 transition-opacity delay-500 duration-700',
            menuOpen ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Link href={bookingHref} className="btn w-full">
            <span>Book a consultation</span>
            <ArrowRight aria-hidden className="btn-icon size-4" strokeWidth={1.5} />
          </Link>
          <p className="t-meta text-mist">
            {site.contact.email} · {site.contact.phone}
          </p>
        </div>
      </div>
    </>
  );
}
