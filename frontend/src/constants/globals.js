const FILE = "file";

const MULTIFILE = "multifile";

const DROPDOWN = "dropdown";

const TEXT = "text";

const TEXTAREA = "textarea";

const NUMBER = "number";

const COMPLAIN_MS_ENDPOINT = '/api/v1'

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

const CATEGORY_OPTIONS = [
  {
    id: 1,
    label: 'Single file image',
    value: FILE,
  },
  {
    id: 2,
    label: 'Multiple file image',
    value: MULTIFILE,
  },
  {
    id: 3,
    label: 'Dropdown selection',
    value: DROPDOWN,
  },
  {
    id: 4,
    label: 'Text',
    value: TEXT,
  },
  {
    id: 5,
    label: 'Textarea',
    value: TEXTAREA,
  },
  {
    id: 6,
    label: 'Number',
    value: NUMBER,
  }
]


export {
  CATEGORIES,
  FILE,
  MULTIFILE,
  DROPDOWN,
  TEXT,
  TEXTAREA,
  NUMBER,
  COMPLAIN_MS_ENDPOINT,
  CATEGORY_OPTIONS
}
