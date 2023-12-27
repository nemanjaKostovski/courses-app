import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input.tsx/Input';
import { ChangeEvent, useState } from 'react';

const BUTTON_TEXT = 'SEARCH';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='flex mt-10 mb-10'>
      <Input
        type='text'
        placeholder='input text'
        value={searchQuery}
        onChange={handleInputChange}
        name='search'
      />
      <Button buttonText={BUTTON_TEXT} />
    </div>
  );
}
