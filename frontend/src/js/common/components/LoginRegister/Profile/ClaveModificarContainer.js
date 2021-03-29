import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/cuenta/login';
import ClaveModificar from './ClaveModificar';

//El estado
const ms2p = (state) => {
  return {
    ...state.login,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(ClaveModificar);
