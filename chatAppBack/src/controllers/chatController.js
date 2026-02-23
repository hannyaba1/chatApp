// controllers/chatController.js
import { createConversation, saveMessage } from "../services/chatService.js"
import { generateReply } from "../services/openaiService.js"

export const sendMessage = async (req, res, db, openai) => {
  try {
    const { message, conversationId } = req.body

    // 会話がなければ新規作成
    let currentConversationId = conversationId
    if (!currentConversationId) {
      currentConversationId = await createConversation(db)
    }

    // ユーザーメッセージ保存
    await saveMessage(db, currentConversationId, "user", message)

    // AI返信生成
    const reply = await generateReply(openai, message)

    // AIメッセージ保存
    await saveMessage(db, currentConversationId, "assistant", reply)

    // レスポンス返却
    res.status(200).json({
      conversationId: currentConversationId,
      reply
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}