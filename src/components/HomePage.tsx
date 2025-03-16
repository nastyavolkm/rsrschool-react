import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FullFilledForm } from './FullFilledForm.tsx';
import { useSelector } from 'react-redux';
import { selectFormsData } from '../store/features/forms-data/forms-data-slice.tsx';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const forms = useSelector(selectFormsData);
  const [hasNewAddedForm, setHasNewAddedForm] = useState(false);
  const lastAddedForm = forms?.[0];

  useEffect(() => {
    if (lastAddedForm) {
      setHasNewAddedForm(true);
      const timer = setTimeout(() => {
        setHasNewAddedForm(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [lastAddedForm]);

  return (
    <div className="home">
      <nav className="home-navigation">
        <Link className="home-navigation-link" to={'/form1'}>
          Fill out an uncontrolled components form
        </Link>
        <Link className="home-navigation-link" to={'/form2'}>
          Fill out a react hooks form
        </Link>
      </nav>
      <h2>Forms data</h2>
      <div className="home-wrapper">
        {!forms?.[0] && (
          <p className="no-data">
            No forms data yet. Please fill out one of the form
          </p>
        )}
        {forms?.[0] &&
          forms.map((result, index) => (
            <div
              className={`home-item ${
                index === 0 && hasNewAddedForm ? 'highlighted' : ''
              }`}
              key={index}
            >
              <FullFilledForm form={result} />
            </div>
          ))}
      </div>
    </div>
  );
};
