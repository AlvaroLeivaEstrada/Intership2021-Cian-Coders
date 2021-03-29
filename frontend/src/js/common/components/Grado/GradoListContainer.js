import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/config/configuracion'
import GradoList from './GradoList';

//El estado
const ms2p = (state) => {
  return {
    ...state.configuracion,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(GradoList);
