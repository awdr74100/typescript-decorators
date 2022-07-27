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
