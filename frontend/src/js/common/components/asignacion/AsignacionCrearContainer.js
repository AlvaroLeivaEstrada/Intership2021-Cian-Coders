import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/asignacion/asignacion'
import AsignacionCrear from './AsignacionCrear';

//El estado
const ms2p = (state) => {
  return {
    ...state.asignacion,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(AsignacionCrear);
