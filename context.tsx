import * as React from 'react';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { SetState } from './types';

export function ezyContext<T>(defaultValue: T) {
  const Context = createContext(defaultValue);
  return [Context.Provider, () => useContext(Context)] as const;
}

export function stateContext<T>(defaultValue: T) {
  const [ValueProvider, useValue] = ezyContext(defaultValue);
  // @ts-ignore
  const [SetValueProvider, useSetValue] = ezyContext<SetState<T>>();
  const ContextControlled = ({ value, setValue, children }: PropsWithChildren<{
    value: T;
    setValue: SetState<T>;
  }>) => <ValueProvider value={value}>
    <SetValueProvider value={setValue}>{children}</SetValueProvider>
  </ValueProvider>;

  function Context(props: PropsWithChildren) {
    const [value, setValue] = useState(defaultValue);
    return <ContextControlled value={value} setValue={setValue} {...props} />;
  }
  return [useValue, useSetValue, ValueProvider, SetValueProvider, ContextControlled, Context] as const;
}