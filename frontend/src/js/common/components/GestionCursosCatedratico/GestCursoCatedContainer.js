import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/GestionCursosCated/GestionCursosCated'
import GestCursoCated from './GestCursosCated';

//El estado
const ms2p = (state) => {
  return {
    ...state.gestCursosCated,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(GestCursoCated);
