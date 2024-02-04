import React, { SyntheticEvent, useState } from "react";
import { Inputs, channelSettings } from "../core/constants";
import Input from "modules/common/components/Input";
import useSettings, {
  settingsFormStateTypes,
} from "../hooks/useChannelSettings";
import { execFunc } from "modules/common/method";

interface ChannelSettingsProps {
  formstate: settingsFormStateTypes;
  isSubmitButtonDisabled: boolean;
  handleFormSubmit: () => void;
  handleInputValueChange: (
    field: keyof settingsFormStateTypes,
    value: string
  ) => void;
  handleInputValidationOnBlur: (
    field: keyof settingsFormStateTypes,
    value: string
  ) => void;
}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({
  formstate,
  isSubmitButtonDisabled,
  handleFormSubmit,
  handleInputValueChange,
  handleInputValidationOnBlur,
}) => {
  return (
    <form className="settings-form">
      {Inputs.map((input) => {
        return (
          <Input
            key={input.field}
            field={input.field}
            label={input.label}
            value={formstate[input.field as keyof typeof formstate].value}
            onChangeHandler={(text, field) =>
              execFunc(
                handleInputValueChange,
                field as keyof typeof formstate,
                text
              )
            }
            onBlurHandler={(text, field) =>
              execFunc(
                handleInputValidationOnBlur,
                field as keyof typeof formstate,
                text
              )
            }
            showErrorMessage={
              formstate[input.field as keyof typeof formstate].showError
            }
            validationMessage={input.validationMessage}
            type={input.type}
            textarea={input.textarea}
          />
        );
      })}

      <button onClick={handleFormSubmit} disabled={isSubmitButtonDisabled}>
        Save Changes
      </button>
    </form>
  );
};

export default ChannelSettings;
