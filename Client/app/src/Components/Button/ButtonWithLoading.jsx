import React, { useState } from "react";
import "./button.scss";

export default function ButtonWithLoadingComp({ text, action }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const loadingIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 20l-1.359-2.038c-1.061.653-2.305 1.038-3.641 1.038-3.859 0-7-3.14-7-7h2c0 2.757 2.243 5 5 5 .927 0 1.786-.264 2.527-.708l-1.527-2.292h5.719l-1.719 6zm0-8c0-2.757-2.243-5-5-5-.927 0-1.786.264-2.527.708l1.527 2.292h-5.719l1.719-6 1.359 2.038c1.061-.653 2.305-1.038 3.641-1.038 3.859 0 7 3.14 7 7h-2z" />
    </svg>
  );

  const checkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
    </svg>
  );

  const errorIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
    </svg>
  );

  const onButtonClick = () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    setTimeout(async () => {
      await action()
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 2000);
        });
    }, 2000);
  };

  return (
    <button
      onClick={onButtonClick}
      disabled={isLoading ? true : false}
      className={isLoading ? "loading" : ""}
    >
      {isLoading ? (
        <>Loading... {loadingIcon}</>
      ) : isSuccess ? (
        <>Success! {checkIcon}</>
      ) : isError ? (
        <>Error! {errorIcon}</>
      ) : (
        text
      )}
    </button>
  );
}
