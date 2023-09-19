import React, { useState } from "react";
import './buttonWithLoading.scss'
import LoadingIcon from "../../assets/Components/Button/LoadingIcon";
import CheckIcon from "../../assets/Components/Button/CheckIcon";
import ErrorIcon from "../../assets/403/ErrorIcon";


export default function ButtonWithLoading({ text, action }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onButtonClick = () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    setTimeout(async () => {
      await action()
      setIsLoading(false)
    }, 500);
  };

  return (
    <button
      onClick={onButtonClick}
      disabled={isLoading ? true : false}
      className={isLoading ? "loading" : ""}
    >
      {isLoading ? (
        <>Loading... {<LoadingIcon />}</>
      ) : isSuccess ? (
        <>Success! {<CheckIcon />}</>
      ) : isError ? (
        <>Error! {<ErrorIcon />}</>
      ) : (
        text
      )}
    </button>
  );
}
