import { FieldError } from 'react-hook-form';
import { HtmlHTMLAttributes, DetailedHTMLProps } from 'react';

export interface RatingProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isEditable?: boolean;
	rating: number;
	setRating?: (rating: number) => void;
	error?: FieldError;
}