import { connect } from 'react-redux';
import Calculator from '../components/calculator';
import { calculate, reset, appendValue } from '../actions/CalculatorActions';

const mapDispatchToProps = dispatch => {
  return {
    onButtonClicked: evt => {
      evt.preventDefault();
      let value = evt.target.innerHTML;
      manageDisplayState(value, dispatch);
    }
  };
};

const manageDisplayState = (value, dispatch) => {
  switch (value) {
    case 'AC':
      dispatch(reset());
      break;
    case '=':
      dispatch(calculate());
      break;
    case '+':
    case '-':
    case '/':
    case '*':
    case '.':
      dispatch(appendValue(value));
      break;
    default:
      dispatch(appendValue(value));
      break;
  }
};

const mapStateToProps = state => {
  return {
    result: state.result
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);
