type commonTypes = {
  value: string;
  isValid: boolean;
  showError: boolean;
};

export type loginStateTypes = {
  email: commonTypes;
  password: commonTypes;
};

export type registerStateTypes = {
  username: commonTypes;
  email: commonTypes;
  password: commonTypes;
  passwordConf: commonTypes;
};
