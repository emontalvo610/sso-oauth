import type { FC, PropsWithChildren } from 'react';

const HorizontalBar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="my-3 flex items-center text-md font-normal text-gray-500">
      <div className="h-[1px] grow-[1] bg-gray-200" />
      <span className="bg-white px-2">{children}</span>
      <div className="h-[1px] grow-[1] bg-gray-200" />
    </div>
  );
};

export default HorizontalBar;
