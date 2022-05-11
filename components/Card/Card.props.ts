import { HtmlHTMLAttributes, ReactNode, DetailedHTMLProps } from 'react';

export interface CardProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
	color?: 'white' | 'blue';
}