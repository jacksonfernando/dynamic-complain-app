import Label from "@/components/Label";
import TextInput from "@/components/TextInput";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ExtraFieldsCategories = ({ fields, register, errors, remove }) => {
  const renderErrorText = (error, label) => {
    return error?.type === 'required' && (
      <p className='text-red-600'>{`${label} is required`}</p>
    )
  }

  const renderFieldNameAndValue = () => {
    return fields.map((field, index) => {
      const { id, label, value } = field;
      return (
        <>
          <div className="sm:col-span-2" >
            <Label
              name={'Dropdown label'}
              key={`label-${id}`}
            />
            <div className="mt-2">
              <TextInput
                key={id}
                name={'field-name'}
                value={label}
                inputType={'text'}
                autoComplete={'field-name'}
                additionalProps={{ ...register(`value.${index}.label`, { required: true }) }}
              />
              {renderErrorText(errors?.value?.[index]?.label, 'Label')}
            </div>
          </div>
          <div className="sm:col-span-3" >
            <Label
              name={'Dropdown value'}
              key={`label-${id}`}
            />
            <div className="mt-2">
              <TextInput
                key={id}
                name={id}
                id={id}
                value={value}
                autoComplete={label}
                inputType={'text'}
                additionalProps={{ ...register(`value.${index}.value`, { required: true }) }}
              />
              {renderErrorText(errors?.value?.[index]?.value, 'Value')}
            </div>
          </div>
          <div className="sm:col-span-1 mt-8" >
            <IoIosCloseCircleOutline
              size={30}
              color="red"
              onClick={() => remove(index)}
            />
          </div>
        </>
      )
    })
  }

  return (
    <>
      {renderFieldNameAndValue()}
    </>
  )
}

export default ExtraFieldsCategories
