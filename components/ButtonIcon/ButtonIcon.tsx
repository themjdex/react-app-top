import styles from './ButtonIcon.module.css';
import cn from 'classnames';
import { ButtonIconProps, icons } from './ButtonIcon.props';

export const ButtonIcon = ({ appearance, icon, className, ...props }: ButtonIconProps): JSX.Element => {
	const IconComp = icons[icon];

	return (
		<button className={cn(styles.button, className, {
			[styles.primary]: appearance == 'primary',
			[styles.white]: appearance == 'white',
		})}
			{...props}
		>
			<IconComp />
		</button>
	);
};