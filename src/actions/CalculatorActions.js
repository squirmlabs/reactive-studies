export const CALCULATE = 'Calculate';
export const INIT = 'InitCalculate';
export const APPEND = 'AppendValue';

export function calculate() {
  return {
    type: CALCULATE
  };
}

export function reset() {
  return {
    type: INIT,
    result: 0
  };
}

export function appendValue(value) {
  return {
    type: APPEND,
    result: value
  };
}
