import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';

const BUTTON_TEXT = 'LOGIN';

export default function Header() {
  return (
    <header className='flex items-center justify-between pl-10 pr-10 mt-2'>
      <Logo /> <Button buttonText={BUTTON_TEXT} />
    </header>
  );
}
