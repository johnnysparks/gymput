var util = {
  form2json: function (formSelector) {
    var result = {};
    $(formSelector).find('input[type="email"],input[type="text"],input[type="hidden"],input[type="radio"]:checked,select').each(function() {
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
    var i, message = '<p class="notify" style="font-size:12px; color: #5e7d00; padding: 10px 0 0 20px; margin: 0px;">';
    if( typeof string == "string") message += string;
    else {
      for( i in string ) message += String(string[i]);
    }
    message += '</p>';
    $('fieldset.complete').append( message ) ;
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
  },

  prettyUser: function( new_pros, delim){
    var delim = delim || "\n\n";
    var output = "";
    for(var key in new_pros ){
      if( new_pros[key] instanceof Array ){
        output += key +":\n" +new_pros[key].join(',')+delim;
      } else {
        output += key +":\n" +new_pros[key]+delim;
      }
    }
    return output;
  },
    
  emailUpdates: function( most_recent, attachment, callback){
    var callback = (typeof callback == "function") ? callback : console.log;
    $.ajax({
      url: 'http://gymput.com/sendemail', //'http://localhost:5000/sendemail', //
      type: 'post',
      data:{
        to:      'johnnyfuchs@gmail.com',
        from:    'johnny@daily.do',
        subject: 'Updated Prospect List',
        body:    most_recent,
        attName: 'prospects.csv',
        attBody: attachment
      },
      success: callback,
      error: console.log
    });
  },

  /**
   * Clears the form
   *  Allows the form to start again.
   **/
  resetForm: function(){
    $('p.notify').remove();
    $('form').find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'select':
            case 'text':
            case 'email':
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
  },
  notify: function(message){
    this.print(message);
  },
  submitProspect: function(){
    var _this = this;
    // builds a json object from the form
    var new_user_form = util.form2json('form');
    this.notify("Saving prospect: " + util.prettyUser( new_user_form, '<br />'));

    // local backup
    var filename = new_user_form.created + '.json';

    jfile.write( filename, new_user_form, function(o){
      _this.notify("Saved to iPad.");
    });

    // updates mongodb with the new data
    mongo.insert( new_user_form, function(o){
      _this.notify("Saved to remote database.");
      // clear the form after insert
      mongo.getAll(function( docs ){
        // convert the docs to a csv file
        var csv  = util.json2csv(docs);
        var pros = util.prettyUser( new_user_form );
        util.emailUpdates(pros, csv, function(){
          _this.notify("Notification sent.");
        });
      });
    });
  }
};
