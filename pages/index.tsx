import { useState } from 'react';
import { Button, P, Rating, Tag, Htag } from '../components';
import { withLayout } from '../layout/Layout';


function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  
  

  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button>
      <P size='big'>fn;jsdlhafns;ldjfnasdfn</P>
      <P size='medium'>fn;jsdlhafns;ldjfnasdfn</P>
      <P size='small'>fn;jsdlhafns;ldjfnasdfn</P>
      <Tag size='m' color='red'>Mal</Tag>
      <Tag size='m' color='green'>Green</Tag>
      <Tag color='primary'>PPPPP</Tag>
      <Rating isEditable rating={rating} setRating={setRating}/>
    </>
  );
}

export default withLayout(Home);