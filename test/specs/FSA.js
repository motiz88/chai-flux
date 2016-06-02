/* eslint-env mocha */
describe('FSA', () => {
  it('should pass for a simple action', () => {
    ({
      type: 'ADD_TODO',
      payload: {
        text: 'Do something.'
      }
    }).should.be.an.FSA;
  });
  it('should pass for a simple error action', () => {
    ({
      type: 'ADD_TODO',
      payload: new Error(),
      error: true
    }).should.be.an.FSA;
  });
  it('should pass with meta property added', () => {
    ({
      type: 'ADD_TODO',
      payload: new Error(),
      error: true,
      meta: 'blah'
    }).should.be.an.FSA;
  });
  it('should pass with only meta property', () => {
    ({
      type: 'ADD_TODO',
      meta: 'blah'
    }).should.be.an.FSA;
  });
  it('should fail if no type property', () => {
    ({}).should.not.be.an.FSA;
    ({
      payload: 'not good enough'
    }).should.not.be.an.FSA;
  });
  it('should fail if not a plain object', () => {
    let action = [];
    action.type = 'ADD_TODO';
    action.payload = 'no dice';
    action.should.not.be.an.FSA;
  });
  it('should fail if extra props present', () => {
    ({
      type: 'ADD_TODO',
      meta: 'blah',
      what: 'no'
    }).should.not.be.an.FSA;
  });
});
