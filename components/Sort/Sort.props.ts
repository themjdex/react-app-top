import { HtmlHTMLAttributes, DetailedHTMLProps } from 'react';

export interface SortProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	sort: SortEnum;
	setSort: (sort: SortEnum) => void;
}

export enum SortEnum {
	Rating,
	Price
}