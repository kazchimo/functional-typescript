// // 値が何も無いことを表す
// export class None {
//   readonly tag: "None" = "None";
// }
//
// // 何かしらA型の値を保持していることを表す
// export class Some<A> {
//   readonly tag: "Some" = "Some";
//   constructor(readonly value: A) {}
// }
//
// export type Option<A> = None | Some<A>;
//
// export const none: Option<never> = new None();
//
// export const some = <A>(a: A): Option<A> => {
//   return new Some(a);
// };
//
// // Optionに対してのmap処理
// // Someとして中身がある場合には関数fを使用して値を変換する
// // Noneの場合には何もせずにそのままNoneを返す
// const map = <A, B>(f: (a: A) => B, fa: Option<A>): Option<B> => {
//   switch (fa.tag) {
//     case "None":
//       return fa;
//     case "Some":
//       return some(f(fa.value));
//   }
// };
//
const double = (n: number): number => n * 2;
const len = (s: string): number => s.length;
//
// console.log(map(double, some(1))); // Some { tag: 'Some', value: 2 }
// console.log(map(double, none)); // None { tag: 'None' }
// // console.log(map(len, some(2))); // <= static error: Type 'number' is not assignable to type 'string'
//

// Optionの識別子
import { Functor } from "../hkt";
import { HKT, Type, URI2HKT } from "./hkt";

export const URI = "Option";

export type URI = typeof URI;

export class None {
  readonly _URI!: URI;
  _A!: never;
  readonly tag: "None" = "None";
}

export class Some<A> {
  readonly _URI!: URI;
  _A!: A;
  readonly tag: "Some" = "Some";
  constructor(readonly value: A) {}
}

export type Option<A> = None | Some<A>;

export const none: Option<never> = new None();

export const some = <A>(a: A): Option<A> => {
  return new Some(a);
};

// const map = <A, B>(f: (a: A) => B, fa: Option<A>): Option<B> => {
//   switch (fa.tag) {
//     case "None":
//       return fa;
//     case "Some":
//       return some(f(fa.value));
//   }
// };
//
// const o: HKT<URI, string> = some("a");
//
// export const option: Functor<URI> = {
//   map,
// };
// error TS2322: Type '<A, B>(f: (a: A) => B, fa: Option<A>) => Option<B>' is not assignable to type '<A, B>(f: (a: A) => B, fa: HKT<"Option", A>) => HKT<"Option", B>'.
//   Types of parameters 'fa' and 'fa' are incompatible.
//     Type 'HKT<"Option", A>' is not assignable to type 'Option<A>'.
//       Type 'HKT<"Option", A>' is missing the following properties from type 'Some<A>': tag, value
//
// map,

const map = <A, B>(f: (a: A) => B, hfa: HKT<URI, A>): Option<B> => {
  const fa = hfa as Option<A>;
  switch (fa.tag) {
    case "None":
      return fa;
    case "Some":
      return some(f(fa.value));
  }
};

export const option: Functor<URI> = {
  map, // コンパイルが通る
};

const x = option.map(double, some(1)); // Hkt<"Option", number>

declare module "./hkt" {
  interface URI2HKT<A> {
    Option: Option<A>; // "Option"というリテラル型をOption<A>に紐付ける
  }
}

// const a: URI2HKT<number>["Option"] = some(1);
const a: Type<"Option", number> = some(1); // Option<number>
