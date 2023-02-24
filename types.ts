import { SetStateAction } from 'react';

export type Nullish = null | undefined;
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;
export type Optional<T> = T | Nullish;

export type ReplaceMerge<T, U> = Omit<T, keyof U> & U;


type X = JSX.IntrinsicElements;
type K = keyof X;
export type TSXRef<T extends K, U = {}> = ReplaceMerge<X[T], U & { ref: Exclude<X[T]['ref'], string> }>;
export type TSX<T extends K, U = {}> = Omit<TSXRef<T, U>, 'ref'>;
// export type TSXLegacyRef<T extends K, U = {}> = ReplaceMerge<X[T], U>;
// export type TSX<T extends K, U = {}> = Omit<TSXLegacyRef<T, U>, 'ref'>;
// export type TSXRef<T extends K, U = {}> = TSX<T, U> & { ref: Exclude<X[T]['ref'], string> };

export type SetState<T> = (value: SetStateAction<T>) => void;