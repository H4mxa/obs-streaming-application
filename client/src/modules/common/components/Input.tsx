import React, { ChangeEventHandler, useCallback } from "react";
import "./style.css";

interface IInput {
  field: string;
  label: string;
  value: string;
  type: string;
  textarea?: boolean;
  placeholder?: string;
  showErrorMessage: boolean;
  validationMessage: string;
  onChangeHandler: (value: string, field: string) => void;
  onBlurHandler: (event: string, field: string) => void;
}

const Input: React.FC<IInput> = ({
  field,
  label,
  value,
  type,
  textarea,
  placeholder,
  showErrorMessage,
  validationMessage,
  onChangeHandler,
  onBlurHandler,
}) => {
  const handleValueChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      onChangeHandler(event.currentTarget.value, field);
    },
    [onChangeHandler]
  );

  const handleInputBlur: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      onBlurHandler(event.target.value, field);
    },
    [onBlurHandler]
  );

  return (
    <>
      <div className="auth-form-label">
        <span>{label}</span>
      </div>

      {textarea ? (
        <textarea
          typeof={type}
          value={value}
          placeholder={placeholder}
          onChange={handleValueChange as any}
          onBlur={handleInputBlur as any}
          rows={5}
          style={{
            maxWidth: "400px",
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleValueChange}
          onBlur={handleInputBlur}
        />
      )}

      <span className="auth-form-validation-message">
        {showErrorMessage && validationMessage}
      </span>
    </>
  );
};

export default Input;
