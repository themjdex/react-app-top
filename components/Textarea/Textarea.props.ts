import { FieldError } from 'react-hook-form';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	error?: FieldError;
}