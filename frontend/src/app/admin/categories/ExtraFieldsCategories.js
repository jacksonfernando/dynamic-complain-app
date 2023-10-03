import Label from "@/components/Label";
import TextInput from "@/components/TextInput";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ExtraFieldsCategories = ({ fields, register, errors, remove }) => {
  const renderInputBaseOnCategory = (field, index) => {
    const { id, value, type, label, options } = field;
    const registerKey = register(`extraFields.${index}.value`, { required: true });
    const customKey = id;
    return <TextInput
      key={customKey}
      name={customKey}
      id={customKey}
      value={null}
      autoComplete={label}
      inputType={'text'}
      additionalProps={{ ...registerKey }}
    />
  };

  const renderErrorText = (error, label) => {
    return error?.type === 'required' && (
      <p className='text-red-600'>{`${label} is required`}</p>
    )
  }

  return fields.map((field, index) => {
    const { id, label } = field;
    return (
      <>
        <div className="sm:col-span-2" >
          <Label
            name={'Field Name'}
            key={`label-${id}`}
          />
          <div className="mt-2">
            <TextInput
              key={id}
              name={'field-name'}
              inputType={'text'}
              autoComplete={'field-name'}
              additionalProps={{ ...register(`extraFields.${index}.fieldName`, { required: true }) }}
            />
            {renderErrorText(errors?.extraFields?.[index]?.fieldName, 'Field name')}
          </div>
        </div>
        <div className="sm:col-span-3" >
          <Label
            name={'Value'}
            key={`label-${id}`}
          />
          <div className="mt-2">
            {renderInputBaseOnCategory(field, index)}
          </div>
          {renderErrorText(errors?.extraFields?.[index]?.value, label)}
        </div>
        <div className="sm:col-span-1 mt-8" >
          <IoIosCloseCircleOutline
            size={40}
            color="red"
            onClick={() => remove(index)}
          />
        </div>
      </>
    )
  })
}

export default ExtraFieldsCategories
