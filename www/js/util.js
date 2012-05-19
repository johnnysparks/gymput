var util = {
  form2json: function (f) {
    result = {};
    $(f).find('input').each(function() {
      t = $(this).attr('type');
      n = $(this).attr('name');
      v = $(this).val();

      if(t === 'checkbox') {
        if($(this).attr('checked')) {
          if(n in result) {
            result[n].push(v);
          } else {
            result[n] = [v];
          }
        }
      } else {
        result[n] = v;
      }
    });
    return result;
  }
};
