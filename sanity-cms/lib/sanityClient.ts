import { useWorkspace } from 'sanity'
import { useMemo } from 'react'

export const SANITY_API_VERSION = '2025-02-19'

export function useSanityClient() {
  const workspace = useWorkspace()
  return useMemo(() => workspace.getClient({ apiVersion: SANITY_API_VERSION }), [workspace])
}
