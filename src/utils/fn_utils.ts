import libphonenumber from "google-libphonenumber";
import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
const PNF = libphonenumber.PhoneNumberFormat;

// const PhoneNumberType = libphonenumber.PhoneNumberType;

export async function getRegion() {
  const res = await fetch("http://ip-api.com/json");
  const data = await res.json();
  return data.countryCode;
}
export function validatePhoneNumber(phoneNumber: string, countryCode: string) {
  try {
    const number = phoneUtil.parse(phoneNumber, countryCode);

    const isValid = phoneUtil.isValidNumber(number);
    const formattedNumber = phoneUtil.format(number, PNF.INTERNATIONAL);
    const normalizePhoneNumber = phoneUtil.format(number, PNF.E164);
    return { isValid, formattedNumber, phoneNumber: normalizePhoneNumber };
  } catch (e) {
    return { isValid: false, formattedNumber: null };
  }
}
export async function getCountryCallingCode() {
  return phoneUtil.getCountryCodeForRegion(await getRegion());
}
export const maxNumberLengthFromRegion = (
  region: string
): number | undefined => {
  if (!region) return 0;
  const exampleNumber = phoneUtil.getExampleNumber(region);
  return exampleNumber?.getNationalNumber()?.toString()?.length;
};

export const isValidMobileOrLandlineNumber = (
  phoneNumber: string,
  countryCode: string
) => {
  if (!phoneNumber || !countryCode) return false;
  const number = phoneUtil.parse(phoneNumber, countryCode);
  const isValid = phoneUtil.isValidNumber(number);
  // const numberType = phoneUtil.getNumberType(number);
  // if(numberType === PhoneNumberType.MOBILE || numberType === PhoneNumberType.FIXED_LINE) return isValid && true;
  // return false

  return isValid;
};

// tailwind utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// handle price label
export function handlePriceLabel(
  type: string | undefined,
  value: string | number
): string | number {
  if (type === "from") return `From ${value}`;
  if (type === "%age") return `Up to ${value}%`;
  return value;
}
// handle date
export function decorateDate(date: string | number) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface CommonHeadersAndMethod {
  accessToken: string | null;
  method?: string;
}
export const commonHeadersAndMethod = ({
  accessToken,
  method = "POST",
}: CommonHeadersAndMethod) => {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

// const result = validatePhoneNumber("123456789", "IN");
