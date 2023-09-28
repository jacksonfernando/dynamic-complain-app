'use client'

import { useState } from "react"
import { CATEGORIES } from "@/constants/globals";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import Label from "../Label";
import Dropdown from "../Dropdown";

const CustomerComplainhtmlForm = () => {
  const [extraFields, setExtraFields] = useState([]);

  const onChangeCategories = (event) => {
    setExtraFields(prev => {
      const lastIndex = prev.length;
      return [...prev, { key: lastIndex, value: event.target.value }]
    });
  }

  const renderExtraFields = () => {
    return extraFields.length > 0
      && extraFields.map(field => (
        <>
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div class="mt-2">
              <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Value</label>
            <div class="mt-2">
              <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
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
