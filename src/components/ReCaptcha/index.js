/* eslint-disable*/
import React, { useEffect, useCallback } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ReCaptcha = ({onVerifyCaptcha}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
    }

    const token = await executeRecaptcha('yourAction');
    onVerifyCaptcha(token);
    // Do whatever you want with the token
    console.log('hi pattu',token)
  };

//   You can use useEffect to trigger the verification as soon as the component being loaded
    // useEffect(() => {
    //   handleReCaptchaVerify();
    // }, []);

  return <button onClick={handleReCaptchaVerify}>Verify recaptcha</button>;
};

export default ReCaptcha;
