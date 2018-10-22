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
  },
  select: function(selected, options) {
    return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace( new RegExp('>' + selected + '</option>'), 'selected="selected"$&');
  },
  editIcon: function(storyUser, loggedUser, storyId, floating = true) {
    if(storyUser = loggedUser) {
      if(floating) {
        return `<a href='/stories/edit/${storyId}' class='btn-floating halfway-fab red'><i class='fa fa-pencil'></i></a>`;
      } else {
        return `<a href='/stories/edit/${storyId}'><i class='fa fa-pencil'></i></a>`;
      }
    } else {
        return '';
    }
  }
}