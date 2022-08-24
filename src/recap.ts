/* eslint-disable @typescript-eslint/no-unused-vars */
const myName = 'Nicolas';
const myAge = 12;

const suma = (a: number, b: number) => {
  return a + b;
};

suma(12, 23);

class Persona {
  constructor(private age: number, private name: string) {}

  getSummary() {
    return `My name is ${this.name}, ${this.age}`;
  }
}

const braian = new Persona(24, 'Braian');
braian.getSummary();
