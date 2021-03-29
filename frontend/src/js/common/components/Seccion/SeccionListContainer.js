import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/seccion/seccion'
import SeccionList from './SeccionList';

//El estado
const ms2p = (state) => {
  return {
    ...state.seccion,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(SeccionList);
