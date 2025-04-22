import validator from "validator";

const ageCalculate = (dob: Date | string) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birth date hasn't occurred yet this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const validateDOB = (yearStr: string, monthStr: string, dayStr: string) => {
  const isValidDate = validator.isDate(`${yearStr}-${monthStr}-${dayStr}`);

  if (!isValidDate) {
    console.error("Invalid Date");
    return false;
  }
  const dob = new Date(`${yearStr}-${monthStr}-${dayStr}`);

  //Checking for age
  const age = ageCalculate(dob);
  if (age > 130 || age < 15) {
    console.error("Invalid age: ", age);
    return false;
  }

  return true;
};

export { validateDOB, ageCalculate };
