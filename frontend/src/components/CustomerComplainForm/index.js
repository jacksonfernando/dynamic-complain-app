'use client'

import { useState } from "react"

const categories = [
  {
    id: 1,
    label: 'Single File',
    value: 'file',
  },
  {
    id: 2,
    label: 'Multi file',
    value: 'multifile'
  },
  {
    id: 3,
    label: 'Text area',
    value: 'textarea'
  }
]
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
      && extraFields.map(field => (<div className="col-span-full">
        <div className="mt-2">
          <input type="text" name="first-name" id="full-name" autoComplete="full-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          <input type={field} name="first-name" id="full-name" autoComplete="full-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      ));
  }

  return (
    <form>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Complain Form</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Submit your complain here</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
            <div className="mt-2">
              <input type="text" name="first-name" id="full-name" autoComplete="full-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
            <div className="mt-2">
              <select onChange={(event) => onChangeCategories(event)} id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                {
                  categories.map(category => {
                    return (
                      <option value={category.value}>{category.label}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Issue description</label>
            <div className="mt-2">
              <textarea id="about" name="about" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the issue.</p>
          </div>
          {renderExtraFields()}
        </div>
      </div>
    </form>
  )
}

export default CustomerComplainhtmlForm;
