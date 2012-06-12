describe('Util', function() {
  describe('form2json', function() {
    it('converts an empty form', function() {
      loadFixtures('empty_form.html');
      expect(util.form2json('form')).toEqual({});
    });
    it('converts a form with text and hidden inputs', function() {
      loadFixtures('simple_text.html');
      expect(util.form2json('form')).toEqual({
        foo: "bar", hidden_foo: "hidden_bar"
      });
    });
    it('converts a form with two radio button groups', function() {
      loadFixtures('radio_group.html');
      expect(util.form2json('form')).toEqual({
        group: "a", group2: "b"
      });
    });
    it('includes all checked values', function() {
      loadFixtures('checkboxes.html');
      expect(util.form2json('form')).toEqual({
        group: ["a", "b", "c"], group2: ["a", "b"]
      });
    });
  });
});
