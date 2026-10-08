import React from 'react';

interface ClusterProps {
  as?: React.ElementType;
  gap?: 'hair' | 'thin' | 'en' | 'em';
  align?: 'start' | 'center' | 'end' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
  className?: string;
  children: React.ReactNode;
}

const gapClasses = {
  hair: 'gap-1',   // 4px
  thin: 'gap-2',   // 8px
  en: 'gap-4',     // 16px
  em: 'gap-6',     // 24px
};

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between'
};

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline'
};

export const Cluster: React.FC<ClusterProps> = ({
  as: Component = 'div',
  gap = 'thin',
  align = 'center',
  justify = 'start',
  wrap = true,
  className = '',
  children
}) => {
  return (
    <Component
      className={`flex ${gapClasses[gap]} ${alignClasses[align]} ${justifyClasses[justify]} ${wrap ? 'flex-wrap' : 'flex-nowrap'} ${className}`}
    >
      {children}
    </Component>
  );
};
