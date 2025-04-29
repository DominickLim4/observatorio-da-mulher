// client/src/components/FormQuestion.js
import React from 'react';

const FormQuestion = ({ question, onChange }) => {
  const { id, title, options, type } = question;

  const handleChange = (event) => {
    if (type === 'checkbox') {
      const checkedOptions = Array.from(
        document.querySelectorAll(`input[name="${id}"]:checked`)
      ).map((checkbox) => checkbox.value);
      
      onChange(id, checkedOptions);
    } else {
      onChange(id, event.target.value);
    }
  };

  return (
    <div className="mb-4 p-3 border rounded bg-light">
      <h5 className="mb-3">{title}</h5>
      
      {type === 'radio' && (
        <div>
          {options.map((option, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="radio"
                name={id}
                id={`${id}-${index}`}
                value={option}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={`${id}-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      )}

      {type === 'checkbox' && (
        <div>
          {options.map((option, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                name={id}
                id={`${id}-${index}`}
                value={option}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={`${id}-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      )}

      {type === 'select' && (
        <select
          className="form-select"
          name={id}
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled>
            Selecione uma opção
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FormQuestion;