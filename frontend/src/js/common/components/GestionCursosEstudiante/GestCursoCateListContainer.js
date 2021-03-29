import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/GestionCursosEstud/GestionCursosCated'
import GestCursosList from './GestCursoList';

//El estado
const ms2p = (state) => {
  return {
    ...state.gestCursosEstud,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(GestCursosList);
