// interface Functor {
//   map: <A, B>(f: (a: A) => B, fa: ?) => ?;
// }

import { HKT } from "./hkt";

export interface Functor<F> {
  map: <A, B>(f: (a: A) => B, fa: HKT<F, A>) => HKT<F, B>;
}
