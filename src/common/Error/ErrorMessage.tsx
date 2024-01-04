type ErrorMessageProps = {
  text: string;
  noMargin?: boolean;
};

export default function ErrorMessage({ text, noMargin }: ErrorMessageProps) {
  return (
    <p className={`text-red-500 text-left w-full ${noMargin || 'lg:ml-52'}`}>
      {text}
    </p>
  );
}
