import Dropdown from "../Dropdown";
import Label from "../Label";
import TextArea from "../TextArea";
import TextInput from "../TextInput";
import { DROPDOWN, FILE, MULTIFILE, NUMBER, TEXT, TEXTAREA } from "@/constants/globals";

const ExtraFields = ({ extraFields }) => {
  const renderInputBaseOnCategory = (category) => {
    const { type, id, label, value } = category;
    if (type === FILE) {
      return <TextInput
        key={id}
        name={`${label}-${id}`}
        autoComplete={label}
        value={null}
        id={id}
        inputType={'file'}
      />
    }
    if (type === MULTIFILE) {
      return <TextInput
        key={id}
        name={`${label}-${id}`}
        value={null}
        autoComplete={label}
        id={id}
        inputType={'file'}
        additionalProps={{ multiple: true }}
      />
    }
    if (type === TEXTAREA) {
      return <TextArea
        id={label}
        name={label}
      />
    }
    if (type === TEXT) {
      return <TextInput
        key={id}
        name={`${label}-${id}`}
        value={null}
        autoComplete={label}
        id={id}
        inputType={'text'}
      />
    }
    if (type === DROPDOWN) {
      return <Dropdown
        name={"category"}
        id={"category"}
        onChangeEvent={onChangeCategories}
        options={value}
      />
    }
    if (type === NUMBER) {
      return <TextInput
        key={id}
        name={`${label}-${id}`}
        value={null}
        autoComplete={label}
        id={id}
        inputType={'number'}
      />
    }
  };

  return extraFields.length > 0
    && extraFields.map(field => (
      <>
        <div className="sm:col-span-3">
          <Label name={'Field Name'} />
          <div className="mt-2">
            <input type="text" name="first-name" id="first-name" autocomplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
