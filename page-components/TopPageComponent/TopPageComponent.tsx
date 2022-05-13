import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortResucer } from './sort.reduser';
import { useScrollY } from '../../hooks/useScrollY';
import { useReducedMotion } from 'framer-motion';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {

	const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortResucer, {products, sort: SortEnum.Rating});

	const shouldReduceMotion = useReducedMotion();

	const y = useScrollY();

	const setSort = (sort: SortEnum) => {
		dispatchSort({type: sort});
	};

	useEffect(() => {
		dispatchSort({type: 'reset', initialState: products});
	}, [products]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h1'>{page.title}</Htag>
				{products && <Tag color='gray' size='m' aria-label={products.length + 'элементов'}>{products.length}</Tag>}
				<Sort sort={sort} setSort={setSort}/>
			</div>
			<div role='list'>
				{sortedProducts && sortedProducts.map(p => (<Product layout={shouldReduceMotion ? false : true} key={p._id} product={p} role='listitem' />))}
			</div>
			<div className={styles.hhTitle}>
				<Htag tag='h2'>Вакансии - {page.category}</Htag>
				{products && <Tag color='red' size='m'>hh.ru</Tag>}
			</div>
			{firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
			{page.advantages && page.advantages.length > 0 && <>
				<Htag tag='h2'>Преимущества</Htag>
				<Advantages advantages={page.advantages}/>
			</>}
			{page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}}></div>}
			<Htag tag='h2'>Получаемые навыки</Htag>
			{page.tags.map(t => <Tag key={t} color={'primary'}>{t}</Tag>)}
		</div>
	);
};