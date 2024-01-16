import HomeForm from '@lib/components/PageForms/HomeForm';
import { getServerActionSession } from '@lib/server/session/session';
import { redirect } from 'next/navigation';

export default async function HomePage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerActionSession();
  const { user } = session;
  const redParams = new URLSearchParams(searchParams as any);

  if (user) {
    redirect(`/account?${redParams.toString()}`);
  }

  return <HomeForm />;
}
