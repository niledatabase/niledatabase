import { FC } from 'react';

interface UserMessageProps {
  text: string;
}

const UserMessage: FC<UserMessageProps> = ({ text }) => {
  return (
    <>
      <div className="w-full gap-x-8 rounded-lg p-4 text-right text-blue-500">
        {text}
      </div>
    </>
  );
};

export default UserMessage;
