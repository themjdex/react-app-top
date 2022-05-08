import { HtmlHTMLAttributes, ReactNode, DetailedHTMLProps } from 'react';

export interface PProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	children: ReactNode;
	size?: 'small' | 'medium' | 'big';
}