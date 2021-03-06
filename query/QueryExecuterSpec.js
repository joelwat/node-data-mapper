describe('QueryExecucter()', function() {
  'use strict';

  const insulin       = require('insulin');
  const QueryExecuter = insulin.get('ndm_QueryExecuter');
  let   qe;

  beforeEach(() => qe = new QueryExecuter());

  describe('.select()', function() {
    it('is not implemented.', function() {
      expect(function() {
        qe.select();
      }).toThrowError('QueryExecuter::select not implemented.');
    }); 
  });

  describe('.update()', function() {
    it('is not implemented.', function() {
      expect(function() {
        qe.update();
      }).toThrowError('QueryExecuter::update not implemented.');
    });
  });

  describe('.delete()', function() {
    it('is not implemented.', function() {
      expect(function() {
        qe.delete();
      }).toThrowError('QueryExecuter::delete not implemented.');
    });
  });

  describe('.insert()', function() {
    it('is not implemented.', function() {
      expect(function() {
        qe.insert();
      }).toThrowError('QueryExecuter::insert not implemented.');
    });
  });
});

