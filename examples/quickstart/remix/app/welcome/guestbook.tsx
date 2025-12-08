import { Form, useNavigation } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export default function GuestBook({
  guestBook,
  guestBookError,
  message,
}: {
  guestBook: {
    name: string;
    id: string | null;
  }[];
  guestBookError?: string;
  message?: string;
}) {
  const navigation = useNavigation();
  if (message === 'Unauthorized') {
    return null;
  }
  return (
    <section className="space-y-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
      <Form
        method="post"
        className="w-full max-w-lg space-y-4"
        onSubmit={(event) => {
          if (navigation.state === 'submitting') {
            event.preventDefault();
          }
          const form = event.currentTarget;
          requestAnimationFrame(() => {
            form.reset();
          });
        }}
      >
        <Input name="name" placeholder="Name" required />
        <Input
          name="email"
          type="email"
          placeholder="your@email.com"
          required
        />
        <Button type="submit" disabled={navigation.state === 'submitting'}>
          Sign Guest Book
        </Button>
        {guestBookError && (
          <p className="text-red-500 dark:text-red-400">{guestBookError}</p>
        )}
      </Form>
      <ul className="text-center">
        {<li className="p-3">{message}</li>}
        {guestBook.map(({ id, name }) => (
          <li key={id} className="p-3">
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
