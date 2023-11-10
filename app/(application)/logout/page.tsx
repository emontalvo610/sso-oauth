import { getServerActionSession } from '@lib/server/session/session';
import { redirect } from 'next/navigation';
import React from 'react';

import { LogoutForm } from './LogoutForm';

export default async function Logout() {
  const session = await getServerActionSession();
  if (!session.user) {
    redirect('/');
  }

  return <LogoutForm />;
}
