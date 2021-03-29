import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/estudiante/estudiante'
import EstudianteCrear from './EstudianteCrear';

//El estado
const ms2p = (state) => {
  return {
    ...state.estudiante,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(EstudianteCrear);
