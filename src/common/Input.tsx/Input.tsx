import { ChangeEvent } from 'react';

type Input = {
  type: string;
  placeholder: string;
  value: string;
  name: string;
  autoFocus?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  type,
  placeholder,
  value,
  name,
  autoFocus,

  onChange,
}: Input) {
  return (
    <label htmlFor={name} className='mt-4 font-bold'>
      {name && `${name.charAt(0).toUpperCase()}${name.substring(1)}`}
      <input
        className='w-80 h-10 p-1 block border-2 font-light'
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        autoFocus={autoFocus}
        onChange={onChange}
      />
    </label>
  );
}
