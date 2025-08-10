import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'

type Venue = Database['public']['Tables']['venues']['Row']

export function TestSupabase() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVenues() {
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .limit(5)

      if (error) {
        console.error('Supabase error:', error)
      } else {
        setVenues(data ?? [])
      }

      setLoading(false)
    }

    fetchVenues()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>Supabase Test</h2>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id}>{venue.name} - {venue.address}</li>
        ))}
      </ul>
    </div>
  )
}
