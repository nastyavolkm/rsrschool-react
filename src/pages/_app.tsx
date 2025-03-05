import '../index.css';
import { wrapper } from '../store/wrapper';
import { MyApp } from '../components/app';

const WrappedApp = wrapper.withRedux(MyApp);
export default WrappedApp;
