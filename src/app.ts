function Logger(logString: string) {
  console.log('LOGGER FACTORY');
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(selector: string, template: string) {
  console.log('TEMPLATE FACTORY');
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T,
  ) {
    console.log('TEMPLATE DECORATOR');
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();

        console.log('Rendering template');

        const el = document.querySelector(selector);
        if (el) el.innerHTML = template.replace('{{ name }}', this.name);
      }
    };
  };
}

// @Logger('LOGGING - PERSON')
@Logger('LOGGING')
@WithTemplate('#app', `<h1 class="text-center">{{ name }}'s Blog</h1>`)
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const person = new Person();

console.log(person);

// ---

function LogPropertyDecorator(target: any, propertyKey: string | symbol) {
  console.log('Property Decorator!', target, propertyKey);
}

function LogAccessorDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  console.log('Accessor Decorator!', target, propertyKey, descriptor);
}

function LogMethodDecorator(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) {
  console.log('Method Decorator!', target, propertyKey, descriptor);
}

function LogParameterDecorator(
  target: any,
  propertyKey: string | symbol,
  parameterIndex: number,
) {
  console.log('Parameter Decorator!', target, propertyKey, parameterIndex);
}

class Product {
  @LogPropertyDecorator
  title: string;
  private _price: number;

  @LogAccessorDecorator
  set price(val: number) {
    if (val <= 0) throw new Error('Invalid price - should be positive!');
    this._price = val;
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @LogMethodDecorator
  getPriceWithTax(@LogParameterDecorator tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product('Book 1', 19);
const p2 = new Product('Book 2', 29);

// Other Decorator Return Types

function Enumerable(value: boolean) {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

function Configurable(value: boolean) {
  return function (_: any, __: string, ___: PropertyDescriptor) {
    return { configurable: value };
  };
}

class Car {
  title: string;
  _price: number;

  @Configurable(false)
  set price(val: number) {
    if (val <= 0) throw new Error('...');
    this._price = val;
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @Enumerable(true)
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}

console.log(
  'Car descriptor price',
  Object.getOwnPropertyDescriptor(Car.prototype, 'price'),
);
console.log(
  'Car descriptor getPriceWithTax',
  Object.getOwnPropertyDescriptor(Car.prototype, 'getPriceWithTax'),
);
