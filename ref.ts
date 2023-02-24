import { FC, ForwardedRef, forwardRef, MutableRefObject, useRef } from 'react';
import { Nullable } from './types';

export const propagateRef = <T, P>(render: FC<P & { ref: ForwardedRef<T> }>) =>
  forwardRef<T, P>((props, ref) => render({ ...props, ref }));
export const ezyRef = <T>(callback: (el: T) => void) => (el?: Nullable<T>) => el && callback(el);

// export const useLateinitRef = <T>() => useRef<T>(null!);
export const useLateinitRef = useRef as <T>() => MutableRefObject<T>;