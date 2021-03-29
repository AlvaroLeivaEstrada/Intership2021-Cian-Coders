import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/evento/evento'
import EventoList from './EventoList';

//El estado
const ms2p = (state) => {
  return {
    ...state.evento,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(EventoList);
