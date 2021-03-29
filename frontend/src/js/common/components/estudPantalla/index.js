import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/estudPantalla/estudPantalla';
import Config from './config';


const ms2p = (state) => {
  return {
    ...state.estudPantalla,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Config);
