export const validateUsername = (username: string): boolean => {
  const regex = /^\S{3,8}$/;
  return regex.test(username);
};

export const validateEmail = (email: string): boolean => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const regex = /^\S{3,12}$/;
  return regex.test(password);
};

export const validateTitle = (title: string): boolean =>
  title.length > 3 && title.length <= 30;

export const validateDescription = (description: string): boolean =>
  description.length > 10 && description.length <= 200;

export const validateAvatarUrl = (url: string): boolean => {
  const regex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  return regex.test(url);
};

export const passwordConfValidation = (
  password: string,
  confPassword: string
): boolean => {
  return password === confPassword;
};

export const emailValidationMessage = "Please enter a valid email address";
export const passwordConfValidationMessage = "Password do not match.";
export const usernameValidationMessage =
  "Username should have between 3 and 8 characters. No space are allowed.";
export const passwordValidationMessage =
  "Please should have between 3 and 12 characters. No space are allowed.";

export const titleValidationMessage =
  "Title should have between 3 and 30 characters";
export const avatarUrlValidationMessage = "Please enter a valid url";
export const descriptionValidationMessage =
  "Description should have between 10 and 200 characters";
