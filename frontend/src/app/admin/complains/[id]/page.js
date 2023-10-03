'use client';

import Label from "@/components/Label";
import Sidebar from "@/components/Sidebar";
import useFetchData from "@/hooks/useFetchData";
import axios from "axios";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { useState } from "react";

const Page = ({ params }) => {
  const [remarks, setRemarks] = useState('')
  const token = Cookies.get('token')
  const { data, loading } = useFetchData(`/api/complains/${params.id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      limit: 10
    }
  });

  const renderExtraFields = () => {
    return !isEmpty(data) && data.extraFields.map(field => {
      return (<div className='col-span-full'>
        <Label name={field.fieldName} />
        <div className='mt-2'>
          {field.value}
        </div>
      </div>
      )
    })
  }

  const onChangeRemarks = (event) => {
    setRemarks(event.target.value);
  }

  const onSubmitRemarks = async () => {
    await axios.put(`/api/complains/${params.id}`, { ...data, remarks },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    );
    alert('Success submitting remarks!');
  }

  return (
    <>
      <Sidebar />
      <div className="mt-20 p-4 sm:ml-64">
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>Complain Detail</h2>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='col-span-full'>
              <Label name={'Full name'} />
              <div className='mt-2'>
                {data.fullName}
              </div>
            </div>
            <div className='col-span-full'>
              <Label name={'Email'} />
              <div className='mt-2'>
                {data.email}
              </div>
            </div>
            <div className='col-span-full'>
              <Label name={'Issue Description'} />
              <div className='mt-2'>
                {data.issueDescription}
              </div>
            </div>
            {renderExtraFields()}
            <div className='col-span-full'>
              <Label name={'Remarks'} />
              <div className='mt-2'>
                <textarea
                  id={'remarks'}
                  name={'remarks'}
                  rows="3"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={onChangeRemarks}
                />
                <button id="dropdownActionButton"
                  data-dropdown-toggle="dropdownAction"
                  className="mt-2 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                  onClick={() => onSubmitRemarks()}
                >
                  Submit remark
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page;
