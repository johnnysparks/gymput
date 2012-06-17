describe('Util', function() {
  describe('form2json', function() {
    it('converts an empty form', function() {
      loadFixtures('empty_form.html');
      expect(util.form2json('form')).toEqual({});
    });
    it('converts a form with a select box', function() {
      loadFixtures('select_box.html');
      expect(util.form2json('form')).toEqual({s:'a'});
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
    it('ignores unnamed inputs', function() {
      loadFixtures('unnamed.html');
      expect(util.form2json('form')).toEqual({});
    });
    it('handles fieldsets with mixed data', function() {
      loadFixtures('fieldsets.html');
      expect(util.form2json('form')).toEqual({
        foo: 'a', bar: '123', baz: ['x','y','z']
      });
    });
  });
  describe('json2csv', function() {
    it('converts a blank object', function() {
      expect(util.json2csv({})).toEqual('');
    });
    it('converts a simple object', function() {
      expect(util.json2csv({a:1,b:2})).toEqual("a,b\n1,2");
    });
    it('converts an array of simple objects', function() {
      expect(util.json2csv([{a:1,b:2}, {a:3,b:4}, {a:5,b:6}, {a:7,b:8}])).toEqual("a,b\n1,2\n3,4\n5,6\n7,8");
    });
    it('interpolates disparate objects', function() {
      expect(util.json2csv([{a:1,b:2}, {b:3,c:4}])).toEqual("a,b,c\n1,2,\n,3,4");
    });
    it('quotes commas in value', function() {
      expect(util.json2csv({a:','})).toEqual('a\n","');
    });
    it('quotes commas in key', function() {
      expect(util.json2csv({'a,b':1})).toEqual('"a,b"\n1');
    });
    it('quotes quotes in value', function() {
      expect(util.json2csv({a:'"hello", world'})).toEqual('a\n"\\"hello\\", world"');
    });
    it('quotes quotes in key', function() {
      expect(util.json2csv({'a "b"':1})).toEqual('"a \\"b\\""\n1');
    });
    it('includes array values', function() {
      expect(util.json2csv({a:[1,2,3]})).toEqual('a\n"1,2,3"');
    });
    it('fixes dangerous array values', function() {
      expect(util.json2csv({a:[',','"']})).toEqual('a\n"\\",\\",\\"\\\\"\\""');
    });
    it('interpolates disparate objects with commas in keys', function() {
      expect(util.json2csv([{"a,b":1}, {"b,c":2}])).toEqual('"a,b","b,c"\n1,\n,2');
    });
  });
});
