import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/curso/curso'
import CursoList from './CursoList';

//El estado
const ms2p = (state) => {
  return {
    ...state.curso,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(CursoList);
