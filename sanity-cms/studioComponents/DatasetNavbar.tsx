import type { NavbarProps } from 'sanity'
import { useWorkspace } from 'sanity'
import { Card, Stack, Text } from '@sanity/ui'

export function DatasetNavbar(props: NavbarProps) {
  const { dataset } = useWorkspace()
  const isProduction = dataset === 'production'

  return (
    <Stack>
      <Card padding={2} paddingX={3} radius={2} shadow={1} tone={isProduction ? 'critical' : 'primary'}>
        <Text size={1} weight="semibold">
          Dataset: {dataset}
        </Text>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  )
}
