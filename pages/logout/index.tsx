import { withSessionSsr } from '@lib/server/session/withSession';

const Logout = () => {
  return <div>Logout</div>;
};

export const getServerSideProps = withSessionSsr(async ({ req, query }) => {
  req.session.destroy();

  const params = {
    ...(query.redirect &&
      typeof query.redirect === 'string' && { redirect: query.redirect })
  };
  const queryParams = new URLSearchParams(params);

  return {
    redirect: {
      destination: `/?${queryParams.toString()}`,
      permanent: false
    }
  };
});

export default Logout;
