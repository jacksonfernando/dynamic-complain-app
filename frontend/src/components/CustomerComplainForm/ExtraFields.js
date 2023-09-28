import Dropdown from "../Dropdown";
import Label from "../Label";
import TextArea from "../TextArea";
import TextInput from "../TextInput";
import { DROPDOWN, FILE, MULTIFILE, NUMBER, TEXT, TEXTAREA } from "@/constants/globals";

const ExtraFields = ({ fields, register }) => {
  const renderInputBaseOnCategory = (field, index) => {
    const { id, value, type, label } = field;
    const registerKey = register(`extraFields.${index}.value`, { required: true });

    const customKey = id;
    if (type === FILE) {
      return <TextInput
        key={customKey}
        name={customKey}
        id={customKey}
        autoComplete={label}
        value={null}
        inputType={'file'}
        additionalProps={{ ...registerKey }}
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
        additionalProps={{
          ...registerKey,
          multiple: true
        }}
      />
    }
    if (type === TEXTAREA) {
      return <TextArea
        key={customKey}
        name={customKey}
        id={customKey}
        additionalProps={{ ...registerKey }}
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
        additionalProps={{ ...registerKey }}
      />
    }
    if (type === DROPDOWN) {
      return <Dropdown
        key={customKey}
        name={customKey}
        id={customKey}
        onChangeEvent={() => { }}
        options={value}
        additionalProps={{ ...registerKey }}
      />
    }
    if (type === NUMBER) {
      return <TextInput
        key={customKey}
        name={customKey}
        id={customKey}
        autoComplete={label}
        inputType={'number'}
        additionalProps={{ ...registerKey }}
      />
    }
  };

  return fields.map((field, index) => (
    <>
      <div className="sm:col-span-3" >
        <Label name={'Field Name'} />
        <div className="mt-2">
          <TextInput
            key={field.id}
            name={'field-name'}
            inputType={'text'}
            autoComplete={'field-name'}
            additionalProps={{ ...register(`extraFields.${index}.fieldName`, { required: true }) }}
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <Label name={'Value'} />
        <div className="mt-2">
          {renderInputBaseOnCategory(field, index)}
        </div>
      </div>
    </>
  ))
}

export default ExtraFields
