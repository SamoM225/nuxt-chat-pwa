import { serverSupabaseClient } from '#supabase/server'
import { readBody } from 'h3'
import { ADMIN_UID } from '../../../utils/chat'

const sendFirstMessage = async (supabase: any, name: string, email: string, text: string) => {
  let { data: contact } = await supabase
    .from('contacts')
    .select('*')
    .eq('email', email)
    .single()

  if (!contact) {
    const { data: newContact, error: contactError } = await supabase
      .from('contacts')
      .insert([{ name, email }])
      .select()
      .single()

    if (contactError || !newContact) {
      return { error: 'Failed to create contact' }
    }

    contact = newContact
  }

  let { data: conversation } = await supabase
    .from('conversations')
    .select('*')
    .eq('contact_id', contact.id)
    .eq('operator_id', ADMIN_UID)
    .single()

  if (!conversation) {
    const { data: newConversation, error: convError } = await supabase
      .from('conversations')
      .insert([{ contact_id: contact.id, operator_id: ADMIN_UID }])
      .select()
      .single()

    if (convError || !newConversation) {
      return { error: 'Failed to create conversation' }
    }

    conversation = newConversation
  }

  const { error: msgError } = await supabase
    .from('messages')
    .insert([{
      conversation_id: conversation.id,
      sender_id: contact.id,
      receiver_id: ADMIN_UID,
      text
    }])

  if (msgError) {
    return { error: 'Failed to send message' }
  }

  return {
    conversationId: conversation.id,
    name: contact.name,
    email: contact.email,
    userId: contact.id
  }
}

const sendNextMessage = async (supabase: any, conversationId: string, text: string, senderId?: string, receiverId?: string) => {
  const { error } = await supabase
    .from('messages')
    .insert([{
      conversation_id: conversationId,
      sender_id: senderId ?? null,
      receiver_id: receiverId ?? ADMIN_UID,
      text
    }])

  if (error) {
    return { error: 'Failed to send message' }
  }

  return { ok: true }
}

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const body = await readBody(event)

  if (!body?.text) {
    event.node.res.statusCode = 400
    return { error: 'Missing text' }
  }

  if (body.conversationId) {
    const result = await sendNextMessage(
      supabase,
      body.conversationId,
      body.text,
      body.senderId,
      body.receiverId
    )

    if (result.error) {
      event.node.res.statusCode = 500
    }

    return result
  }

  if (!body.name || !body.email) {
    event.node.res.statusCode = 400
    return { error: 'Missing name or email for first message' }
  }

  const result = await sendFirstMessage(
    supabase,
    body.name,
    body.email,
    body.text
  )

  if (result.error) {
    event.node.res.statusCode = 500
  }

  return result
})
