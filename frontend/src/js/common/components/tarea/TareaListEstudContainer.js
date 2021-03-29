import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/tarea/tarea'
import TareaListEstudiante from './TareaListEstudiante';
//El estado
const ms2p = (state) => {
  return {
    ...state.tarea,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(TareaListEstudiante);
