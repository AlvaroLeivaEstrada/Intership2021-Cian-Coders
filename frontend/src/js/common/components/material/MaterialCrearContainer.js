import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/material/material'
import MaterialCrear from './MaterialCrear';

//El estado
const ms2p = (state) => {
  return {
    ...state.material,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(MaterialCrear);
