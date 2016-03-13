describe('Delete test suite.', function()
{
  'use strict';

  var Delete       = require('./Delete');
  var Database     = require('../database/Database');
  var MySQLEscaper = require('./MySQLEscaper');
  var db           = new Database(require('../spec/testDB'));
  var escaper      = new MySQLEscaper();
  var qryExec;

  beforeEach(function()
  {
    qryExec = jasmine.createSpyObj('qryExec', ['delete']);
  });

  describe('Delete constructor test suite.', function()
  {
    // Checks the basic constructor.
    it('checks the basic constructor.', function()
    {
      new Delete(db, escaper, qryExec, {});
    });

    // Checks the basic getters.
    it('checks the basic getters.', function()
    {
      var del = new Delete(db, escaper, qryExec, {});

      expect(del.getDatabase()).toBe(db);
      expect(del.getEscaper()).toBe(escaper);
      expect(del.getQueryExecuter()).toBe(qryExec);
    });

    // Checks that the primary key for each model is required.
    it('checks that the primary key for each model is required.', function()
    {
      expect(function()
      {
        new Delete(db, escaper, qryExec, {users: {ID: 1}});
      }).not.toThrow();

      expect(function()
      {
        new Delete(db, escaper, qryExec, {users: {firstName: 'Joe'}});
      }).toThrowError('Primary key not provided on model users.');
    });
  });
});
