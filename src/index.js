var isFSA = require('flux-standard-action').isFSA;
var isPlainObject = require('lodash.isplainobject');

var validKeys = ['type', 'payload', 'error', 'meta'];

function isInvalidKey (key) {
  return validKeys.indexOf(key) === -1;
}

module.exports = function (chai, utils) {
  var Assertion = chai.Assertion;

  /**
   * @memberof obj
   * @name FSA
   * @readonly
   * @desc Asserts that obj is a Flux Standard Action.
   * @example
   * expect(obj).to.be.an.FSA;
   * @example
   * obj.should.be.an.FSA;
   * */
  Assertion.addProperty('FSA', function () {
    var action = this._obj;
    if (utils.flag(this, 'negate')) {
      this.assert(
        isFSA(action),
        'expected #{this} to be a Flux Standard Action',
        'expected #{this} to not be a Flux Standard Action'
      );
    } else {
      var self = new Assertion(action);
      self.assert(isPlainObject(action), 'expected #{this} to be an FSA but it is not a plain object');
      self.assert(typeof action.type !== 'undefined', 'expected #{this} to be an FSA but its type property is #{act}', '', null, action.type);
      var invalidKeys = Object.keys(action).filter(isInvalidKey);
      var invalidKeyPhrase = invalidKeys.length === 1 ? 'an invalid key' : 'invalid keys';
      self.assert(invalidKeys.length === 0, 'expected #{this} to be an FSA but it has ' + invalidKeyPhrase + ': #{act}', '', null, invalidKeys);
    }
  });
};
