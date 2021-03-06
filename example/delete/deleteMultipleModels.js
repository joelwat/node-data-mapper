'use strict';

const MySQLDriver = require('node-data-mapper-mysql').MySQLDriver;
const driver      = new MySQLDriver(require('../bikeShopConOpts.json'));

driver
  .initialize()
  .then(runQuery)
  .then(printResult)
  .catch(console.error)
  .finally(() => driver.end());

function runQuery(dataContext) {
  // Delete a bonus record and two staff records by ID.
  const query = dataContext
    .delete({
      bonuses: {
        bonusID: 3
      },
      staff: [
        {
          staffID: 1
        },
        {
          staffID: 3
        }
      ]
    });

  console.log('Query:');
  console.log(query.toString(), '\n');

  return query
    .execute();
}

function printResult(result) {
  console.log('Result:');
  console.log(result);
}

