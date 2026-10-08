import React from 'react';

interface StackProps {
  as?: React.ElementType;
  gap?: 'hair' | 'thin' | 'en' | 'em' | 'double' | 'quad';
  align?: 'start' | 'center' | 'end' | 'stretch';
  divider?: boolean;
  className?: string;
  children: React.ReactNode;
}

const gapClasses = {
  hair: 'gap-1',     // 4px / 0.25 pica
  thin: 'gap-2',     // 8px / 0.5 pica
  en: 'gap-4',       // 16px / 1 pica
  em: 'gap-6',       // 24px / 1.5 pica
  double: 'gap-8',   // 32px / 2 pica
  quad: 'gap-16',    // 64px / 4 pica
};

export const Stack: React.FC<StackProps> = ({
  as: Component = 'div',
  gap = 'en',
  align = 'stretch',
  divider = false,
  className = '',
  children
}) => {
  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }[align];

  return (
    <Component className={`flex flex-col ${gapClasses[gap]} ${alignClass} ${divider ? 'divide-y divide-[var(--border-hairline)]' : ''} ${className}`}>
      {children}
    </Component>
  );
};
