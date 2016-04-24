import $ from 'jquery';

let slogan = __DEV__ ? 'Webpack rocks right?' : 'Hello visitor!';

let status = (test) => test ? 'ON' : 'OFF';

$('body').html(`
               <h1>${slogan}</h1>
               <p>Dev: ${status(__DEV__)}</p>
               <p>Test: ${status(__TEST__)}</p>
`);
