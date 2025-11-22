import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  if (!user) {
    event.node.res.statusCode = 401
    return { role: null, error: 'no_user' }
  }

  const { data, error }  = await supabase.from('user_profiles').select('role, aboutme, username, first_name, last_name').eq('id', user.sub).single()
  
  if (error || !data || typeof data !== 'object' || !('role' in data)) {
    event.node.res.statusCode = 404
    return { role: null, error: error?.message || 'not_found' }
  }

  return { role: (data as any).role, aboutme: (data as any).aboutme, username: (data as any).username, firstName: (data as any).first_name, lastName: (data as any).last_name }
})
