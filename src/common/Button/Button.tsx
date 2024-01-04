type Button = {
  buttonText: string;
  onClick?: () => void;
  maxWidth?: string;
  type?: 'button' | 'submit' | 'reset';
  background?: string;
};

export default function Button({
  buttonText,
  onClick,
  maxWidth,
  type,
  background,
}: Button) {
  return (
    <button
      className={`${
        background || 'bg-cyan-500'
      } pl-4 pr-4 h-10 rounded ${maxWidth} text-white max-w-xs mr-2`}
      onClick={onClick}
      type={type || 'button'}
    >
      {buttonText}
    </button>
  );
}
