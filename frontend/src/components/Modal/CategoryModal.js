import Label from '../Label';
import TextInput from '../TextInput';
import { useFieldArray, useForm } from 'react-hook-form';
import SuccessAlert from '../Alert/SuccessAlert';
import { useEffect, useState } from 'react';
import { CATEGORY_OPTIONS, DROPDOWN } from '@/constants/globals';
import ExtraFieldDropdown from '../Dropdown/ExtraFieldDropdown';
import ExtraFieldsCategories from '@/app/admin/categories/ExtraFieldsCategories';
import axios from 'axios';
import Cookies from 'js-cookie';
import { delay } from 'lodash';

const CategoryModal = ({ open, setOpen, defaultValues, mode, refetch }) => {
  const [successSubmitAlert, setSuccessSubmitAlert] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);

  const renderErrorText = (error, label) => {
    return error?.type === 'required' && (
      <p className='text-red-600'>{`${label} is required`}</p>
    )
  }

  const { setValue, control, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: 'value'
  })

  useEffect(() => {
    const { label, type, value, id } = defaultValues;
    remove();
    setValue('id', id);
    setValue('label', label)
    setValue('type', type)
    setValue('value', value)
  }, [defaultValues])

  const { ref, onBlur, name: typeName } = register('type');


  const onSubmit = async (data) => {
    const ADD_OPERATION = 'add'
    data.value = data.type != DROPDOWN ? null : data.value;
    try {
      const token = Cookies.get('token')
      if (mode == ADD_OPERATION) {
        await axios.post('/api/categories', data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setSuccessSubmitAlert(true)
        refetch();
        return delay(() => setSuccessSubmitAlert(false), 1000);
      }
      await axios.put(`/api/categories/${data.id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setSuccessSubmitAlert(true)
      refetch();
      return delay(() => setSuccessSubmitAlert(false), 1000);
    } catch (error) {
      alert('Failed')
    }
  }

  const onChangeDropdown = (event) => {
    const category = CATEGORY_OPTIONS
      .find((category) => category.value === event.target.value)
    if (category.value == DROPDOWN) {
      setShowAddButton(true);
      return append({ label: null, value: null });
    }
    setShowAddButton(false);
    remove();
  }

  const renderAddButton = () => {
    return showAddButton && (
      <div className='mt-5'>
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => append({ label: null, value: null })}
        >
          Add</button>
      </div>
    );
  }

  return open && (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>

              <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                {successSubmitAlert && <SuccessAlert message={'Success!'} />}
                <div className='sm:flex sm:items-start justify-center'>
                  <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <h3 className='text-base  font-semibold leading-6 text-gray-900' id='modal-title'>Category</h3>
                  </div>
                </div>
                <div className='mt-2'>
                  <Label name={'Label'} />
                  <TextInput
                    inputType={'text'}
                    name={'label'}
                    autoComplete={'label'}
                    additionalProps={{ ...register('label', { required: true }) }}
                  />
                  {renderErrorText(errors.label, 'Label is required')}
                </div>
                <div className='mt-2'>
                  <Label name={'Type'} />
                  <ExtraFieldDropdown
                    name={typeName}
                    id={typeName}
                    onChange={onChangeDropdown}
                    options={CATEGORY_OPTIONS}
                    additionalProps={{
                      ref: ref, onBlur: onBlur
                    }}
                  />
                  {renderErrorText(errors.type, 'Type is required')}
                </div>
                {renderAddButton()}
                {
                  <div className='mt-3 grid grid-cols-8 gap-x-6 gap-y-8 sm:grid-cols-6'>
                    <ExtraFieldsCategories
                      fields={fields}
                      register={register}
                      errors={errors}
                      remove={remove}
                    />
                    {renderErrorText(errors.type, 'Type is required')}
                  </div>
                }
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button type='submit' className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'>Submit</button>
                <button type='button' onClick={() => setOpen(false)} className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CategoryModal;
