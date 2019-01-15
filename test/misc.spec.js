import { delay, waitFor, listToMap, sprintf } from "../src/mpa-common-library/utils/_misc.ts";

describe('delay', function() {
  it('delay 1s', function(done) {
    let a = 1
    delay(1000).then(_ => a = 2)
    expect(a).toEqual(1);
    setTimeout(_ => {
      expect(a).toEqual(2)
      done()
    }, 1000)
  });
});

describe('waitFor', function() {
  it('true on start', function(done) {
    let a = 1
    waitFor(() => true).then(_ => a = 2)
    setTimeout(_ => {
      expect(a).toEqual(2)
      done()
    }, 0)
  });

  it('default options', function(done) {
    let a = 1
    let state = 0
    waitFor(() => state).then(_ => a = 2)
    setTimeout(_ => state = 1, 1000)
    setTimeout(_ => {
      expect(a).toEqual(2)
      done()
    }, 2000)
  });

  it('timeout', function(done) {
    let err = 0
    waitFor(() => false, {
      timeout: 1000
    }).catch(_ => {
      err = 1
    })
    setTimeout(_ => {
      expect(err).toEqual(1)
      done()
    }, 1000)
  });

  it('at least', function(done) {
    let a = 1
    waitFor(() => true, {
      atLeast: 1000
    }).then( _ => a = 2)
    setTimeout(_ => {
      expect(a).toEqual(1)
      done()
    }, 500)
  });
});

describe('listToMap', function() {
  it('basic', function() {
    const list = [
      {key: 'a', value: 1},
      {key: 'b', value: 2},
      {key: 'c', value: 3},
    ]
    const map = listToMap(list, 'key')
    expect(JSON.stringify(map)).toEqual(JSON.stringify({
      a: {key: 'a', value: 1},
      b: {key: 'b', value: 2},
      c: {key: 'c', value: 3},
    }))
  });
});

describe('sprintf', function() {
  it('basic', function() {
    const str = sprintf('hell%1 worl%2', 'o', 'd')
    expect(str).toEqual('hello world')
  });
});