'use client';

import { useSyncExternalStore } from 'react';

/**
 * URL query state without `useSearchParams`, so statically rendered pages keep
 * their full content in the HTML. The server snapshot is empty; the client
 * snapshot is read after hydration. Writes use history.replaceState (no
 * navigation, no scroll) and notify subscribers.
 */
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener('popstate', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('popstate', callback);
  };
}

export function useSearchString(): string {
  return useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => '',
  );
}

export function replaceSearch(params: URLSearchParams) {
  const qs = params.toString();
  const url = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`;
  window.history.replaceState(window.history.state, '', url);
  listeners.forEach((l) => l());
}
