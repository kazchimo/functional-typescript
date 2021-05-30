interface Semigroup<A> {
  concat: (x: A, y: A) => A;
}

const strSemi: Semigroup<string> = {
  concat: (x: string, y: string) => x + y,
};

console.log(strSemi.concat("a", "b"));

type Book = {
  name: string;
  page: number;
};

const bookSemi: Semigroup<Book> = {
  concat: (x: Book, y: Book) => ({
    name: x.name + "/" + y.name,
    page: x.page + y.page,
  }),
};

console.log(
  bookSemi.concat({ name: "animal", page: 100 }, { name: "dict", page: 200 })
);

interface ToString<A> {
  toString: (a: A) => string;
}

const show =
  <A>(instance: ToString<A>) =>
  (a: A) =>
    console.log(instance.toString(a));

type Dog = {
  name: string;
};

type Person = {
  firstName: string;
  lastName: string;
};

const dogToString: ToString<Dog> = {
  toString: (a) => a.name,
};

const personToString: ToString<Person> = {
  toString: (a) => a.firstName + " " + a.lastName,
};

show(dogToString)({ name: "john" });
show(personToString)({ firstName: "taro", lastName: "tanaka" });

const nullToString: ToString<null> = {
  toString: (a: null) => "null",
};

show(nullToString)(null);

// interface ToString {
//   toString(): string;
// }
//
// class Dog implements ToString {
//   name: string;
//
//   constructor(name: string) {
//     this.name = name;
//   }
//
//   toString(): string {
//     return this.name;
//   }
// }
//
// class Person implements ToString {
//   firstName: string;
//   lastName: string;
//
//   constructor(firstName: string, lastName: string) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }
//
//   toString(): string {
//     return this.firstName + " " + this.lastName;
//   }
// }
//
// const show = <A extends ToString>(a: A) => console.log(a.toString());
//
// show(new Dog("john"));
// show(new Person("taro", "tanaka"));
// show(null);

const add = (as: number[]) => as.reduce((a, b) => a + b, 0);

console.log(add([1, 2, 3]));

// const addGeneric = <A>(as: A[]) => as.reduce((a, b) => a + b, ?)

interface Monoid<A> {
  empty: A;
  concat: (a: A, b: A) => A;
}

const numberMonoid: Monoid<number> = {
  empty: 0,
  concat: (a, b) => a + b,
};

const dogMonoid: Monoid<Dog> = {
  empty: { name: "" },
  concat: (a, b) => ({
    name: a.name + "/" + b.name,
  }),
};

const sumGeneric =
  <A>(mon: Monoid<A>) =>
  (as: A[]) =>
    as.reduce(mon.concat, mon.empty);

console.log(sumGeneric(numberMonoid)([1, 2, 3]));
console.log(sumGeneric(dogMonoid)([{ name: "big" }, { name: "john" }]));
