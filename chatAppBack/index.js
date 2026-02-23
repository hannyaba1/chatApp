import "dotenv/config"
import express from "express"
import cors from "cors"
import { createChatRoutes } from "./src/routes/chatRoutes.js"
import { createOpenAIClient } from "./src/services/openaiService.js"
import { initDB } from "./src/db/database.js"

const app = express()

app.use(cors())
app.use(express.json())

const db = await initDB()
const openai = createOpenAIClient(process.env.OPENAI_API_KEY)
const PORT = process.env.PORT ?? 3001

app.use("/chat", createChatRoutes(db, openai))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})