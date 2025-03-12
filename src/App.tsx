import './App.css';
import { Route, Routes } from 'react-router';
import { ComponentsForm } from './components/ComponentsForm.tsx';
import { ReactHooksForm } from './components/ReactHooksForm.tsx';
import { NotFound } from './components/NotFound.tsx';
import { HomePage } from './components/HomePage.tsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/form1" element={<ComponentsForm />} />
      <Route path="/form2" element={<ReactHooksForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
