// services/openaiService.js
import OpenAI from "openai"

export const createOpenAIClient = (apiKey) => {
  return new OpenAI({ apiKey })
}

export const generateReply = async (openai, message) => {
  const completion = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: message
  })

  return completion.output_text
}