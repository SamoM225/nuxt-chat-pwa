import { serverSupabaseClient } from '#supabase/server'
import { getQuery } from 'h3'

/**
 * Funkcia, ktorá vráti konverzácie pre daného operátora.
 * Operátor je identifikovaný pomocou jeho uid, ktorý je odoslaný ako parameter 'operatorId' v URL.
 * Ak je parameter 'operatorId' chybný, funkcia vráti chybovú stav 400.
 * Ak nastáva chyba pri čítaní konverzácií, funkcia vráti chybovú stav 500.
 * Inak funkcia vráti pole 'conversations', ktoré obsahuje konverzácie pre daného operátora.
 * Každá konverzácia obsahuje id konverzácie, meno kontakt a email kontakt.
 */
export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const { operatorId } = getQuery(event)

  // Ak je parameter 'operatorId' chybný, funkcia vráti chybovú stav 400.
  if (!operatorId || typeof operatorId !== 'string') {
    event.node.res.statusCode = 400
    return { error: 'Chýba: Missing operatorId' }
  }

  // Načítanie konverzácií pre daného operátora.
  const { data, error } = await supabase
    .from('conversations')
    .select('id, contact:contacts ( name, email )')
    .eq('operator_id', operatorId)
    .order('created_at', { ascending: false })

  // Ak nastáva chyba pri čítaní konverzácií, funkcia vráti chybovú stav 500.
  if (error) {
    event.node.res.statusCode = 500
    return { error: error.message }
  }

  // Transformácia konverzácií do požadovaného tvaru.
  const conversations = (data ?? []).map((conversation) => ({
    id: conversation.id,
    contactName: conversation.contact?.name ?? 'Unknown',
    contactEmail: conversation.contact?.email ?? '—'
  }))

  return { conversations }
})

