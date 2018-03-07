
export function numberKey(evt) {
  const charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

export function decimalKey(evt) {
  const charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    return false;
  }
  return true;
}
