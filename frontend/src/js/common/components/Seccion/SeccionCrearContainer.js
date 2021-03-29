import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/seccion/seccion'
import SeccionCrear from './SeccionCrear';

//El estado
const ms2p = (state) => {
  return {
    ...state.seccion,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(SeccionCrear);
