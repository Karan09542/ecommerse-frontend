fetch("http://ip-api.com/json")
  .then((res) => res.json())
  .then((data) => {
    const cc = data.countryCode;
    const regionFormat = new Intl.DisplayNames([cc], { type: "region" });
    const currencyFormat = new Intl.NumberFormat(undefined);
    // console.log(data);
    // console.log([data?.countryCode]);
  });

// import libphonenumber from "google-libphonenumber";
// const PhoneNumberType = libphonenumber.PhoneNumberType;

// const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
// const phoneNumber = phoneUtil.parse("7", "IN");
// // console.log({ phoneNumber });
// console.log("phone number type:", phoneUtil.getNumberType(phoneNumber));
// console.log("Mobile:", PhoneNumberType.MOBILE);
