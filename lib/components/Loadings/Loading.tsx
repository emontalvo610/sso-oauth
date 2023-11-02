'use client';

const Loading = () => {
  return (
    <div className="fixed flex h-full w-full items-center justify-center">
      <div className="h-20 w-20 animate-spin rounded-full border-8 border-solid border-gray-300 border-t-blue-600" />
    </div>
  );
};

export default Loading;
