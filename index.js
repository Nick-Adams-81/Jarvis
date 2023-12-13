import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const main = async () => {
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: "what is the capitol of california?" }
        ]
    })
    console.log(chatCompletion.choices[0].message.content)
}

main();