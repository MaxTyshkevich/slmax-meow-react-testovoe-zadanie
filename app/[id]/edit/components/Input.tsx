'use client';

import { ChangeEvent } from 'react';

interface InputProps {
  name: string;
  value: string | number;
  type?: string;
  onChange?: (value: string) => void;
}

export const Input = ({ value, name, onChange, type = 'text' }: InputProps) => {
  return (
    <div className="flex items-center gap-2  text-sm">
      <label className="capitalize w-[80px]" htmlFor={name}>
        {name}:
      </label>
      <input
        className="flex-grow p-3 rounded-lg border border-black"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange?.(event.target.value);
        }}
      />
    </div>
  );
};
