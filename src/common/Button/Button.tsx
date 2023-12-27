type Button = {
  buttonText: string;
  onClick?: () => void;
  maxWidth?: string;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  buttonText,
  onClick,
  maxWidth,
  type,
}: Button) {
  return (
    <button
      className={`bg-cyan-500 pl-4 pr-4 h-10 rounded ${maxWidth} text-white max-w-xs`}
      onClick={onClick}
      type={type || 'button'}
    >
      {buttonText}
    </button>
  );
}
