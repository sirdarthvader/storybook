const moment  = require('moment');

module.exports = {
  truncated: function(str, len) {
    if(str.length > 0 && str.length > len) {
      var newStr = str + ' ',
      newStr = str.substr(0, len);
      newStr = str.substr(0, newStr.lastIndexOf(' '));
      newStr = (newStr.length > 0) ? newStr : str.substr(0, len);
      return newStr + '...';
    }
    return str;
  },
  stripTags: function(input) {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  formatDate: function(date, format) {
    return moment(date).format(format);
  }
}