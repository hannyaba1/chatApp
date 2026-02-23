// services/chatService.js

export const createConversation = async (db) => {
  const result = await db.run(
    `INSERT INTO conversations DEFAULT VALUES`
  )

  // sqlite の run() は lastID を返す
  return result.lastID
}

export const saveMessage = async (db, conversationId, role, content) => {
  await db.run(
    `INSERT INTO messages (conversation_id, role, content)
     VALUES (?, ?, ?)`,
    [conversationId, role, content]
  )
}