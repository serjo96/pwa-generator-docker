const i18n = require('i18n');
const register = {};
i18n.configure({
  locales: ['en', 'ru', 'de', 'tr', 'es', 'fr'],
  directory: 'locales',
  register
});

module.exports = function (method, arg) {
  try {
    return register[method](arg);
  } catch (error) {
    console.error(`Error in Handlebars: ${error}`);
  }
};
