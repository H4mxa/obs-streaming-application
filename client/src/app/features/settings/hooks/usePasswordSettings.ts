import { SyntheticEvent, useState } from "react";
import { useEventCallback } from "modules/common/hooks";
import { validatePassword } from "modules/validators";
import { passwordService } from "services/password";
import toast from "react-hot-toast";

const usePasswordSettings = () => {
  const [formstate, setFormState] = useState({
    password: {
      isvalid: false,
      showError: false,
      value: "",
    },
    newPassword: {
      isvalid: false,
      showError: false,
      value: "",
    },
  });

  /*
     =================================================================
     --------------- Password Settings Methods start -----------------
     =================================================================
  */

  const handleInputValueChange = useEventCallback(
    (key: keyof typeof formstate, value: string) => {
      setFormState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          value,
        },
      }));
    }
  );

  const handleInputValidationOnBlur = useEventCallback(
    (field: keyof typeof formstate, value: string) => {
      let isValid = validatePassword(value);

      setFormState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          isvalid: isValid,
          showError: !isValid,
        },
      }));
    }
  );

  const handleFormSubmit = useEventCallback(async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const payload = {
        password: formstate.password.value,
        newPassword: formstate.newPassword.value,
      };

      const result = passwordService.updatePassword(payload);
      toast.promise(result, {
        loading: "Loading",
        success: "Password updated successfully",
        error: (value) => {
          return value?.message ?? "Something went wrong";
        },
      });
    } catch (error: any) {
      toast.error(error?.message ?? "Something went wrong");
      throw error;
    }
  });

  /*
     =================================================================
     ---------------- Password Settings Methods End ------------------
     =================================================================
  */

  const passwordSettingsActions = {
    handleFormSubmit,
    handleInputValueChange,
    handleInputValidationOnBlur,
  };

  return {
    formstate,
    passwordSettingsActions,
    isSubmitButtonDisabled:
      !formstate.password.isvalid || !formstate.newPassword.isvalid,
  };
};

export default usePasswordSettings;
