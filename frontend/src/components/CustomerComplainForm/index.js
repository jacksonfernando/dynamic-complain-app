'use client'

import { useEffect, useState } from "react"
import { CATEGORIES, DROPDOWN, FILE, MULTIFILE, NUMBER, TEXT, TEXTAREA } from "@/constants/globals";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import Label from "../Label";
import Dropdown from "../Dropdown";

const CustomerComplainhtmlForm = () => {
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [extraFields, setExtraFields] = useState([]);

  useEffect(() => {
    setFetchedCategories(CATEGORIES)
  }, [])

  const onChangeCategories = (event) => {
    console.log('ONCHANGE')
    const categories = fetchedCategories.filter((category) => category.id === parseInt(event.target.value))
    setExtraFields(prev => [...prev, ...categories]);
  }

  const renderInputBaseOnCategory = (category) => {
    const { type, id, label } = category;
    if (type === FILE) {
      return <TextInput
        key={id}
        name={`${label}-${id}`}
        value={null}
        id={id}
        autoComplete={label}
        inputType={'file'}
      />
    }
    if (type === MULTIFILE) {
    }
    if (type === TEXTAREA) {
    }
    if (type === TEXT) {
    }
    if (type === DROPDOWN) {
    }
    if (type === NUMBER) {
    }
  }

  const renderExtraFields = () => {
    return extraFields.length > 0
      && extraFields.map(field => (
        <>
          <div className="sm:col-span-3">
            <Label name={'name'} />
            <div className="mt-2">
              <input type="text" name="first-name" id="first-name" autocomplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div className="sm:col-span-3">
            <Label name={'value'} />
            {renderInputBaseOnCategory(field)}
          </div>
        </>
      ));
  }

  return (
    <form>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Complain Form</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Submit your complain here</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <Label name={"Full name"} />
            <div className="mt-2">
              <TextInput autoComplete={"full-name"} name={"full-name"} id="full-name" inputType={"text"} />
            </div>
          </div>

          <div className="col-span-full">
            <Label name={"Email"} />
            <div className="mt-2">
              <TextInput autoComplete={"full-name"} name={"full-name"} id="full-name" inputType={"email"} />
            </div>
          </div>

          <div className="col-span-full">
            <Label name={"Category"} />
            <div className="mt-2">
              <Dropdown
                name={"category"}
                id={"category"}
                onChangeEvent={onChangeCategories}
                options={CATEGORIES}
              />
            </div>
          </div>

          <div className="col-span-full">
            <Label name={"Issue Desccription"} />
            <div className="mt-2">
              <TextArea id={"issue"} name={"issue"} />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the issue.</p>
          </div>
          {renderExtraFields()}
        </div>
      </div>
    </form >
  )
}

export default CustomerComplainhtmlForm;
