import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/cuenta/newPassword';
import Register from './Register';


const ms2p = (state) => {
  return {
    ...state.newPassword,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Register);
