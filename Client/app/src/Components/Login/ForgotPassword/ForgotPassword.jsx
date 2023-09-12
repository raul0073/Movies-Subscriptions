import React, { useState } from "react";
import { useMsgService } from "../../../Services/Alert/msgService";
import { forgotPassword } from "../../../Services/DB/userService";

export default function ForgotPasswordComp(props) {
  const callback = props.callback;

  // forgot email obj
  const [forgotEmail, setForgotEmail] = useState();
  const { MessageDisplay, displayMsg } = useMsgService();

  // function to handle forgot pass, get email obj
  const handleForgotPassword = async () => {
    try {
      await forgotPassword(forgotEmail);
      displayMsg("success", "Email was sent successfuly");
      // return back
      setTimeout(() => {
        setIsForgotPage(!isFrogotPage);
      }, 2000);
    } catch (err) {
      displayMsg("fail", `Something went wrong... \n check email address`);
    }
  };

  return (
    <>
      <div className="art">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
        >
          <path d="M9 12.242v7.894l-4.291.864-.709-3.827 4.005-5.909c.331.382.352.46.995.978zm2 1.176v8.015l2.732 2.567 3.268-2.567-1.052-1.109 1.052-1.108-1.052-1.108 1.052-1.108v-3.583c-.941.381-1.955.583-3.001.583-1.045 0-2.059-.202-2.999-.582zm7.242-11.661c-2.131-2.131-5.424-2.25-7.687-.651-1.174.821-1.96 1.94-2.335 3.378-1.664-.087-2.72-.905-2.72-1.484 0-.6 1.128-1.46 2.898-1.494.42-.524.67-.822 1.42-1.36-.42-.086-.856-.146-1.318-.146-2.485 0-4.5 1.343-4.5 3 0 1.936 2.526 3 4.5 3 2.818 0 5.337-1.892 4.252-3.967.567-.912 1.682-.902 2.309-.275.975.975.24 2.625-1.146 2.544-.862 2.006-3.376 3-5.794 2.879.225 1.122.768 2.192 1.638 3.062 2.342 2.344 6.141 2.343 8.484 0 1.17-1.172 1.757-2.708 1.757-4.244 0-1.535-.586-3.07-1.758-4.242z" />
        </svg>{" "}
      </div>
      <div className="header">
        <h2>Retrieve password</h2>
      </div>
      <input
        type="text"
        placeholder="Email"
        required
        onChange={(e) => {
          setForgotEmail({ ...forgotEmail, email: e.target.value });
        }}
      />
      <i style={{ color: "grey" }}>Your initial password will be sent</i>
      <div className="btn">
        <button onClick={handleForgotPassword}>Continue</button>
        <button onClick={callback}>Back</button>
      </div>
    </>
  );
}
