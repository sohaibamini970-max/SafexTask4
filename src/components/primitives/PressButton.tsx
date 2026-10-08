import React from 'react';

export interface PressButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'deboss' | 'stamp' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isStamped?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const PressButton: React.FC<PressButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isStamped = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-xs py-1.5 px-3 min-h-[32px] gap-1.5',
    md: 'text-sm py-2 px-4 min-h-[40px] gap-2',
    lg: 'text-base py-2.5 px-6 min-h-[48px] gap-2.5'
  }[size];

  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles =
        'bg-[var(--color-primary)] text-[var(--color-primary-fg)] hover:opacity-90 active:translate-y-px shadow-sm';
      break;
    case 'secondary':
      variantStyles =
        'bg-[var(--surface-muted)] text-[var(--ink-primary)] hover:bg-[var(--border-hairline)] active:translate-y-px';
      break;
    case 'outline':
      variantStyles =
        'bg-transparent border border-[var(--border-strong)] text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] active:translate-y-px';
      break;
    case 'deboss':
      variantStyles =
        'bg-[var(--surface-muted)] border border-[var(--border-hairline)] text-[var(--ink-primary)] shadow-press-deboss hover:border-[var(--border-strong)] active:shadow-inner';
      break;
    case 'stamp':
      variantStyles =
        'border-2 border-dashed border-[var(--color-danger)] text-[var(--color-danger)] font-mono font-bold tracking-widest uppercase hover:bg-[var(--color-danger)]/5';
      break;
    case 'danger':
      variantStyles =
        'bg-[var(--color-danger)] text-white hover:opacity-90 active:translate-y-px shadow-sm';
      break;
  }

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium whitespace-nowrap transition-all select-none disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none ${sizeStyles} ${variantStyles} ${
        isStamped ? 'rotate-[-2deg] scale-[1.02]' : ''
      } ${className}`}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
