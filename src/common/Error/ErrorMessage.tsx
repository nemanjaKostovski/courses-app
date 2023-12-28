type ErrorMessageProps = {
  text: string;
};

export default function ErrorMessage({ text }: ErrorMessageProps) {
  return <p className='text-red-500 text-left w-full lg:ml-52'>{text}</p>;
}
