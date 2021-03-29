import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/asignacion/asignacionEstudiante'
import AsignarEstudiante from './AsignarEstudiante';

//El estado
const ms2p = (state) => {
  return {
    ...state.AsigEstud,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(AsignarEstudiante);
