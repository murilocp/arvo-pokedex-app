'use client';

import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Pokémon name must have at least 3 characters.',
  }),
});

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: searchParams.get('name')?.toString() || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const previousSearch = searchParams.get('name')?.toString();
    if (values.name !== previousSearch && values.name !== '') {
      const params = new URLSearchParams(searchParams);
      params.set('name', values.name);

      replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative'>
                  <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5' />
                  <Input
                    placeholder='Search for a Pokemon'
                    className='w-full px-10 py-2 rounded-md bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent'
                    {...field}
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
