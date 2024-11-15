import responseSchema from "./responseSchema";

export default validateResponse = (response) => {
    const { error } = responseSchema.validate(response);
    if (error) {
      throw new Error(`Response validation failed: ${error.message}`);
    }
    return response;
  };