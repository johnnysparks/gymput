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
      return true;
    }
    return false;
  },
  prevPage: function() {
    $('input').blur();
    curr_page = $('fieldset:visible');
    prev_page = curr_page.prev('fieldset');
    if(prev_page.length) {
      curr_page.hide();
      prev_page.show();
      this.updateProgress();
      return true;
    }
    return false;
  },
  /**
   * Go directly to the homepage
   **/
  goHome: function(){
    $('fieldset').hide();
    $('fieldset:first').show();
    this.updateProgress();
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
      util.submitProspect();
    }
  }
};
