import { INIT, CALCULATE, APPEND } from '../actions/CalculatorActions';

export const resultHandlerFromAppend = (prevResult, toAppend) => {
  const lastChar = prevResult.length - 1 || '';
  return isNaN(prevResult.charAt(lastChar)) && isNaN(toAppend)
    ? prevResult.substr(0, lastChar) + toAppend
    : prevResult + toAppend;
};

export const resultHandlerFromInit = toAppend => {
  return isNaN(toAppend) ? 0 : toAppend;
};

export const resultHandlerFromCalculate = (prevResult, toAppend) => {
  return isNaN(toAppend) ? prevResult + toAppend : toAppend;
};

export const resultHandler = (prevState, toAppend) => {
  let result = 0;
  /* eslint-disable default-case */
  switch (prevState.type) {
    case CALCULATE:
      result = resultHandlerFromCalculate(prevState.result, toAppend);
      break;
    case APPEND:
      result = resultHandlerFromAppend(prevState.result, toAppend);
      break;
    case INIT:
      result = resultHandlerFromInit(toAppend);
      break;
  }
  /* eslint-enable default-case */

  return result;
};
