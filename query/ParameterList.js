'use strict';

require('insulin').factory('ndm_ParameterList', ['ndm_ConditionError'], ndm_ParameterListProducer);

function ndm_ParameterListProducer(ConditionError) {
  /** A class that holds query parameters. */
  class ParameterList {
    /**
     * Initialize the list of parameters.
     * @param {ParameterList=} paramList - An option list of parameters to
     * copy.
     */
    constructor(paramList) {
      /**
       * An object containing key-value pairs, each of which is a query
       * parameter.
       * @type {Object}
       * @name ParameterList#params
       * @public
       */
      this.params = {};

      if (paramList) {
        this.addParameters(paramList.params);
        this._paramID = paramList._paramID;
      }
      else
        this._paramID = 0;
    }

    /**
     * Create a parameter name by replacing all non-word characters with
     * underscores and adding a unique ID at the end.
     * @param {string} key - The parameter key.
     * @return {string} The unique parameter name.
     */
    createParameterName(key) {
      return `${key.replace(/[^\w]/g, '_')}_${this._paramID++}`;
    }

    /**
     * Add a parameter to the list.
     * @param {string} key - The name of the parameter.
     * @param {any} value - The parameter value.
     * @param {boolean} [overwrite=false] - By default, an exception will be
     * raised if a parameter matching key already exists, and the value is
     * different.  If this flag is set to true, however, then parameters will
     * be blindly overwritten.
     * @return {this}
     */
    addParameter(key, value, overwrite=false) {
      if (!key.match(/^[A-Za-z][\w\-]*$/))
        throw new ConditionError('Parameter keys must match "/^[A-Za-z][\\w\\-]*$/".');

      if (this.params[key] !== undefined && this.params[key] !== value && !overwrite)
        throw new ConditionError(`Parameter "${key}" already exists with value "${this.params[key]}".`);

      this.params[key] = value;

      return this;
    }

    /**
     * Add parameters to the list.
     * @param {Object} params - An object containing key-value pairs.
     * @param {boolean} [overwrite=false] - Whether or not to blindly overwrite
     * existing parameters.
     * @return {this}
     */
    addParameters(params, overwrite=false) {
      for (let key in params) {
        this.addParameter(key, params[key], overwrite);
      }

      return this;
    }
  }

  return ParameterList;
}

