import Image from "next/image";
import authors from "../authors";

export function Authors({ authors: _authors }: { authors: string[] }) {
  return (
    <div>
      {_authors?.map((author) => {
        const _auth = authors[author];
        const imageClasses = `border-2 border-[${_auth?.borderColor}] rounded-[33px] h-[32px] w-[32px] flex items-center justify-center overflow-hidden`;
        return (
          <div key={author} className="flex flex-row gap-2 items-center">
            <div className={imageClasses}>
              {_auth ? (
                <Image
                  alt={`${author} profile pic`}
                  width={32}
                  height={32}
                  src={`/authors/${author}.png`}
                />
              ) : (
                <Image
                  alt={`Dr. John A. Zoidberg, DFA`}
                  width={32}
                  height={32}
                  src={`/authors/zoidberg.png`}
                />
              )}
            </div>
            <div className="opacity-60">
              {_auth?.name ?? "edit ./authors.ts with your bio"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
