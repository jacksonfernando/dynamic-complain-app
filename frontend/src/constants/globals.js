const FILE = "file";

const MULTIFILE = "mutlifile";

const DROPDOWN = "dropdown";

const TEXT = "text";

const TEXTAREA = "textarea";

const NUMBER = "number";

const CATEGORIES = [
  {
    id: 1,
    label: 'Single file image',
    type: FILE,
    value: null,
  },
  {
    id: 2,
    label: 'Multiple file image',
    type: MULTIFILE,
    value: null
  },
  {
    id: 3,
    label: 'Dropdown selection',
    type: DROPDOWN,
    value: [{ label: 'BCA', value: 'bca' }]
  },
  {
    id: 4,
    label: 'Text',
    type: TEXT,
    value: null
  },
  {
    id: 5,
    label: 'Textarea',
    type: TEXTAREA,
    value: null
  },
  {
    id: 6,
    label: 'Number',
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
