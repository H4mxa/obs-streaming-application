export const validateUsername = (username: string): boolean => {
  const regex = /^\S{3,8}$/;
  return regex.test(username);
};

export const validateEmail = (email: string): boolean => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const regex = /^\S{6,12}$/;
  return regex.test(password);
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
  "Please should have between 6 and 12 characters. No space are allowed.";
