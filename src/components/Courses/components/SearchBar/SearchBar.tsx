import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input.tsx/Input';

const BUTTON_TEXT = 'SEARCH';

export default function SearchBar() {
  return (
    <div className='flex mt-10 mb-10'>
      <Input type='text' placeholder='input text' />
      <Button buttonText={BUTTON_TEXT} />
    </div>
  );
}
