function Logger(logString: string) {
  console.log('LOGGER FACTORY');
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(selector: string, template: string) {
  console.log('TEMPLATE FACTORY');
  return function (constructor: any) {
    console.log('Rendering template');
    const { name } = new constructor();

    const el = document.querySelector(selector);
    if (el) {
      el.innerHTML = template.replace('{{ name }}', name);
    }
  };
}

// @Logger('LOGGING - PERSON')
@Logger('LOGGING')
@WithTemplate('#app', `<h1>{{ name }}'s Blog</h1>`)
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const person = new Person();

console.log(person);

// ---

function logPropertyDecorator(target: any, propertyKey: string | symbol) {
  console.log('Property Decorator!', target, propertyKey);
}

function logAccessorDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  console.log('Accessor Decorator!', target, propertyKey, descriptor);
}

function logMethodDecorator(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) {
  console.log('Method Decorator!', target, propertyKey, descriptor);
}

function logParameterDecorator(
  target: any,
  propertyKey: string | symbol,
  parameterIndex: number,
) {
  console.log('Parameter Decorator!', target, propertyKey, parameterIndex);
}

class Product {
  @logPropertyDecorator
  title: string;
  private _price: number;

  @logAccessorDecorator
  set price(val: number) {
    if (val <= 0) throw new Error('Invalid price - should be positive!');
    this._price = val;
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @logMethodDecorator
  getPriceWithTax(@logParameterDecorator tax: number) {
    return this._price * (1 + tax);
  }
}
