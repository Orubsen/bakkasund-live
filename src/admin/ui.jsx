import React, { useId } from 'react';

export const inputClass =
  'w-full px-3.5 py-2.5 rounded-lg bg-[#0D1B2A] border border-[#2B4A63] text-[15px] text-white placeholder-white/35 focus:outline-none focus:border-[#F79D1B]';

export function Field({ label, hint, children, className = '' }) {
  const id = useId();
  const child = React.Children.only(children);
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-[#F3E9D2] mb-1.5">
        {label}
      </label>
      {React.cloneElement(child, { id, 'aria-describedby': hint ? `${id}-hint` : undefined })}
      {hint && (
        <p id={`${id}-hint`} className="text-[13px] text-[#F3E9D2]/60 mt-1">
          {hint}
        </p>
      )}
    </div>
  );
}

export function Button({ variant = 'secondary', className = '', ...props }) {
  const styles = {
    primary: 'bg-[#F79D1B] text-[#0D1B2A] hover:brightness-110 font-bold',
    secondary: 'bg-white/5 text-white border border-[#2B4A63] hover:bg-white/10 font-semibold',
    ghost: 'text-[#6EC1C6] hover:bg-white/5 font-semibold',
    danger: 'text-[#ffb4a8] hover:bg-[#ffb4a8]/10 font-semibold',
  };
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

export function Panel({ title, action, children, className = '' }) {
  return (
    <section className={`rounded-2xl bg-[#13263A] border border-[#1E3A52] p-5 sm:p-6 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 mb-4">
          {title && <h2 className="font-['Oswald'] text-xl font-semibold text-white">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
