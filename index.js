import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

const main = async () => {
    console.log(colors.bold.brightYellow(colors.brightMagenta("Jarvis: ") + "Hello Sir, I am Jarvis, Your personal AI assistant"));
    console.log(colors.bold.brightYellow(colors.brightMagenta("Jarvis: ") + "How may I help you today?"));

    const chatHistory  = [];

    while(true) {
        const userInput = readlineSync.question(colors.bold.brightCyan("You: "));
        try {
            const messages = chatHistory.map(([role, content]) => ({ role, content }));
            messages.push({ role: "user", content: userInput })
            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            })
            const completionText = chatCompletion.choices[0].message.content;
            if(userInput.toLowerCase() === "exit" || userInput.toLowerCase() === "quit") {
                console.log(colors.bold.brightMagenta("JARVIS: ") + colors.bold.brightMagenta(completionText));
                return;
            }
            console.log(colors.bold.brightMagenta("JARVIS: ") + colors.bold.brightYellow(completionText));
            chatHistory.push(["user", userInput]);
            chatHistory.push(["assistant", completionText]);
        } catch(err) {
            console.error(colors.red(err));
        }
    }
    
}

main();
