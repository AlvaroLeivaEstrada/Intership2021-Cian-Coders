import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/empresa/empresa'
import EmpresaCrear from './EmpresaCrear';

//El estado
const ms2p = (state) => {
  return {
    ...state.empresa,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(EmpresaCrear);
