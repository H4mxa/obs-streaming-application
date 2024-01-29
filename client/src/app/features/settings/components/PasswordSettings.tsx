import usePasswordSettings from "../hooks/usePasswordSettings";
import { passwordInputs } from "../core/constants";
import Input from "modules/common/components/Input";
import { execFunc } from "modules/common/method";

const PasswordSettings = () => {
  const { formstate, passwordSettingsActions, isSubmitButtonDisabled } =
    usePasswordSettings();

  return (
    <form className="settings-form">
      {passwordInputs.map((input) => {
        return (
          <Input
            key={input.field}
            field={input.field}
            label={input.label}
            value={formstate[input.field as keyof typeof formstate].value}
            onChangeHandler={(text, field) =>
              execFunc(
                passwordSettingsActions.handleInputValueChange,
                field as keyof typeof formstate,
                text
              )
            }
            onBlurHandler={(text, field) =>
              execFunc(
                passwordSettingsActions.handleInputValidationOnBlur,
                field as keyof typeof formstate,
                text
              )
            }
            showErrorMessage={
              formstate[input.field as keyof typeof formstate].showError
            }
            validationMessage={input.validationMessage}
            type={input.type}
          />
        );
      })}

      <button
        disabled={isSubmitButtonDisabled}
        onClick={passwordSettingsActions.handleFormSubmit}
      >
        Save Changes
      </button>
    </form>
  );
};

export default PasswordSettings;
