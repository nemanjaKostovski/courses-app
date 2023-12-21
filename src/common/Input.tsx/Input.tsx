import { ChangeEvent } from 'react';

type Input = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ type, placeholder, value, onChange }: Input) {
  return (
    <input
      className='w-80 h-10 p-1 mr-4'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
