import { useContext, useEffect, useRef, useState, CSSProperties } from "react";
import "./RightDiv.css";
import { MyContext } from "../MyContext";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function RightDiv() {
  const { data } = useContext(MyContext);
  const { loading, setLoading } = useContext(MyContext);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data != "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data, isBot: true },
      ]);
    }
  }, [data]);

  const msgEnd = useRef(null);

  async function handleSend() {
    // setLoading(true);
    const userText = input;
    if (userText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userText, isBot: false },
      ]);
      setInput("");
    }
    const formData = new FormData();
    formData.append("text", userText);
    try {
      const response = await axios.post(
        "http://localhost:5000/chat",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.ai_response, isBot: true },
      ]);
      // setLoading(false);
    } catch (error) {
      console.error("Error making the request:", error.message);
      // setLoading(false);
    }
  }

  async function handleEnter(e) {
    if (e.key === "Enter") await handleSend();
  }

  useEffect(() => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="RightDiv">
      <div className="innerDiv">
        {loading ? (
          <div className="loaderContainer">
            <ClipLoader
              size={50}
              color={"#123abc"}
              loading={loading}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            {messages.map((message, i) => (
              <div key={i} className={message.isBot ? "chat bot" : "chat"}>
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            ))}
          </>
        )}
        <div ref={msgEnd}></div>
      </div>
      <div className="bottomBar">
        <input
          type="text"
          value={input}
          placeholder="Ask me anything!"
          onKeyDown={handleEnter}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="sendButton" onClick={handleSend}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-7"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default RightDiv;
