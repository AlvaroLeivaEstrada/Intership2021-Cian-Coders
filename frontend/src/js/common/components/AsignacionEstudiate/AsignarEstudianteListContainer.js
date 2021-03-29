import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/asignacion/asignacionEstudiante'
import AsignarEstudianteList from './AsignarEstudianteList';

//El estado
const ms2p = (state) => {
  return {
    ...state.AsigEstud,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(AsignarEstudianteList);
