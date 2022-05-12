import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import CrossIcon from './cross.svg';
import cn from 'classnames';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError('Что-то пошло не так');
			}
		} catch (e: any) {
			setError(e.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}
				{...props}>
				<Input 
					{...register('name', {required: {value: true, message: 'Заполните имя'}})} 
					placeholder='Имя'
					error={errors.name}/>
				<Input 
					{...register('title', {required: {value: true, message: 'Введите заголовок'}})} 
					className={styles.title} 
					placeholder='Заголовок отзыва'
					error={errors.title}/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller 
						control={control}
						rules={{required: {value: true, message: 'Поставьте оценку'}}}
						name='rating'
						render={({field}) => (
							<Rating 
								isEditable 
								rating={field.value} 
								ref={field.ref} 
								setRating={field.onChange}
								error={errors.rating} />
						)}>
					</Controller>				
				</div>
				<Textarea {...register('description', {required: {value: true, message: 'Введите текст отзыва'}})} 
					placeholder='Текст отзыва' 
					className={styles.description}
					error={errors.description} />
				<div className={styles.submit}>
					<Button appearance='primary'>Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccess && <div className={cn(styles.success, styles.panel)}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div>
					Спасибо, ваш отзыв будет опубликован после проверки.
				</div>
				<CrossIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
			</div>}
			{error && <div className={cn(styles.error, styles.panel)}>
				Что-то пошло не так, попробуйте обновить страницу
				<CrossIcon className={styles.close} onClick={() => setError(undefined)}/>
			</div>}
		</form>
	);
};