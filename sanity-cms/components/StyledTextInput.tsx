import type { ObjectInputProps } from 'sanity'
import { set, unset, PatchEvent, ChangeIndicator } from 'sanity'
import { Flex, Box, Select, TextInput } from '@sanity/ui'
import { textStyles, type TextStyleValue } from '../schemaTypes/consts'

type StyledTextValue = { text?: string; style?: TextStyleValue }

type StyleOption = (typeof textStyles)[number]

function getStyleOptions(schemaType: ObjectInputProps['schemaType']): StyleOption[] {
  const styleField = schemaType.fields?.find((f) => f.name === 'style')
  const list = (styleField as { type?: { options?: { list?: StyleOption[] } } } | undefined)?.type?.options?.list
  return Array.isArray(list) ? (list as StyleOption[]) : []
}

export function StyledTextInput(props: ObjectInputProps<StyledTextValue>) {
  const { value = {}, onChange, schemaType, readOnly, path, changed, focused } = props
  const text = value.text ?? ''
  const style = value.style ?? ''
  const options = getStyleOptions(schemaType)

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextText = e.target.value
    onChange(nextText ? PatchEvent.from(set({ ...value, text: nextText })) : PatchEvent.from(unset(['text'])))
  }

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStyle = e.target.value
    onChange(nextStyle ? PatchEvent.from(set({ ...value, style: nextStyle })) : PatchEvent.from(unset(['style'])))
  }

  return (
    <ChangeIndicator path={path} hasFocus={focused ?? false} isChanged={changed}>
      <Flex gap={2} align="stretch">
        <Box style={{ flexShrink: 0 }}>
          <Select value={style} onChange={handleStyleChange} disabled={readOnly} fontSize={2} padding={3}>
            <option value=""> </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.title}
              </option>
            ))}
          </Select>
        </Box>
        <Box flex={1} style={{ minWidth: 0 }}>
          <TextInput
            value={text}
            onChange={handleTextChange}
            readOnly={readOnly}
            placeholder="Text"
            style={{ width: '100%' }}
          />
        </Box>
      </Flex>
    </ChangeIndicator>
  )
}
