import { useState } from 'react';
import { FiRotateCcw, FiSend } from 'react-icons/fi';
import LoadingSpinner from './LoadingSpinner';

const initialValues = {
  CreditScore: '650',
  Geography: 'France',
  Gender: 'Male',
  Age: '42',
  Tenure: '5',
  Balance: '60000',
  NumOfProducts: '2',
  HasCrCard: '1',
  IsActiveMember: '1',
  EstimatedSalary: '50000',
};

const geographyOptions = ['France', 'Germany', 'Spain'];
const genderOptions = ['Male', 'Female'];
const binaryOptions = [
  { label: 'Yes', value: '1' },
  { label: 'No', value: '0' },
];

function validate(values) {
  const errors = {};
  const score = Number(values.CreditScore);
  const age = Number(values.Age);
  const tenure = Number(values.Tenure);
  const balance = Number(values.Balance);
  const products = Number(values.NumOfProducts);
  const salary = Number(values.EstimatedSalary);

  if (!Number.isFinite(score) || score < 300 || score > 900) {
    errors.CreditScore = 'Enter a credit score between 300 and 900.';
  }
  if (!geographyOptions.includes(values.Geography)) {
    errors.Geography = 'Select a valid geography.';
  }
  if (!genderOptions.includes(values.Gender)) {
    errors.Gender = 'Select a valid gender.';
  }
  if (!Number.isFinite(age) || age < 18 || age > 100) {
    errors.Age = 'Enter an age between 18 and 100.';
  }
  if (!Number.isFinite(tenure) || tenure < 0 || tenure > 50) {
    errors.Tenure = 'Enter a tenure between 0 and 50.';
  }
  if (!Number.isFinite(balance) || balance < 0) {
    errors.Balance = 'Balance cannot be negative.';
  }
  if (!Number.isFinite(products) || products < 1) {
    errors.NumOfProducts = 'At least one product is required.';
  }
  if (!Number.isFinite(salary) || salary < 0) {
    errors.EstimatedSalary = 'Salary cannot be negative.';
  }

  return errors;
}

export default function PredictionForm({ loading, onPredict, onReset }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onPredict({
      CreditScore: Number(values.CreditScore),
      Geography: values.Geography,
      Gender: values.Gender,
      Age: Number(values.Age),
      Tenure: Number(values.Tenure),
      Balance: Number(values.Balance),
      NumOfProducts: Number(values.NumOfProducts),
      HasCrCard: Number(values.HasCrCard),
      IsActiveMember: Number(values.IsActiveMember),
      EstimatedSalary: Number(values.EstimatedSalary),
    });
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    onReset();
  };

  return (
    <section className="form-card glass-panel">
      <div className="section-heading">
        <p className="eyebrow">Customer profile</p>
        <h2>Run a churn prediction</h2>
        <p>Fill in the customer fields below. The backend will engineer the derived features.</p>
      </div>

      <form className="prediction-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="field">
            <span>CreditScore</span>
            <input
              type="number"
              name="CreditScore"
              value={values.CreditScore}
              onChange={handleChange}
              min="300"
              max="900"
              placeholder="650"
            />
            {errors.CreditScore && <small>{errors.CreditScore}</small>}
          </label>

          <label className="field">
            <span>Geography</span>
            <select name="Geography" value={values.Geography} onChange={handleChange}>
              {geographyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.Geography && <small>{errors.Geography}</small>}
          </label>

          <label className="field">
            <span>Gender</span>
            <select name="Gender" value={values.Gender} onChange={handleChange}>
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.Gender && <small>{errors.Gender}</small>}
          </label>

          <label className="field">
            <span>Age</span>
            <input
              type="number"
              name="Age"
              value={values.Age}
              onChange={handleChange}
              min="18"
              max="100"
              placeholder="42"
            />
            {errors.Age && <small>{errors.Age}</small>}
          </label>

          <label className="field">
            <span>Tenure</span>
            <input
              type="number"
              name="Tenure"
              value={values.Tenure}
              onChange={handleChange}
              min="0"
              max="50"
              placeholder="5"
            />
            {errors.Tenure && <small>{errors.Tenure}</small>}
          </label>

          <label className="field">
            <span>Balance</span>
            <input
              type="number"
              name="Balance"
              value={values.Balance}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="60000"
            />
            {errors.Balance && <small>{errors.Balance}</small>}
          </label>

          <label className="field">
            <span>NumOfProducts</span>
            <input
              type="number"
              name="NumOfProducts"
              value={values.NumOfProducts}
              onChange={handleChange}
              min="1"
              max="10"
              placeholder="2"
            />
            {errors.NumOfProducts && <small>{errors.NumOfProducts}</small>}
          </label>

          <label className="field">
            <span>HasCrCard</span>
            <select name="HasCrCard" value={values.HasCrCard} onChange={handleChange}>
              {binaryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>IsActiveMember</span>
            <select name="IsActiveMember" value={values.IsActiveMember} onChange={handleChange}>
              {binaryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field field-span-2">
            <span>EstimatedSalary</span>
            <input
              type="number"
              name="EstimatedSalary"
              value={values.EstimatedSalary}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="50000"
            />
            {errors.EstimatedSalary && <small>{errors.EstimatedSalary}</small>}
          </label>
        </div>

        <div className="form-actions">
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner />
                Predicting
              </>
            ) : (
              <>
                <FiSend />
                Predict Churn
              </>
            )}
          </button>
          <button className="secondary-button" type="button" onClick={handleReset} disabled={loading}>
            <FiRotateCcw />
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
