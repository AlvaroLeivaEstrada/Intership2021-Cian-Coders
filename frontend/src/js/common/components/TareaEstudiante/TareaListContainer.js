import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/tareaEstudiante/tareaEstudiante'
import TareaList from './TareaList';

//El estado
const ms2p = (state) => {
  return {
    ...state.tareaEstudiante,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(TareaList);
