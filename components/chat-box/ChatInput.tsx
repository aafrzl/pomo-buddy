'use client';

import * as z from 'zod';
import axios from 'axios';
import queryString from 'query-string';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import dynamic from 'next/dynamic';
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
    try {
      const url = queryString.stringifyUrl({
        url: '/api/messages',
        query: {
          message: values.message,
        },
      });
      await axios.post(url, { message: values.message });

      form.reset();
    } catch (error) {
      console.log('[SEND_MESSAGE_ERROR]');
    }
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
