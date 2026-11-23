import React, { useId } from 'react';

export const inputClass =
  'w-full min-h-11 px-3.5 py-2.5 rounded-md bg-natt border border-linje-2 text-[15px] text-papir placeholder-take/60 transition-colors hover:border-take/50 focus:outline-none focus:border-sol focus:ring-2 focus:ring-sol/25';

export function Field({ label, hint, children, className = '' }) {
  const id = useId();
  const child = React.Children.only(children);
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-papir mb-1.5">
        {label}
      </label>
      {React.cloneElement(child, { id, 'aria-describedby': hint ? `${id}-hint` : undefined })}
      {hint && (
        <p id={`${id}-hint`} className="text-[13px] text-take mt-1">
          {hint}
        </p>
      )}
    </div>
  );
}

export function Button({ variant = 'secondary', className = '', ...props }) {
  const styles = {
    primary: 'bg-sol text-blekk hover:bg-sol-2 font-semibold',
    secondary: 'bg-dyp-2 text-papir border border-linje-2 hover:border-take/50 hover:bg-linje font-semibold',
    ghost: 'text-sjo hover:bg-white/5 font-semibold',
    danger: 'text-korall hover:bg-korall/10 font-semibold',
  };
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 min-h-10 px-4 py-2 rounded-md text-sm transition-colors active:translate-y-px cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

export function Panel({ title, action, children, className = '' }) {
  return (
    <section className={`rounded-xl bg-dyp border border-linje p-5 sm:p-6 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 mb-4">
          {title && <h2 className="text-[1.0625rem] font-semibold text-papir">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
