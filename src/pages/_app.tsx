import '../index.css';
import { wrapper } from '../store/wrapper';
import { MyApp } from '../components/app';

const WrappedApp = wrapper.useWrappedStore(MyApp);
export default WrappedApp;
