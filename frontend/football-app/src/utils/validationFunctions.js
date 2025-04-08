export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function isEmail(value) {
  return value.includes("@");
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualToOtherValue(value, otherValue) {
  return value === otherValue;
}

export function isPassword(value) {
  const uppercase = value.match(/[A-Z]/g) || [];
  const lowercase = value.match(/[a-z]/g) || [];
  const digits = value.match(/[0-9]/g) || [];
  const specialChars = value.match(/[^A-Za-z0-9]/g) || [];

  return (
    uppercase.length >= 2 &&
    lowercase.length >= 2 &&
    digits.length >= 2 &&
    specialChars.length >= 2
  );
}
