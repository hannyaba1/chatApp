// routes/chatRoutes.js
import express from "express"
import { sendMessage } from "../controllers/chatController.js"

export const createChatRoutes = (db, openai) => {
  const router = express.Router()

  router.post("/", (req, res) =>
    sendMessage(req, res, db, openai)
  )

  return router
}