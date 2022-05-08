import { PProps } from './P.props';
import styles from './P.module.css';
import cn from 'classnames';

export const P = ({ size = 'medium', children, className, ...props }: PProps): JSX.Element => {
	return (
		<p className={cn(styles.paragraph, className, {
			[styles.small]: size == 'small',
			[styles.medium]: size == 'medium',
			[styles.big]: size == 'big', 
		})}
			{...props}
		>
			{children}
		</p>
	);
};