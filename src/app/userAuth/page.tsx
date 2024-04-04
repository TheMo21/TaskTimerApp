"use client";
import { useState } from "react";
import PopUpAlert from "../component/PopUpAlert";
import SignIn from "../component/SignIn";
import SignUp from "../component/SignUp";

export default function UserAuth() {
  const signInURL = "/api/user/signIn";
  const signUpURL = "/api/user/signUp";

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const handleSubmitError = (errorMessage: string) => {
    setShowAlert(true);
    setAlertMessage(errorMessage);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const componentSize = "w-full md:w-1/4 md:h-1/2 p-7";

  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-100">
      <PopUpAlert
        message={alertMessage}
        className={showAlert ? "show" : "hide"}
      />
      {isSignIn ? (
        <SignIn
          api={signInURL}
          className={componentSize}
          handleSubmitError={handleSubmitError}
          goToSignIn={() => setIsSignIn(false)}
        />
      ) : (
        <SignUp
          api={signUpURL}
          className={componentSize}
          handleSubmitError={handleSubmitError}
          goToSignUp={() => setIsSignIn(true)}
        />
      )}
    </div>
  );
}
