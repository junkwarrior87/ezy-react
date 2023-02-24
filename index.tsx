import * as React from 'react';
import { KeyboardEvent } from 'react';
import { propagateRef } from './ref';
import { TSXRef } from './types';

export * from './context';
export * from './hooks';
export * from './ref';
export * from './types';


export interface OnChange {
  onChange(value: string): void;
}
const ezyChange = <T extends OnChange>({ onChange, ...props }: T) =>
  ({ onChange: (e: { target: { value: string } }) => onChange(e.target.value), ...props });

export type InputProps = TSXRef<'input', {
  onEnter?: (value: string, element: HTMLInputElement, event: KeyboardEvent<HTMLInputElement>) => void;
} & OnChange>;
export const Input = propagateRef(({ onEnter, ...props }: InputProps) => <input onKeyDown={onEnter && (e => {
  const { key, currentTarget } = e;
  key === 'Enter' && onEnter(currentTarget.value, currentTarget, e);
})} {...ezyChange(props)} />);

export type TextareaProps = TSXRef<'textarea', OnChange>;
export const Textarea = propagateRef((props: TextareaProps) => <textarea {...ezyChange(props)} />);

export type SvgProps = TSXRef<'svg', {
  width: number | string;
  height: number | string;
}>;
export const Svg = propagateRef(({ width, height, ...props }: SvgProps) =>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} {...props} />);