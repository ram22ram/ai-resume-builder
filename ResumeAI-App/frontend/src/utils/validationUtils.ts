// Create: src/utils/validationUtils.ts

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const validateDate = (dateString: string): boolean => {
  if (!dateString) return true; // Empty dates are valid
  
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString.length >= 4; // At least year
};

export const validateStartEndDate = (startDate: string, endDate: string, isPresent: boolean = false): string | null => {
  if (!startDate) return 'Start date is required';
  
  if (!isPresent && !endDate) {
    return 'End date is required unless currently working here';
  }
  
  if (startDate && endDate && !isPresent) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      return 'End date cannot be before start date';
    }
  }
  
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateExperience = (experience: any[]): { isValid: boolean; errors: Record<string, string>[] } => {
  const errors: Record<string, string>[] = [];
  
  experience.forEach((exp, index) => {
    const expErrors: Record<string, string> = {};
    
    // Validate required fields
    if (!exp.title?.trim()) {
      expErrors.title = 'Job title is required';
    }
    
    if (!exp.company?.trim()) {
      expErrors.company = 'Company name is required';
    }
    
    // Validate dates
    const dateError = validateStartEndDate(exp.startDate, exp.endDate, exp.isPresent);
    if (dateError) {
      expErrors.date = dateError;
    }
    
    if (Object.keys(expErrors).length > 0) {
      errors[index] = expErrors;
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateEducation = (education: any[]): { isValid: boolean; errors: Record<string, string>[] } => {
  const errors: Record<string, string>[] = [];
  
  education.forEach((edu, index) => {
    const eduErrors: Record<string, string> = {};
    
    // Validate required fields
    if (!edu.school?.trim()) {
      eduErrors.school = 'School/University is required';
    }
    
    if (!edu.degree?.trim()) {
      eduErrors.degree = 'Degree is required';
    }
    
    // Validate dates
    if (!edu.startDate) {
      eduErrors.startDate = 'Start date is required';
    }
    
    if (!edu.endDate) {
      eduErrors.endDate = 'End date is required';
    }
    
    if (edu.startDate && edu.endDate) {
      const start = new Date(edu.startDate);
      const end = new Date(edu.endDate);
      if (end < start) {
        eduErrors.date = 'End date cannot be before start date';
      }
    }
    
    if (Object.keys(eduErrors).length > 0) {
      errors[index] = eduErrors;
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePersonalInfo = (personalInfo: any): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  // Validate required fields
  if (!personalInfo.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  }
  
  if (!personalInfo.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(personalInfo.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!personalInfo.jobTitle?.trim()) {
    errors.jobTitle = 'Job title is required';
  }
  
  // Optional validation
  if (personalInfo.phone && !validatePhone(personalInfo.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};