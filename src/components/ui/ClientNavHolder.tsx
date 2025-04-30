'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface ClientAutoNavProps {
  href: string
  title?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

/**
 * Some elements place in this component and if the user click on it, redirects to the `href` page.
 */
const ClientNavHolder = ({ children, href, title, style }: Readonly<ClientAutoNavProps>) => {
  const router = useRouter();

  const handleGoToAnotherPage = (dest: string) => {
    router.push(dest);
  };

  return (
    <a onClick={(event: React.MouseEvent) => {event?.preventDefault(); handleGoToAnotherPage(href)}}
      style={{...style}} title={title} href={href}>
      {children}
    </a>
  );
};

export default ClientNavHolder;