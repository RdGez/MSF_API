export const joiErrors = (error: any) => {
  const errors: any = {}
  error.details.forEach((item: any) => {
    errors[item.path[0]] = item.message
  })
  return errors
};
