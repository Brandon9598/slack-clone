import React, { useState } from "react";
import "./ChatInput.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      db.collection("rooms")
        .doc(channelId)
        .collection("messages")
        .add({
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: user.displayName,
          userImage:
            user.photoUrl ||
            "https://secure.gravatar.com/avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg?s=512&d=https%3A%2F%2Fdev.slack.com%2Fimg%2Favatars%2Fava_0010-512.v1443724322.png",
        });
    }

    setInput("");
  };
  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
