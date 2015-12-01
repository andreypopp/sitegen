import assert from 'power-assert';
import * as PromiseUtil from '../Promise';

describe('PromiseUtil', function() {

  describe('forEachSeq', function() {
    
    it('maps a Promise-returning function over an array sequentially', function(done) {
      let traceInvokations = [];
      let trace = [];
      let array = [1, 2, 3];
      let func = item => {
        traceInvokations.push(item);
        let timeout = 10 - item;
        return new Promise(resolve => setTimeout(() => {
          trace.push(item + 100);
          resolve()
        }, timeout));
      }
      PromiseUtil.forEachSeq(array, func)
        .then(() => {
          assert.deepEqual(trace, [101, 102, 103]);
          assert.deepEqual(traceInvokations, [1, 2, 3]);
          done();
        })
        .catch(done);
    });
  });

  describe('awaitCallback', function() {

    it('awaits a callback result as a promise', function(done) {
      function doAsync(cb) {
        setTimeout(function() {
          cb(null, 'OK');
        }, 10);
      }
      PromiseUtil.awaitCallback(doAsync)
        .then(result => {
          assert(result === 'OK');
          done();
        })
        .catch(done);;
    });

    it('awaits a callback error as a promise', function(done) {
      function doAsync(cb) {
        setTimeout(function() {
          cb(new Error('OK'));
        }, 10);
      }
      PromiseUtil.awaitCallback(doAsync)
        .then(result => {
          assert(false);
          done();
        })
        .catch(err => {
          assert(err.message === 'OK');
          done();
        });
    });
  });

});
