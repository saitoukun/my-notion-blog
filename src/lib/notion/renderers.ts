import React from 'react'
import components from 'components/dynamic'

function applyTags(
  tags: any[] = [],
  children: any,
  noPTag: boolean = false,
  key: number
) {
  let child = children

  for (const tag of tags) {
    const props: { [key: string]: any } = { key }
    let tagName = tag[0]

    if (noPTag && tagName === 'p') tagName = React.Fragment
    if (tagName === 'c') tagName = 'code'

    if (tagName === 'a') {
      props.href = tag[1]
    }

    const index: keyof typeof components = tag[0]
    child = React.createElement(components[index] || tagName, props, child)
  }
  return child
}

export function textBlock(
  text: any[] = [],
  noPTag: boolean = false,
  mainKey: any
) {
  const children = []
  let key: number = 0

  for (const textItem of text) {
    key++
    if (textItem.length === 1) {
      children.push(textItem)
      continue
    }
    children.push(applyTags(textItem[1], textItem[0], noPTag, key))
  }
  return React.createElement(
    noPTag ? React.Fragment : components.p,
    { key: mainKey },
    ...children,
    noPTag
  )
}
