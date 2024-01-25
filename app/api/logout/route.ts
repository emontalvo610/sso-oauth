import { getServerActionSession } from '@lib/server/session/session';
import { redirect } from 'next/navigation';

export async function GET() {
  const session = await getServerActionSession();
  session.destroy();

  redirect(`${process.env.NEXT_PUBLIC_PICKLEBALL_TOURNAMENTS}/session-destroy`);
}
