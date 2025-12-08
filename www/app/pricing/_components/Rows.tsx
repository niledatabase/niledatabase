import React from 'react';
import Database from '@/public/icons/database.svg';
import Store from '@/public/icons/store.svg';
import Support from '@/public/icons/support.svg';
import Image from 'next/image';
export function DatabaseRow() {
  return (
    <div className="mb-3.5 flex flex-row items-center gap-2 text-lg lg:text-sm xl:text-lg">
      <div className="icon flex !h-11 !w-11 justify-center rounded-xl">
        <Image
          src={Database}
          alt="orange, purple, blue db icon"
          width={28}
          height={28}
        />
      </div>
      Databases
    </div>
  );
}
export function ConsoleRow() {
  return (
    <div className="mb-3.5 flex flex-row items-center gap-2 text-lg lg:text-sm xl:text-lg">
      <div className="icon flex !h-11 !w-11 justify-center rounded-xl">
        <Image src={Store} alt="</> inside []" width={28} height={28} />
      </div>
      Management Console
    </div>
  );
}
export function UserManagementRow() {
  return (
    <div className="mb-3.5 flex flex-row items-center gap-2 text-lg lg:text-sm xl:text-lg">
      <div className="icon flex !h-11 !w-11 justify-center rounded-xl">
        <Image src={Store} alt="</> inside []" width={28} height={28} />
      </div>
      Auth
    </div>
  );
}
export function SupportRow() {
  return (
    <div className="mb-3.5 flex flex-row items-center gap-2 text-lg lg:text-sm xl:text-lg">
      <div className="icon flex !h-11 !w-11 justify-center rounded-xl">
        <Image
          src={Support}
          alt="circle with question mark"
          width={28}
          height={28}
        />
      </div>
      Support
    </div>
  );
}

export function TableDivider({
  mobile,
  children,
}: {
  mobile: 'database' | 'console' | 'support' | 'usermanagement';
  children: JSX.Element;
}) {
  return (
    <>
      {mobile === 'database' ? (
        <div className="py-5 lg:hidden">
          <DatabaseRow />
        </div>
      ) : null}
      {mobile === 'console' ? (
        <div className="py-5 lg:hidden">
          <ConsoleRow />
        </div>
      ) : null}
      {mobile === 'support' ? (
        <div className="py-5 lg:hidden">
          <SupportRow />
        </div>
      ) : null}
      {mobile === 'usermanagement' ? (
        <div className="py-5 lg:hidden">
          <UserManagementRow />
        </div>
      ) : null}

      {children}
    </>
  );
}
