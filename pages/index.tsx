import { Button, P, Tag } from '../components';
import { Htag } from '../components/Htag/Htag';


export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button>
      <P size='big'>fn;jsdlhafns;ldjfnasdfn</P>
      <P size='medium'>fn;jsdlhafns;ldjfnasdfn</P>
      <P size='small'>fn;jsdlhafns;ldjfnasdfn</P>
      <Tag size='m' color='red'>Mal</Tag>
      <Tag size='m' color='green'>Green</Tag>
      <Tag color='primary'>PPPPP</Tag>
    </div>
  );
}
