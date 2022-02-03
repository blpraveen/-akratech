import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/styles.scss';

const store = configureStore();

function  App () {
	 return ( <Provider store={store}>
	    <AppRouter />
	  </Provider>
	);
}
export default App;
