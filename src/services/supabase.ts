import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase: SupabaseClient | null =
  url && publishableKey ? createClient(url, publishableKey) : null

export const FAVORITES_TABLE = 'favorites'

export type FavoriteRow = {
  pokemon_id: number
  created_at: string
}
