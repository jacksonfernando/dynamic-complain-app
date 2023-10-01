'use client'

import { useEffect, useState } from 'react'
import { CATEGORIES, COMPLAIN_MS_ENDPOINT, FILE, MULTIFILE } from '@/constants/globals';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import Label from '../Label';
import Dropdown from '../Dropdown';
import ExtraFields from './ExtraFields';
import Button from '../Button';
import { useForm, useFieldArray } from 'react-hook-form';
import useFetchData from '@/hooks/useFetchData';
import axios from 'axios';

const CustomerComplainForm = () => {
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const { control, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      issueDescription: '',
      categories: fetchedCategories,
      extraFields: []
    }
  });
  const { data, loading } = useFetchData(`/api/categories`);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'extraFields',
  })

  const { ref, onBlur, name: categoriesName } = register('categories');

  useEffect(() => {
    if (!loading) {
      setFetchedCategories(data.categories || CATEGORIES)
    }
  }, [loading])

  const uploadFile = async (files) => {
    if (files.length <= 0) return;
    const formData = new FormData();
    Array.from(files[0]).forEach((file) => formData.append('files', file));
    await axios.post(`/api/files`, formData);
  }

  const onSubmit = async (data) => {
    const files = [];
    data.extraFields.value = data.extraFields.forEach(field => {
      if (field.type == FILE || field.type == MULTIFILE) {
        files.push(field.value);
        field.value = field.value[0].name;
      }
      return field.value;
    })
    await uploadFile(files)
    await axios.post(`/api/complains`, data);
  }

  const renderErrorText = (error, label) => {
    return error?.type === 'required' && (
      <p className='text-red-600'>{`${label} is required`}</p>
    )
  }

  const onChangeCategories = (event) => {
    const category = fetchedCategories
      .find((category) => category.id === parseInt(event.target.value))
    append(category)
  }

  const renderFullNameSection = () => (
    <>
      <div className='col-span-full'>
        <Label name={'Full name'} />
        <div className='mt-2'>
          <TextInput
            autoComplete={'full-name'}
            id='full-name'
            inputType={'text'}
            additionalProps={{ ...register('fullName', { required: true }) }}
          />
        </div>
        {renderErrorText(errors.fullName, 'Full name')}
      </div>
    </>
  )

  const renderEmailSection = () => (
    <div className='col-span-full'>
      <Label name={'Email'} />
      <div className='mt-2'>
        <TextInput
          autoComplete={'Email'}
          inputType={'email'}
          additionalProps={{ ...register('email', { required: true }) }}
        />
      </div>
      {renderErrorText(errors.email, 'Email')}
    </div>
  )

  const renderCategoriesSection = () => (
    <div className='col-span-full'>
      <Label name={'Category'} />
      <div className='mt-2'>
        <Dropdown
          id={categoriesName}
          name={categoriesName}
          options={fetchedCategories}
          onChange={onChangeCategories}
          additionalProps={{ ref: ref, onBlur: onBlur }}
        />
      </div>
    </div>
  )

  const renderIssueDescriptionSection = () => (
    <div className='col-span-full'>
      <Label name={'Issue Description'} />
      <div className='mt-2'>
        <TextArea
          name={'issue'}
          additionalProps={{ ...register('issueDescription', { required: true }) }}
        />
      </div>
      {renderErrorText(errors.issueDescription, 'Issue Description')}
      <p className='mt-3 text-sm leading-6 text-gray-600'>Write a few sentences about the issue.</p>
    </div>
  )


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='border-b border-gray-900/10 pb-12'>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>Complain Form</h2>
        <p className='mt-1 text-sm leading-6 text-gray-600'>Submit your complain here</p>
        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
          {renderFullNameSection()}
          {renderEmailSection()}
          {renderCategoriesSection()}
          {renderIssueDescriptionSection()}
          <ExtraFields
            fields={fields}
            control={control}
            register={register}
            errors={errors}
            remove={remove}
          />
        </div>
      </div>
      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <Button text={'save'} type={'submit'} />
      </div>
    </form >
  )
}

export default CustomerComplainForm;
