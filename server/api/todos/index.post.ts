import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const body = await readBody(event)

  const { data, error } = await supabase
    .from('todos')
    .insert([{ title: body.title }])
    .select()

  if (error) {
    event.node.res.statusCode = 500
    return { error: error.message }
  }

  return { data }
})
