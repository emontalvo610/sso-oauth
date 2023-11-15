'use client';

import Background from '../Extra/Background';

const Loading = () => {
  return (
    <div className="flex w-[100vw] flex-col items-center self-center">
      <Background />
      <div className="box-border flex h-[350px] w-[440px] flex-col items-center justify-center rounded-[12px] bg-white px-10 py-8 opacity-80 sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
        <div className="h-20 w-20 animate-spin rounded-full border-8 border-solid border-gray-300 border-t-blue-600" />
      </div>
    </div>
  );
};

export default Loading;
