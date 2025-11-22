import { serverSupabaseClient } from '#supabase/server'
import { getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const { operatorId } = getQuery(event)

  const { data, error } = await supabase
    .from('conversations')
    .select('id, created_at, contacts(name, email)')
    .eq('operator_id', operatorId as string)
    .order('created_at', { ascending: false })

  if (error) {
    event.node.res.statusCode = 500
    return { error: error.message }
  }

  const conversations = (data ?? []).map((c: any) => ({
    id: c.id,
    contactName: c.contacts?.name ?? 'Neznámy',
    contactEmail: c.contacts?.email ?? '',
    createdAt: c.created_at
  }))

  return { conversations }
})
