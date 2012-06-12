var util = {
  form2json: function (formSelector) {
    result = {};
    $(formSelector).find('input').each(function() {
      type  = $(this).attr('type');
      name  = $(this).attr('name');
      value = $(this).val();

      if(type === 'checkbox') {
        if($(this).attr('checked')) {
          if(name in result) {
            result[name].push(value);
          } else {
            result[name] = [value];
          }
        }
      } else {
        result[name] = value;
      }
    });
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
    // this method will break if fields contain doublequotes
    var json = json || [{"name":"joe","test":"clear","phone":"1234","email":"jklh@afdoh","address":['one','two','thre fishx']},{"name":"joe","phone":"1234","email":"jklh@afdoh","address":"hjl1234"},{"name":"joe","phone":'12" moblacd"34',"email":"jklh@afdoh","address":"hjl1234"},{"name":"joe","phone":"1234","email":"jklh@afdoh","address":"hjl1234"},{"name":"joe","phone":"1234","email":"jklh@afdoh","address":"hjl1234"},{"name":"joe","phone":"1234","email":"jklh@afdoh","address":"hjl1234"},{"name":"joe","phone":"1234","email":"jklh@afdoh","address":"hjl1234"},{"name":"joe","phone":"1234","email":"jklh@afdoh","other":"otherresult","address":"hjl1234"}];
    var fields  = [];
    var csv     = [];
    var row     = false;
    if( typeof(json) == "object" && !(json instanceof Array) ){
      fields = this.parallelize( json ).keys;
      csv    = this.parallelize( json ).values;
    } else if (json instanceof Array){
      for( row in json ){
        fields = this.arrayUnique( fields, this.parallelize(json[row]).keys );
      }
      for( row in json ){ csv.push([]);
        for( col in fields ){
          if( fields[col] in json[row] ){
            if( json[row][fields[col]] instanceof Array ){
              json[row][fields[col]] = json[row][fields[col]].join(', ');
            }
            csv[csv.length-1].push(json[row][fields[col]].replace(/('|")/g, "'"));
          } else {
            csv[csv.length-1].push("");
          }
        }
      }
      fields = '"'+ fields.join('","') +'"';

      for( i in csv ){
        csv[i] = csv[i].join('","');
      }
      csv   = '"'+ csv.join('"\n"') +'"';
      return fields + '\n' + csv;
    }

  },

  parallelize: function( obj ){
    var keys   = [];
    var values = [];
    for( var k in obj ){
      keys.push(k);
      values.push(obj[k]);
    }
    return {'keys' : keys, 'values': values };
  },

  arrayUnique: function( arr , otherArray ){
    var keyify = {};
    for( var k in arr ){
      keyify[ arr[k] ] = 1;
    }
    if( otherArray ){
      for( var k in otherArray ){
        keyify[ otherArray[k] ] = 1;
      }
    }
    return this.parallelize( keyify ).keys;
  },

  bind: function(scope, fn) {
    return function () { fn.apply(scope, arguments); }
  }
};
