import { HtmlHTMLAttributes, ReactNode, DetailedHTMLProps } from 'react';

export interface TagProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
	size?: 's' | 'm';
	color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary';
	href?: string;
}