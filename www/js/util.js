var util = {
  form2json: function (formSelector) {
    var result = {};
    $(formSelector).find('input[type="text"],input[type="hidden"],input[type="radio"]:checked,select').each(function() {
      result[$(this).attr('name')] = $(this).val();
    });
    $(formSelector).find('input[type="checkbox"]:checked').each(function() {
      var name  = $(this).attr('name');
      var value = $(this).val();
      if(name in result) {
        result[name].push(value);
      } else {
        result[name] = [value];
      }
    });
    delete result[undefined]; // remove values for unnamed inputs
    return result;
  },

  print: function( string ){
    var i, message = '<p style="font-family: Monaco; color: #5e7d00; padding: 10px 0 0 20px; margin: 0px;">';
    if( typeof string == "string") message += string;
    else {
      for( i in string ) message += String(string[i]);
    }
    message += '</p>';
    $('body').append( message ) ;
  },
  
  json2csv: function( json ){
    var escape = function(cell) {
      cell = cell || '';
      if(cell instanceof Array) {
        cell = $.map(cell, escape);
      }
      cell = cell.toString();
      if(cell.match(/[,"]/)) { cell = '"' + cell.replace(/"/g, '\\"') + '"'; }
      return cell;
    };
    var row = function(obj) {
      var result = [];
      for(var i in columns) {
        result.push(escape(obj[columns[i]]));
      }
      return result.join(',');
    };

    var columns = Object.keys(
      json instanceof Array ? $.extend.apply($, [{}].concat(json)) : json
    );
    var csv = [ $.map(columns, escape).join(',') ];
    if(typeof(json) == "object" && !(json instanceof Array)) {
      csv.push(row(json));
    } else if(json instanceof Array) {
      csv = csv.concat($.map(json, row));
    }
    return columns.length > 0 ? csv.join("\n") : ''
  },

  bind: function(scope, fn) {
    return function () { fn.apply(scope, arguments); }
  }
};
