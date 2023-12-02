import { isWebView } from '@lib/utils/webview';

interface ITermsAndPolicy {
  simple?: boolean;
}

const TermsAndPolicy = ({ simple }: ITermsAndPolicy) => {
  return (
    <div className="text-left text-sm font-normal leading-5 text-gray-600">
      {!simple && (
        <div>
          This email and password lets you seamlessly log into the
          Pickleball.com products, such as Pickleball+,
          PickleballTournaments.com, and PickleballBrackets.com. If you've used
          your email with one of these products, please use it here too.
          <br />
          <br />
        </div>
      )}
      {isWebView() ? (
        <>
          By signing up or logging in, I agree to Pickleball.com's terms of
          service, privacy policy, and DMCA policy.
        </>
      ) : (
        <>
          By signing up or logging in, I agree to Pickleball.com's{' '}
          <a href="https://pickleball.com/terms-of-use">terms of service</a>,{' '}
          <a href="https://pickleball.com/privacy-policy">privacy policy</a>,{' '}
          <a href="https://pickleball.com/dmca-notice">and DMCA policy</a>.
        </>
      )}
    </div>
  );
};

export default TermsAndPolicy;
