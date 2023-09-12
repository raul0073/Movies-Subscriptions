import React, { useState } from "react";

export const useMsgService = () => {
  const [msgType, setMsgType] = useState("");
  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const successColor = 'green'
  const failColor = 'red'

  const displayMsg = (type, message) => {
    setMsgType(type);
    setMsg(message);
    setShowMessage(true);
  };

  const closeMsg = () => {
    setShowMessage(false);
    setMsgType("");
    setMsg("");
  };

  const MessageDisplay = () => (
    <div
      className="alert"
      style={{
        display: showMessage ? "flex" : "none",
        background: msgType === "success" ? successColor : failColor,
        color: "white",
      }}
    >
      {msg}
      {msg && (
        <button onClick={closeMsg} style={{ background: "transparent" }}>
          X
        </button>
      )}
    </div>
  );

  return { displayMsg, MessageDisplay };
};
