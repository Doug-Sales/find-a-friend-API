export function validateInputDataToRegister(
  phoneNumber: string,
  postalCode: string,
) {
  const isInvalid =
    phoneNumber.trim().length < 8 || postalCode.trim().length < 5
  if (!isInvalid) {
    return false
  }

  return true
}
