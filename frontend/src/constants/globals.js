const FILE = "file";

const MULTIFILE = "mutlifile";

const DROPDOWN = "dropdown";

const TEXT = "text";

const TEXTAREA = "textarea";

const NUMBER = "number";

const CATEGORIES = [
  {
    id: 1,
    label: 'Prove',
    type: FILE,
    value: null,
  },
  {
    id: 2,
    label: 'Proves',
    type: MULTIFILE,
    value: null
  },
  {
    id: 3,
    label: 'Bank',
    type: DROPDOWN,
    value: [{ label: 'BCA', value: 'bca' }]
  },
  {
    id: 4,
    label: 'Bank Account',
    type: TEXT,
    value: null
  },
  {
    id: 5,
    label: 'Remark',
    type: TEXTAREA,
    value: null
  },
  {
    id: 6,
    label: 'Amount',
    type: NUMBER,
    value: null
  }
]

export {
  CATEGORIES,
  FILE,
  MULTIFILE,
  DROPDOWN,
  TEXT,
  TEXTAREA,
  NUMBER
}
