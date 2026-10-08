import React from 'react';

interface GridFrameProps {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'hair' | 'thin' | 'en' | 'em' | 'double';
  withGuides?: boolean;
  className?: string;
  children: React.ReactNode;
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-4 sm:grid-cols-6 lg:grid-cols-12'
};

const gapClasses = {
  hair: 'gap-1',
  thin: 'gap-2',
  en: 'gap-4',
  em: 'gap-6',
  double: 'gap-8'
};

export const GridFrame: React.FC<GridFrameProps> = ({
  columns = 3,
  gap = 'en',
  withGuides = false,
  className = '',
  children
}) => {
  return (
    <div
      className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${
        withGuides ? 'relative outline-dashed outline-1 outline-[var(--press-registration)]/30' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
