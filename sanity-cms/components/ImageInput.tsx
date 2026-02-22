import type { ObjectInputProps } from 'sanity'
import type { ImageValue } from '@sanity/types'
import { useSanityClient } from '../lib/sanityClient'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import { Card, Stack, Text, TextArea, Box } from '@sanity/ui'

type AssetData = {
  originalFilename?: string
  title?: string
  altText?: string
  description?: string
}

const ASSET_FIELDS = `*[_id == $id][0]{
  originalFilename,
  title,
  altText,
  description
}`

type EditableField = 'title' | 'altText' | 'description'

const METADATA_FIELDS: {
  key: EditableField
  label: string
  placeholder: string
  rows: number
}[] = [
  { key: 'title', label: 'Title', placeholder: 'Image title', rows: 1 },
  { key: 'altText', label: 'Alt text', placeholder: 'Describe the image for accessibility', rows: 1 },
  { key: 'description', label: 'Description', placeholder: 'Optional description', rows: 2 },
]

const DEBOUNCE_SAVE_MS = 1200

function applyEditFromEvent(
  e: ChangeEvent<HTMLTextAreaElement> | null,
  setEdit: Dispatch<SetStateAction<AssetData>>,
  field: EditableField
): void {
  const target = e?.currentTarget
  if (target == null) return
  const value = target.value
  setEdit((prev) => ({ ...prev, [field]: value }))
}

function saveField(
  client: ReturnType<typeof useSanityClient>,
  assetRef: string,
  field: keyof AssetData,
  value: string,
  onSuccess: (data: Partial<AssetData>) => void
): Promise<void> {
  if (field === 'originalFilename') return Promise.resolve()
  return client
    .patch(assetRef)
    .set({ [field]: value || undefined })
    .commit()
    .then(() => onSuccess({ [field]: value }))
}

export function ImageInput(props: ObjectInputProps<ImageValue>) {
  const client = useSanityClient()
  const assetRef = props.value?.asset && '_ref' in props.value.asset ? props.value.asset._ref : undefined
  const [assetData, setAssetData] = useState<AssetData | null>(null)
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState<AssetData>({})
  const [saving, setSaving] = useState(false)

  const fetchAsset = useCallback(() => {
    if (!assetRef) {
      setAssetData(null)
      setEdit({})
      return
    }
    setLoading(true)
    client
      .fetch<AssetData>(ASSET_FIELDS, { id: assetRef })
      .then((data) => {
        const d = data ?? null
        setAssetData(d)
        setEdit({
          title: d?.title ?? '',
          altText: d?.altText ?? '',
          description: d?.description ?? '',
        })
      })
      .finally(() => setLoading(false))
  }, [client, assetRef])

  useEffect(() => {
    fetchAsset()
  }, [fetchAsset])

  const editRef = useRef(edit)
  editRef.current = edit
  const assetDataRef = useRef(assetData)
  assetDataRef.current = assetData

  useEffect(() => {
    const hasDirty = METADATA_FIELDS.some(
      ({ key }) => (edit[key] ?? '') !== (assetData?.[key] ?? '')
    )
    if (!hasDirty || !assetRef || saving) return

    const timer = setTimeout(() => {
      const currentEdit = editRef.current
      const currentAsset = assetDataRef.current ?? {}
      const toSave = METADATA_FIELDS.filter(({ key }) => {
        const value = (currentEdit[key] ?? '') as string
        const server = (currentAsset[key] ?? '') as string
        return value !== server
      })
      if (toSave.length === 0) return

      setSaving(true)
      Promise.all(
        toSave.map(({ key }) => {
          const value = (currentEdit[key] ?? '') as string
          return saveField(client, assetRef!, key, value, (updated) => {
            setAssetData((prev) => (prev ? { ...prev, ...updated } : null))
          })
        })
      ).finally(() => setSaving(false))
    }, DEBOUNCE_SAVE_MS)

    return () => clearTimeout(timer)
  }, [edit, assetRef, assetData, saving, client])

  const handleBlur = useCallback(
    (field: keyof AssetData) => {
      if (!assetRef || saving) return
      const current = assetData?.[field] ?? ''
      const value = (editRef.current[field] ?? '') as string
      if (value === current) return
      setSaving(true)
      saveField(client, assetRef, field, value, (updated) => {
        setAssetData((prev) => (prev ? { ...prev, ...updated } : null))
      }).finally(() => setSaving(false))
    },
    [assetRef, assetData, client, saving]
  )

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      {assetRef && (
        <Card padding={3} radius={2} tone="transparent">
          <Stack space={3}>
            <Text size={1} weight="semibold">
              Asset metadata
            </Text>
            {loading ? (
              <Text size={1} muted>
                Loading…
              </Text>
            ) : (
              <Stack space={3}>
                {assetData?.originalFilename != null && assetData.originalFilename !== '' && (
                  <Box>
                    <Text size={0} weight="medium" style={{ marginBottom: 6 }} muted>
                      Filename
                    </Text>
                    <Text size={1}>{assetData.originalFilename}</Text>
                  </Box>
                )}
                {METADATA_FIELDS.map(({ key, label, placeholder, rows }) => (
                  <Box key={key}>
                    <Text size={0} weight="medium" style={{ marginBottom: 4 }} muted>
                      {label}
                    </Text>
                    <TextArea
                      value={edit[key] ?? ''}
                      onChange={(e) => applyEditFromEvent(e, setEdit, key)}
                      onBlur={() => handleBlur(key)}
                      placeholder={placeholder}
                      rows={rows}
                    />
                  </Box>
                ))}
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <Text size={0} muted>
                    Stored on the asset and shared wherever this image is used. You can also edit in the Media tab.
                  </Text>
                  {saving && (
                    <Text size={0} muted>
                      Saving…
                    </Text>
                  )}
                </Box>
              </Stack>
            )}
          </Stack>
        </Card>
      )}
    </Stack>
  )
}
