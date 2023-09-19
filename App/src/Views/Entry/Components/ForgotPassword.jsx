import React, { useState } from "react";
import { forgotPassword } from "../../../Utilities/DB/UsersService";
import { useMsgService } from "../../../Utilities/Alerts/msgService";
import ForgotIcon from "../../../assets/Components/Login/ForgotIcon";
import ButtonWithLoading from "../../../Components/Button/ButtonWithLoading";

export default function ForgotPasswordComp(props) {
  const callback = props.callback;

  // forgot email obj
  const [forgotEmail, setForgotEmail] = useState();
  const { MessageDisplay, alertMsg } = useMsgService();

  // function to handle forgot pass, get email obj
  const handleForgotPassword = async () => {
    if(!forgotEmail){
      alertMsg('fail', 'please enter email address')
    } else {
      try {
        await forgotPassword(forgotEmail);
        alertMsg("success", "Email was sent successfuly");
        // return back
        setTimeout(() => {
          setIsForgotPage(!isFrogotPage);
        }, 2000);
      } catch (err) {
        alertMsg("fail", `Something went wrong... \n check email address`);
      }
    }
  };

  return (
    <>
      <div className="art">
        <ForgotIcon />
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
        <ButtonWithLoading action={handleForgotPassword} text={'Continue'}/>
        <button onClick={callback}>Back</button>
      </div>
    </>
  );
}
