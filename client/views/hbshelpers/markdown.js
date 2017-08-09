const showdown = require('showdown');

const converter = new showdown.Converter();

module.exports = (context) => {
  const html = converter.makeHtml(context);
  return html;
};
