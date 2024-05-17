'use client';

import BackButton from '@components/Buttons/BackButton';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import LinkButton from '@lib/components/Buttons/LinkButton';
import TermsAndPolicy from '@lib/components/Footers/TermsAndPolicy';
import { isWebView } from '@lib/utils/webview';
import { Button } from '@pickleballinc/react-ui';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import LogoButton from '../Buttons/LogoButton';
import Background from '../Extra/Background';
import Spinner from '../Loadings/Spinner';

interface IFormProps {
  email: string;
}

export default function ProfileForm(props: IFormProps) {
  const [isLoading, setLoading] = useState(false);
  const params = useSearchParams();

  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/logout');
      const data = await response.json();
      if (response.status === 200 && data.status === 'OK') {
        const p = new URLSearchParams({
          ...(data.body.redirectOLT && { olt: data.body.redirectOLT })
        });
        window.location.href = `${data.body.redirectURI}?${p.toString()}`;
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getBackUrl = () => {
    const cancelUrl = params?.get('cancel');
    return cancelUrl || `${process.env.NEXT_PUBLIC_PB_URI}`;
  };

  return (
    <>
      <Background />
      <BackButtonLayout>
        <BackButton targetUrl={getBackUrl()} />
      </BackButtonLayout>
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[60px]">
        <div className="pb-4">
          <LogoButton />
        </div>
        <div className="box-border flex w-[440px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center gap-8">
            <img src="/icons/logo-pt.svg" width={48} height={48} />
            <img src="/icons/logo-p.svg" width={48} height={48} />
            <img src="/icons/logo-pb.svg" width={48} height={48} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Welcome back
          </div>
          <div className="mt-3 text-md font-normal text-gray-500 sm:mt-2">
            You are currently logged in as:
            <br />
            <div className="mt-1 text-xmd font-medium">{props.email}</div>
          </div>
          {!isWebView() && (
            <div className="mt-8 w-full">
              <Link
                href={
                  params?.get('redirect') || `${process.env.NEXT_PUBLIC_PB_URI}`
                }
                className="link-none"
              >
                <Button variant="primary" className="btn-submit">
                  Continue
                </Button>
              </Link>
            </div>
          )}
          <div className="mt-4 text-center text-md">
            Do you want to use another account?{' '}
            <LinkButton onClick={() => logout()} disabled={isLoading}>
              {isLoading && <Spinner />}
              Switch Account
            </LinkButton>
          </div>
          <div className="mt-8">
            <TermsAndPolicy />
          </div>
        </div>
      </div>
    </>
  );
}
