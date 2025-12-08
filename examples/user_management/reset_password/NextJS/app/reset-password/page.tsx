import ResetPasswordForm from './ResetPasswordForm';
import Link from 'next/link';
export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const error = (await searchParams).error;
  if (error) {
    return (
      <div className="flex flex-col gap-4">
        {error ? <div>There is an error: {error}</div> : null}
        <Link className="text-5xl" href="/">
          &#128281;
        </Link>
      </div>
    );
  }
  return <ResetPasswordForm />;
}
