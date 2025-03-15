import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FullFilledForm } from './FullFilledForm.tsx';
import { useSelector } from 'react-redux';
import { selectComponentForm } from '../store/features/component-form/component-form-slice.tsx';
import { selectReactHookForm } from '../store/features/react-hook-form/react-hook-form-slice.tsx';
import './HomePage.css';
import {
  LastUpdatedFormEnum,
  selectLastUpdatedForm,
} from '../store/features/last-updated-form/last-updated-form-slice.tsx';

export const HomePage: React.FC = () => {
  const uncontrolledForm = useSelector(selectComponentForm);
  const reactHooksForm = useSelector(selectReactHookForm);
  const lastUpdatedForm: LastUpdatedFormEnum | null = useSelector(
    selectLastUpdatedForm
  );
  const [highlightedForm, setHighlightedForm] =
    useState<LastUpdatedFormEnum | null>(null);

  useEffect(() => {
    if (lastUpdatedForm) {
      setHighlightedForm(lastUpdatedForm);
      const timer = setTimeout(() => {
        setHighlightedForm(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [lastUpdatedForm]);

  return (
    <div className="home">
      <h1>Forms data</h1>
      <div className="home-wrapper">
        <Link
          className={`home-item ${
            highlightedForm === LastUpdatedFormEnum.COMPONENT_FORM
              ? 'highlighted'
              : ''
          }`}
          to={'/form1'}
        >
          Uncontrolled Component Form
          <div>
            {uncontrolledForm ? (
              <FullFilledForm form={uncontrolledForm} />
            ) : (
              <span className="no-data">No data yet</span>
            )}
          </div>
        </Link>
        <Link
          className={`home-item ${
            highlightedForm === LastUpdatedFormEnum.REACT_HOOK_FORM
              ? 'highlighted'
              : ''
          }`}
          to={'/form2'}
        >
          React Hooks Form
          <div>
            {reactHooksForm ? (
              <FullFilledForm form={reactHooksForm} />
            ) : (
              <span className="no-data">No data yet</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
