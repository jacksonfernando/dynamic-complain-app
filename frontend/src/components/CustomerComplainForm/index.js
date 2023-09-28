'use client'

import { useEffect, useState } from "react"
import { CATEGORIES } from "@/constants/globals";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import Label from "../Label";
import Dropdown from "../Dropdown";
import ExtraFields from "./ExtraFields";

const CustomerComplainhtmlForm = () => {
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [extraFields, setExtraFields] = useState([]);

  useEffect(() => {
    setFetchedCategories(CATEGORIES)
  }, [])

  const onChangeCategories = (event) => {
    const categories = fetchedCategories
      .filter((category) => category.id === parseInt(event.target.value))
    setExtraFields(prev => [...prev, ...categories]);
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
          <ExtraFields extraFields={extraFields} />
        </div>
      </div>
    </form >
  )
}

export default CustomerComplainhtmlForm;
