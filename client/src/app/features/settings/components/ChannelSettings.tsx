import React, { useState } from "react";
import { Inputs, channelSettings } from "../core/constants";
import Input from "modules/common/components/Input";
import useSettings from "../hooks/useSettings";
import { execFunc } from "modules/common/method";

const ChannelSettings = ({
  settings,
}: {
  settings: typeof channelSettings;
}) => {
  const { formstate, settingsActions, isSubmitButtonDisabled } = useSettings({
    settings,
  });

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
                settingsActions.handleInputValueChange,
                field as keyof typeof formstate,
                text
              )
            }
            onBlurHandler={(text, field) =>
              execFunc(
                settingsActions.handleInputValidationOnBlur,
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

      <button
        onClick={settingsActions.handleFormSubmit}
        disabled={isSubmitButtonDisabled}
      >
        Save Changes
      </button>
    </form>
  );
};

export default ChannelSettings;
