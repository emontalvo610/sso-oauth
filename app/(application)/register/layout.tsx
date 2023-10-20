import GoogleRecaptchaWrapper from '@lib/components/Wrappers/GoogleRecaptchaWrapper';

export default function RegisterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <GoogleRecaptchaWrapper>{children}</GoogleRecaptchaWrapper>;
}
