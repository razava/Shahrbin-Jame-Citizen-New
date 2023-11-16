import { useState } from "react";
import { Validation } from "../utils/functions";

const useValidation = () => {
  // states
  const [errors, setErrors] = useState({});

  //   functions
  const validate = (validators = []) => {
    const { isValid, errors } = Validation.run(validators);
    setErrors(errors);
    return isValid;
  };

  const validateOne = (validators = []) => {
    const { isValid, errors: singleError } = Validation.run(validators);
    console.log(singleError);
    const newErrors = { ...errors, ...singleError };
    setErrors(newErrors);
    return isValid;
  };

  return { validate, validateOne, errors };
};

export default useValidation;
