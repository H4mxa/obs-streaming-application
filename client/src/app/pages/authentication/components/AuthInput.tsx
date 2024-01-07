import React, {
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
} from "react";

interface IAuthInput {
  field: string;
  label: string;
  value: string;
  type: string;
  placeholder?: string;
  showErrorMessage: boolean;
  validationMessage: string;
  onChangeHandler: (value: string, field: string) => void;
  onBlurHandler: (event: string, field: string) => void;
}

const AuthInput: React.FC<IAuthInput> = ({
  field,
  label,
  value,
  type,
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

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleValueChange}
        onBlur={handleInputBlur}
      />

      <span className="auth-form-validation-message">
        {showErrorMessage && validationMessage}
      </span>
    </>
  );
};

export default AuthInput;
