import React from 'react';

interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  sidebarWidth?: 'narrow' | 'default' | 'wide';
  breakpoint?: 'md' | 'lg' | 'xl';
  className?: string;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  sidebar,
  children,
  sidebarPosition = 'left',
  sidebarWidth = 'default',
  className = ''
}) => {
  const widthClasses = {
    narrow: 'w-full lg:w-64 shrink-0',
    default: 'w-full lg:w-80 shrink-0',
    wide: 'w-full lg:w-96 shrink-0'
  }[sidebarWidth];

  return (
    <div className={`flex flex-col lg:flex-row gap-6 lg:gap-8 items-start ${className}`}>
      {sidebarPosition === 'left' && <aside className={widthClasses}>{sidebar}</aside>}
      <main className="flex-1 min-w-0 w-full">{children}</main>
      {sidebarPosition === 'right' && <aside className={widthClasses}>{sidebar}</aside>}
    </div>
  );
};
