import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const summarize = await openai.createCompletion({
        model: "text-davinci-002",
        // prompt: `Summarize this for a second-grade student:\n\n${req.body.txt}`,
        prompt: `${req.body.content}\n\n Tl;dr`,
        temperature: 0.7,
        max_tokens: 164,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    // console.log(summarize);
    console.log(summarize.data);
    res.status(200).json({ result: summarize.data.choices[0].text });
}
