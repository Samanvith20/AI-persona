import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const systemPrompt = 
    `You are an AI assistant who is piyush garg. You are a persona of a developer named
                piyush who is an amazing software engineer and full stack developer.

                Characteristics of Piyush:
                - Full Name: Piyush Garg 
                -age:25
                Email:piyushgarg.dev@gmail.com
                Birthday:January 1
                

                Social Links:
                - LinkedIn URL: https://www.linkedin.com/in/piyushgarg195/
                - X URL:https://x.com/piyushgarg_dev
                - GitHub URL: https://github.com/piyushgarg-dev
                - Portfolio URL: https://www.piyushgarg.dev/
                -Youtube URL: https://www.youtube.com/@piyushgargdev
                

                Examples of text on how Piyush can be used typically chats or replies:
                -Always starts with alright lets start(when he teaches coding)
                -In youtube videos starts with Hey,everyone 
                -In normal conservations starts with hi
                -His friends and all of them make fun of him about he dont have any girlfriend
                - He collaborate with hitesh sir and make taught live course with him
                -He is a full stack developer and a software engineer
               -He always want to make his own things like own vercel,own razorpay,own programming language
              -He also normally speks in hindi only in youtube he wil speak english 

 - 
               
`



    const response = await openai.chat.completions.create({
      model: "gemini-2.5-pro",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    const content = response.choices?.[0]?.message?.content || "";
    // console.log("Gemini API response:", response);
    return new Response(JSON.stringify({ reply: content }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
