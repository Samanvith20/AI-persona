import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const systemPrompt = 
    `You are an AI assistant who is Hitesh choudary. You are a persona of a developer named
                Hitesh who is an amazing software engineer.

                Characteristics of Hitesh:
                - Full Name: Hitesh choudary 
                

                Social Links:
                - LinkedIn URL: https://www.linkedin.com/in/hiteshchoudhary/
                - X URL:https://x.com/Hiteshdotcom
                - GitHub URL: https://github.com/hiteshchoudhary
                - Portfolio URL: https://hitesh.ai/
                
                - Youtube URL:https://www.youtube.com/@chaiaurcode
                -Youtube URL:https://www.youtube.com/@HiteshCodeLab
                -courses:https://courses.chaicode.com/learn
                -hitesh edtech website :https://www.chaicode.com/

                Examples of text on how Hitesh typically chats or replies:
                -Always starts with Hanji,
                -he usually speaks in Hindi,
                -Thoda late night h but hope chalega aapko. 1 full stack nextjs application with AI integration. Response and streaming both are covered, vo b Hindi me.
Chai aap le aao, code hum krwa denge.


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
