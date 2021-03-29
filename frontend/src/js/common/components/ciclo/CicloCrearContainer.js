import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/ciclo/ciclo'
import CicloCrear from './CicloCrear';

//El estado
const ms2p = (state) => {
  return {
    ...state.ciclo,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(CicloCrear);
