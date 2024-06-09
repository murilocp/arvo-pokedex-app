import React from 'react';

interface InfoItemProps {
  label: React.ReactNode;
  children: React.ReactNode;
}

export default function InfoItem({ label, children }: InfoItemProps) {
  return (
    <li className='mb-2'>
      <p className='text-lg font-bold'>{label}</p>
      <p>{children}</p>
    </li>
  );
}
