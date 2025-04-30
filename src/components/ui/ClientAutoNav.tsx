'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface ClientAutoNavProps {
  href: string
}

/**
 * With placing this component, the user is redirected to the `href` page immediately.
 */
const ClientAutoNav = ({href}: ClientAutoNavProps) => {
  const router = useRouter();

  const handleGoToAnotherPage = (dest:string) => {
    router.push(dest);
    return (<div></div>)
  };

  return (
    <div style={{display: "none"}}>
      {handleGoToAnotherPage(href)}
    </div>
  );
};

export default ClientAutoNav;