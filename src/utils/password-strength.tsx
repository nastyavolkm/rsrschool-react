export const getPasswordStrength = (pass: string) => {
  let score = 0;
  if (!pass) return '';
  if (pass.length > 7) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[a-z]/.test(pass)) score++;
  if (/\d/.test(pass)) score++;
  if (/[@$!%*?&]/.test(pass)) score++;

  switch (score) {
    case 1:
      return 'Very Weak';
    case 2:
      return 'Weak';
    case 3:
      return 'Medium';
    case 4:
      return 'Strong';
    case 5:
      return 'Very Strong';
    default:
      return 'Very Weak';
  }
};
