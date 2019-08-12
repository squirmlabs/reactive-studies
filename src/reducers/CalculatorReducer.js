import * as mathjs from 'mathjs';
import { CALCULATE, INIT, APPEND, reset } from '../actions/CalculatorActions';
import { resultHandler } from '../utils/ResultHandler';

const calculation = (state = reset(), action) => {
  switch (action.type) {
    case CALCULATE:
      return {
        type: action.type,
        result: mathjs.evaluate(state.result)
      };

    case APPEND:
      return {
        type: action.type,
        result: resultHandler(state, action.toAppend)
      };

    case INIT:
      return {
        type: action.type,
        result: resultHandler(state, action.toAppend)
      };

    default:
      return state;
  }
};

export default calculation;
