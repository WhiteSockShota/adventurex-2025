interface Dialog {
  text: string
  options: Option[]
}

interface Option {
  text: string
  dialog: Dialog[]
}
