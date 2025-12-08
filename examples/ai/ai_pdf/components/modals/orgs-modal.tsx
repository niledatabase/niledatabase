'use client';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useOrgs } from '@/hooks/use-orgs';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Spinner } from '../spinner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface OrganizationModalProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export function OrganizationModal({
  className,
  ...props
}: OrganizationModalProps) {
  const orgs = useOrgs();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });
  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/tenant`, values);
      // console.log(values, "VALUES VALUES");
      form.reset();
      toast.success('Organization Created.');
      router.refresh();
      orgs.onClose();
    } catch (error) {
      console.error(error);
      toast.error('Error creating organization.');
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={orgs.isOpen} onOpenChange={orgs.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Create an Organization</h2>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 flex w-full grid-cols-12 flex-col gap-2 rounded-lg border px-2 py-4 focus-within:shadow-sm md:px-4"
          >
            <div className="grid gap-3">
              <div className="grid gap-1">
                <Label className="mb-3" htmlFor="name">
                  Name
                </Label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Trevor's Birthday"
                          type="text"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} className="mt-5">
                  {isLoading && <Spinner />}
                  Create an Org
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
