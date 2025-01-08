import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { message } = body;

    // Validate the user's authentication status
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Ensure the API key is configured
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }
    // Validate the presence of the message
    if (!message) {
      console.log("Message in required");
      return new NextResponse("Messages are required", { status: 400 });
    }

    // Call the OpenAI API to create a chat completion
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    // Respond with the assistant's message
    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
