type Button = {
  buttonText: string;
  onClick?: VoidFunction;
};

export default function Button({ buttonText, onClick }: Button) {
  return (
    <button
      className='bg-cyan-500 p-2 pl-4 pr-4 h-10 rounded text-white max-w-xs'
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
