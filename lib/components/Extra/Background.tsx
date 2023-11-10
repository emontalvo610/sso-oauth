'use client';

const Background = () => {
  return (
    <div
      className="fixed left-0 top-0 z-[-1] h-[100vh] w-[100vw]"
      style={{
        backgroundImage: 'url("/images/background.jpg")',
        backgroundSize: 'cover'
      }}
    />
  );
};

export default Background;
