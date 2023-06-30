// validate date from text input in french format and convert it to a date object :
export const validateDate = (date: string): Date => {
      const dateRegex = /([0-9]{2})\/([0-9]{2})\/([0-9]{4})/;
  const dateParts = date.match(dateRegex);
  if (dateParts === null) {
    throw new Error("date format must be dd/mm/yyyy");
  }
  const day = parseInt(dateParts[1]);
  const month = parseInt(dateParts[2]) - 1;
  const year = parseInt(dateParts[3]);
  return new Date(year, month, day);
}

// function that validates the format of a GUID string
export const validateGuid = (guid: string): boolean => {
    const guidRegex = /([a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8})/;
    return guidRegex.test(guid);
    }

// function that validates the format of a IPV6 address string
export const validateIpv6 = (ipv6: string): boolean => {
    const ipv6Regex = /([a-f0-9]{4}(:[a-f0-9]{4}){7})/;
    return ipv6Regex.test(ipv6);
    }

// function that validates the format of a IPV4 address string
export const validateIpv4 = (ipv4: string): boolean => {
    const ipv4Regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
    return ipv4Regex.test(ipv4);
    }

// function that validates the format of a email address string
export const validateEmail = (email: string): boolean => {
    const emailRegex = /([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})/;
    return emailRegex.test(email);
    }

// function that validates the format of a password string
export const validatePassword = (password: string): boolean => {
    const passwordRegex = /([a-zA-Z0-9]{8,})/;
    return passwordRegex.test(password);
    }

// validate phone number from text input and extract the country code
export const validatePhone = (phone: string): string => {
    const phoneRegex = /([0-9]{10})/;
    const phoneParts = phone.match(phoneRegex);
    if (phoneParts === null) {
        throw new Error("phone format must be 10 digits");
    }
    return phoneParts[0];
    }