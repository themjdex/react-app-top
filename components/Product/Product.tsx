/* eslint-disable react/display-name */
import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { devlOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);

	const variants = {
		visible: {opacity: 1, height: 'auto'},
		hidden: {opacity: 0, height: 0}
	};

	const scrollToReview = (e: MouseEvent) => {
		e.preventDefault();
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		reviewRef.current?.focus({ preventScroll: true });
	};

	return (
		<div className={className} {...props} ref={ref}>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image 
						// src={process.env.NEXT_PUBLIC_DOMAIN + product.image} 
						// src={'http://cdn-bucket.hb.bizmrg.com/courses-top-images/2022-05-11/logo.png'} 
						src={/^https?:\/\//i.test(product.image) ? product.image : process.env.NEXT_PUBLIC_DOMAIN + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>
					{product.title}
				</div>
				<div className={styles.price}>
					<span><span className='visuallyHidden'>Цена</span> {priceRu(product.price)}</span>
					{product.oldPrice && <Tag className={styles.oldPrice} color='green'>
						<span className='visuallyHidden'>Скидка</span>
						{priceRu(product.price - product.oldPrice)}
						</Tag>}
				</div>
				<div className={styles.credit}>
					<span className='visuallyHidden'>Кредит</span>{priceRu(product.credit)}/<span className={styles.month}>мес</span>
				</div>
				<div className={styles.rating}>
					<span className='visuallyHidden'>{'Рейтинг' + product.reviewAvg ?? product.initialRating}</span>
					<Rating rating={product.reviewAvg ?? product.initialRating} />			
				</div>
				<div className={styles.tags}>
					{product.categories.map(c => <Tag key={c} color='ghost' className={styles.category}>{c}</Tag>)}		
				</div>
				<div className={styles.priceTitle} aria-hidden={true}>
					Цена
				</div>
				<div className={styles.creditTitle} aria-hidden={true}>
					Кредит
				</div>
				<div className={styles.rateTitle}>
					<a href='#ref' onClick={scrollToReview}>{product.reviewCount} {devlOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a>
				</div>
				<Divider className={styles.hr} />
				<div className={styles.description}>
					{product.description}
				</div>
				<div className={styles.features}>
					{product.characteristics.map(c => (
						<div className={styles.characteristics} key={c.name}>
							<span className={styles.characteristicName}>{c.name}</span>
							<span className={styles.characteristicDots}></span>
							<span className={styles.characteristicValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && <div className={styles.advantages}>
						<div className={styles.advTitle}>Преимущества</div>
						<div>{product.advantages}</div>
					</div>}
					{product.disAdvantages && <div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						<div>{product.disAdvantages}</div>
					</div>}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button 
						appearance='ghost' 
						arrow={isReviewOpened ? 'down' : 'right'} 
						className={styles.reviewButton}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
						aria-expanded={isReviewOpened}>
							Читать отзывы
					</Button>
				</div>
			</Card>
			<motion.div 
				animate={isReviewOpened ? 'visible' : 'hidden'} 
				variants={variants} 
				initial='hidden'>
					<Card 
						tabIndex={isReviewOpened ? 0 : -1} 
						color='blue' 
						ref={reviewRef} 
						className={cn(styles.reviews, {
							[styles.opened]: isReviewOpened,
							[styles.closed]: !isReviewOpened,
						})}>
							{product.reviews.map(r => (
								<div key={r._id}>
									<Review review={r} />
									<Divider />
								</div>
							))}
						<ReviewForm productId={product._id} isOpened={isReviewOpened}/>
					</Card>
			</motion.div>
		</div>
	);
}));