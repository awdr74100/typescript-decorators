function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(selector: string, template: string) {
  return function (constructor: any) {
    const { name } = new constructor();

    const el = document.querySelector(selector);
    if (el) {
      el.innerHTML = template.replace('{{ name }}', name);
    }
  };
}

// @Logger('LOGGING - PERSON')
@WithTemplate('#app', `<h1>{{ name }}'s Blog</h1>`)
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const person = new Person();

console.log(person);
