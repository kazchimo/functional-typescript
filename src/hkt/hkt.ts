export interface HKT<F, A> {
  _URI: F;
  _A: A;
}

export interface URI2HKT<A> {}

// all URIs
export type URIS = keyof URI2HKT<any>;

// given a URI and a type, extracts the corresponding type
export type Type<URI extends URIS, A> = URI2HKT<A>[URI];
