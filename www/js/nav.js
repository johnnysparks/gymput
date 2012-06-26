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
    var progress = 100 * $('fieldset:visible').index('fieldset') / ($('fieldset').length-1);

    $('#progress').progressbar({value: progress});

    if( progress > 90 ){
      new_user_form = util.form2json('form');
      mongo.insert( new_user_form, function(o){ console.log(o); } );        
      this.clear_form_elements('form');
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
