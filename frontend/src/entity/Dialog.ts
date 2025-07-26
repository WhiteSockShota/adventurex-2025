export interface Dialog {
  text: string
  options: Option[]
  nextId: string | undefined
  nextPage: string | undefined
  id: string | undefined
}

export interface Option {
  text: string
  jumpToId: string
  tag: string[] | undefined
  emit: string | undefined
}

export function createDialog(partial: Partial<Dialog>): Dialog {
  return {
    text: partial.text ?? '',
    options: partial.options ?? [],
    nextPage: partial.nextPage ?? undefined,
    nextId: partial.nextId ?? undefined,
    id: partial.id ?? undefined,
  }
}

export function createOption(partial: Partial<Option>): Option {
  return {
    text: partial.text ?? '',
    jumpToId: partial.jumpToId ?? '',
    tag: partial.tag ?? [],
    emit: partial.emit,
  }
}
