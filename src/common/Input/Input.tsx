import { ChangeEvent } from 'react';

type Input = {
  type: string;
  placeholder: string;
  value: string | number;
  name: string;
  autoFocus?: boolean;
  inputWidth?: string;
  inputLayout?: string;
  labelLayout?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  type,
  placeholder,
  value,
  name,
  autoFocus,
  inputWidth,
  inputLayout,
  labelLayout,
  onChange,
}: Input) {
  return (
    <>
      <label htmlFor={name} className={`${labelLayout} mt-4 font-bold`}>
        {name && `${name.charAt(0).toUpperCase()}${name.substring(1)}`}
      </label>
      <input
        className={`${
          inputWidth || 'w-80'
        } ${inputLayout} h-10 p-1 block border-2 font-light`}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        autoFocus={autoFocus}
        onChange={onChange}
      />
    </>
  );
}
