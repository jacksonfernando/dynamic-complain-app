import Dropdown from "../Dropdown";
import Label from "../Label";
import TextArea from "../TextArea";
import TextInput from "../TextInput";
import { DROPDOWN, FILE, MULTIFILE, NUMBER, TEXT, TEXTAREA } from "@/constants/globals";

const ExtraFields = ({ extraFields }) => {
  const renderInputBaseOnCategory = (category) => {
    const { type, id, label, value, key } = category;
    const customKey = `extraFields-input-${key}`;

    if (type === FILE) {
      return <TextInput
        key={customKey}
        name={customKey}
        id={customKey}
        autoComplete={label}
        value={null}
        inputType={'file'}
      />
    }
    if (type === MULTIFILE) {
      return <TextInput
        key={customKey}
        name={customKey}
        id={customKey}
        value={null}
        autoComplete={label}
        inputType={'file'}
        additionalProps={{ multiple: true }}
      />
    }
    if (type === TEXTAREA) {
      return <TextArea
        key={customKey}
        name={customKey}
        id={customKey}
      />
    }
    if (type === TEXT) {
      return <TextInput
        key={customKey}
        name={customKey}
        id={customKey}
        value={null}
        autoComplete={label}
        inputType={'text'}
      />
    }
    if (type === DROPDOWN) {
      return <Dropdown
        key={customKey}
        name={customKey}
        id={customKey}
        onChangeEvent={() => { }}
        options={value}
      />
    }
    if (type === NUMBER) {
      return <TextInput
        key={customKey}
        name={customKey}
        id={customKey}
        autoComplete={label}
        inputType={'number'}
      />
    }
  };

  return extraFields.length > 0 && extraFields.map(field => (
    <>
      <div className="sm:col-span-3" >
        <Label name={'Field Name'} />
        <div className="mt-2">
          <TextInput
            key={`extraFields-name-${field.key}`}
            name={'field-name'}
            inputType={'text'}
            autoComplete={'field-name'}
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <Label name={'Value'} />
        <div className="mt-2">
          {renderInputBaseOnCategory(field)}
        </div>
      </div>
    </>
  ))
}

export default ExtraFields
