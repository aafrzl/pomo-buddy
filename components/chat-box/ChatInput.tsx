'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import queryString from 'query-string';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import EmojiPicker from '../EmojiPicker';

const Input = dynamic(
  () => import('@nextui-org/react').then((mod) => mod.Input),
  {
    ssr: false,
  }
);

const schema = z.object({
  message: z.string().min(1, 'Message is required'),
});

type FormValues = z.infer<typeof schema>;

export default function ChatInput() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const url = queryString.stringifyUrl({
      url: '/api/messages',
      query: {
        message: values.message,
      },
    });
    await axios.post(url, { message: values.message }).catch((err) => {
      toast.error(err.response.data);
    });

    form.reset();
  };

  return (
    <form
      className="w-full"
      {...form}
      onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="message"
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="Your message..."
            size="sm"
            autoComplete="off"
            disabled={isLoading}
            isInvalid={!!form.formState.errors.message}
            errorMessage={form.formState.errors.message?.message}
            endContent={
              <EmojiPicker
                onChange={(emoji: string) =>
                  field.onChange(`${field.value} ${emoji}`)
                }
              />
            }
            {...field}
          />
        )}
      />
    </form>
  );
}
