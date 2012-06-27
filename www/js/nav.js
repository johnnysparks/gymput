/**
 * Site Navigation Methods
 *  - nextPage-> switches to the next page
 *  - prevPage-> move one page back
 *  - updateProgress-> updates the progress bar
 **/
var nav = {
  nextPage:function() {
    $('input').blur();
    curr_page = $('fieldset:visible');
    next_page = curr_page.next('fieldset');
    if(next_page.length) {
      curr_page.hide();
      next_page.show();
      this.updateProgress();
    }
  },
  prevPage: function() {
    $('input').blur();
    curr_page = $('fieldset:visible');
    prev_page = curr_page.prev('fieldset');
    if(prev_page.length) {
      curr_page.hide();
      prev_page.show();
      this.updateProgress();
    }
  },

  /**
   * Update Progress
   *  Calculate the fraction of pages complete
   *  Then update the progressbar, and if the user reaches the final page,
   *  submit the form to mongo.
   **/
  updateProgress: function() {
    var _this = this;
    var progress = 100 * $('fieldset:visible').index('fieldset') / ($('fieldset').length-1);

    $('#progress').progressbar({value: progress});
    $('#date').val( parseInt( new Date().getTime() / 1000 , 10) );

    if( progress > 90 ){
      // builds a json object from the form
      var new_user_form = util.form2json('form');

      console.log( new_user_form );

      // updates mongodb with the new data
      mongo.insert( new_user_form, function(){
        // clear the form after insert
        _this.clear_form_elements('form');
        mongo.getAll(function( docs ){
          console.log( docs );
          // convert the docs to a csv file
          var csv  = util.json2csv(docs);
          var pros = util.prettyUser( new_user_form );
          util.emailUpdates(pros, csv);
        });
      });        
    }
  },

  /**
   * Empty the form
   *  Clears out all form elements
   **/
  clear_form_elements: function(ele) {
    $(ele).find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
  }
};
