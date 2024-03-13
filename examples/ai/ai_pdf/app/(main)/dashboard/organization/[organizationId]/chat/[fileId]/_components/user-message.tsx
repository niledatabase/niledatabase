import { FC } from "react";

interface UserMessageProps {
  text: string;
}

const UserMessage: FC<UserMessageProps> = ({ text }) => {
  return (
    <>
      <div className="text-blue-500 text-right p-4 gap-x-8 rounded-lg w-full">
        {text}
      </div>
    </>
  );
};

export default UserMessage;
