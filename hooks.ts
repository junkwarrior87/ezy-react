import { DependencyList, SetStateAction, useEffect, useState } from 'react';
import { Nullable, SetState } from './types';

export const useRawEffect = (effect: Function, deps?: DependencyList) => useEffect(() => void effect(), deps);
export const useMount = (mount: Function) => useRawEffect(mount, []);
export const useUnmount = (unmount: () => void) => useEffect(() => unmount, []);


export function getTimeoutActions<T>(setValue: SetState<T>, expireMs: number, defaultValue: T) {
  const reset = () => setValue(defaultValue);
  return [(value: SetStateAction<T>) => {
    setValue(value);
    setTimeout(reset, expireMs);
  }, reset] as const;
}

export function useTimeoutState<T>(expireMs: number, defaultValue: T) {
  const [value, setValue] = useState(defaultValue);
  return [value, ...getTimeoutActions(setValue, expireMs, defaultValue)] as const;
}

const _useTimeoutOptional = <T>(expireMs: number, defaultValue?: Nullable<T>) => useTimeoutState(expireMs, defaultValue);
export const useTimeoutOptional = useTimeoutState as typeof _useTimeoutOptional;


export function useClipboard(text: string, timeoutMs = 1500) {
  const [copied, setCopied] = useTimeoutState(timeoutMs, false);
  return [copied, async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }] as const;
}