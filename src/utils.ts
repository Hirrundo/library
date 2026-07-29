
export const formatPhone = (raw: string): string => {
    // +7 (999) 999-99-99
  let result = '';
  if (raw.length === 0) return result;
  result += '+7';
  if (raw.length > 1) {
  result += ' (' + raw.substring(1, 4);
  }
  if (raw.length > 4) {
  result += ') ' + raw.substring(4, 7);
  }
  if (raw.length > 7) {
  result += '-' + raw.substring(7, 9);
  }
  if (raw.length > 9) {
  result += '-' + raw.substring(9, 11);
  }
  return result;
  };