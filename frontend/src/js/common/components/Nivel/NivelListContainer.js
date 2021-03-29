import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/config/configuracion'
import NivelList from './NivelList';

//El estado
const ms2p = (state) => {
  return {
    ...state.configuracion,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(NivelList);
