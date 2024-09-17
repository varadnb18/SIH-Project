import { useEffect, useRef, useState } from "react";
import "./RightDiv.css";

function RightDiv() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {text:"Prevention:Vaccination: Getting vaccinated is crucial. It significantly reduces the risk of severe illness, hospitalization, and death. If you havent already, consider getting vaccinated.Mask-Wearing: Especially during times of high transmission, wearing masks helps prevent the spread of the virus. Properly fitted masks protect both you and others.Physical Distancing: Maintain at least 6 feet of distance from others, especially in crowded or indoor settings.Hand Hygiene: Regularly wash your hands with soap and water for at least 20 seconds. If soap isnt available, use hand sanitizer with at least 60% alcohol.Avoid Sick Individuals: Stay away from people who are sick or showing symptoms of COVID-19.entilation: Ensure good ventilation in indoor spaces to reduce the concentration of viral particles.Stay Informed: Keep up with reliable sources for updates and guidelines.Treatment:Antiviral Medications: Several antiviral medications have received emergency use authorization for treating COVID-19. These drugs target specific parts of the virus, preventing it from multiplying in the body. Examples include remdesivir and nirmatrelvir with ritonavir (Paxlovid). Treatment should start within 57 days of symptom onset1.onoclonal Antibodies: These lab-made antibodies can help reduce the severity of illness in high-risk individuals. They are administered via infusion.upportive Care: Rest, hydration, and managing symptoms (such as fever and cough) are essential.ospitalization: Severe cases may require hospitalization, oxygen therapy, and other supportive measures.",isBot:true},
        {text:"Hello from user", isBot:false},
        {text:"Hello from AI", isBot:true}
    ]);
    const msgEnd = useRef(null);

    function handleSend() {
        const userText = input;
        if (userText.trim()) {
            setMessages(prevMessages => [...prevMessages, { text: userText, isBot: false }]);
            setInput("");
        }
    }

    async function handleEnter(e) {
        if (e.key === 'Enter') await handleSend();
    }

    useEffect(() => {
        if (msgEnd.current) {
            msgEnd.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    
    return (
        <div className="RightDiv">
            <div className="innerDiv">
                {messages.map((message, i) => (
                    <div key={i} className={message.isBot ? "chat bot" : "chat"}>
                        <p>{message.text}</p>
                    </div>
                ))}
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default RightDiv;