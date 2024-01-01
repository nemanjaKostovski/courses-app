import Button from '../../../../../../common/Button/Button';

type AuthorItem = {
  author: { id: string; name: string };
  onClickAdd: (authorId: string) => void;
  onClickDelete: () => void;
};

export default function AuthorItem({
  author,
  onClickAdd,
  onClickDelete,
}: AuthorItem) {
  return (
    <div className='flex items-baseline'>
      <p className='align-center w-40'>{author.name}</p>
      <Button
        type='button'
        buttonText='➕'
        background='bg-white'
        onClick={() => onClickAdd(author.id)}
      />
      <Button
        type='button'
        buttonText='🗑️'
        background='bg-white'
        onClick={onClickDelete}
      />
    </div>
  );
}
