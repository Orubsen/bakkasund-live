import { useEffect, useRef } from 'react';

// Felles oppførsel for dialoger: Esc lukker, siden bak låses, fokus flyttes inn og tilbake.
export default function useModalA11y(isOpen, onClose) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return undefined;
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') closeRef.current?.();
    };
    document.addEventListener('keydown', onKey);

    const t = setTimeout(() => {
      const el = dialogRef.current;
      if (!el) return;
      const first = el.querySelector('input, select, textarea, button:not([data-close])');
      (first || el).focus({ preventScroll: true });
    }, 30);

    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [isOpen]);

  return dialogRef;
}
