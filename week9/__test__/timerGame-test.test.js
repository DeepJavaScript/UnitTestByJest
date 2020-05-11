'use strict';

jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
  const timerGame = require('../js/timerGame');
  const callback = jest.fn();

  timerGame(callback);

  // Fast-forward until all timers have been executed
  jest.runAllTimers();

  // At this point in time, the callback should not have been called yet
  expect(callback).toBeCalled();
});