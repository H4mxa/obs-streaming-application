import crypto from "crypto";

export const hashPassword = (password: string) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

export const ComparePassword = ({
  password,
  encryptedPassword,
}: {
  password: string;
  encryptedPassword: string;
}) => {
  const encryptedPasswordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  return encryptedPasswordHash === encryptedPassword;
};
