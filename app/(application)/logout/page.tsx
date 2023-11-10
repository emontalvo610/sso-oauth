import { LogoutForm } from '@lib/components/PageForms/LogoutForm';
import { getServerActionSession } from '@lib/server/session/session';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Logout() {
  const session = await getServerActionSession();
  if (!session.user) {
    redirect('/');
  }

  return <LogoutForm />;
}
