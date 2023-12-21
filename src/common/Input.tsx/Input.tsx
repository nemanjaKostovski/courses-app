type Input = {
  type: string;
  placeholder: string;
};

export default function Input({ type, placeholder }: Input) {
  return (
    <input
      className='w-80 h-10 p-1 mr-4'
      type={type}
      placeholder={placeholder}
    />
  );
}
