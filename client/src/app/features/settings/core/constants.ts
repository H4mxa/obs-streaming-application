import {
  avatarUrlValidationMessage,
  titleValidationMessage,
  usernameValidationMessage,
  descriptionValidationMessage,
  passwordValidationMessage,
} from "modules/validators";

export const channelSettings = {
  title: "title",
  description: "description",
  username: "username",
  streamKey: "klasjdk--werfd-fa--eraf",
  avatarUrl: "none",
};

export const Inputs = [
  {
    field: "username",
    label: "Username",
    type: "text",
    validationMessage: usernameValidationMessage,
  },
  {
    field: "title",
    label: "Title",
    type: "text",
    validationMessage: titleValidationMessage,
  },
  {
    field: "avatarUrl",
    label: "Avatar URL",
    type: "text",
    validationMessage: avatarUrlValidationMessage,
  },
  {
    field: "description",
    label: "Description",
    type: "text",
    validationMessage: descriptionValidationMessage,
    textarea: true,
  },
];

export const passwordInputs = [
  {
    field: "password",
    label: "Password",
    type: "password",
    validationMessage: passwordValidationMessage,
  },
  {
    field: "newPassword",
    label: "New Password",
    type: "password",
    validationMessage: passwordValidationMessage,
  },
];
