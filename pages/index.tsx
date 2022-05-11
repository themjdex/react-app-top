import { useState } from 'react';
import { Button, P, Rating, Tag, Htag, Input, Textarea } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu }: HomeProps): JSX.Element {
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
      <Input placeholder='ntcvn'/>
      <Textarea placeholder='Введите ваш текст'/>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}