import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div>
      <h1>Forms data</h1>
      <Link to={'/form1'}>Form 1</Link>
      <Link to={'/form2'}>Form 2</Link>
    </div>
  );
};
