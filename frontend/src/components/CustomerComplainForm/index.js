'use client'

import { useEffect, useState } from "react"
import { CATEGORIES } from "@/constants/globals";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import Label from "../Label";
import Dropdown from "../Dropdown";
import ExtraFields from "./ExtraFields";
import Button from "../Button";
import { useForm, useFieldArray } from "react-hook-form";

const CustomerComplainForm = () => {
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      categories: fetchedCategories,
      extraFields: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "extraFields",
    rules: {
      required: true
    }
  })

  useEffect(() => {
    setFetchedCategories(CATEGORIES)
  }, [])

  const onSubmit = (data) => {
    console.log(data)
  }

  const onChangeCategories = (event) => {
    const category = fetchedCategories
      .find((category) => category.id === parseInt(event.target.value))
    append(category)
  }

  const renderFullNameSection = () => (
    <>
      <div className="col-span-full">
        <Label name={"Full name"} />
        <div className="mt-2">
          <TextInput
            autoComplete={"full-name"}
            name={"full-name"}
            id="full-name"
            inputType={"text"}
            additionalProps={{ ...register("fullName", { required: true }) }}
          />
        </div>
      </div>
    </>
  )

  const renderEmailSection = () => (
    <div className="col-span-full">
      <Label name={"Email"} />
      <div className="mt-2">
        <TextInput
          autoComplete={"Email"}
          name={"email"}
          id="email"
          inputType={"email"}
          additionalProps={{ ...register("email", { required: true }) }}
        />
      </div>
    </div>
  )

  const renderCategoriesSection = () => (
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
  )

  const renderIssueDescriptionSection = () => (
    <div className="col-span-full">
      <Label name={"Issue Desccription"} />
      <div className="mt-2">
        <TextArea id={"issue"} name={"issue"} />
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the issue.</p>
    </div>
  )


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Complain Form</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Submit your complain here</p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {renderFullNameSection()}
          {renderEmailSection()}
          {renderCategoriesSection()}
          {renderIssueDescriptionSection()}
          <ExtraFields
            fields={fields}
            control={control}
            register={register}
          />
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <Button text={'save'} type={'submit'} />
      </div>
    </form >
  )
}

export default CustomerComplainForm;
