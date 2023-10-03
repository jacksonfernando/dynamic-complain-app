'use client';
import CategoryModal from "@/components/Modal/CategoryModal";
import Sidebar from "@/components/Sidebar"
import Table from "@/components/Table";
import useFetchData from "@/hooks/useFetchData"
import { isEmpty } from "lodash";
import { useEffect, useState } from 'react'

const Page = () => {
  const [mode, setMode] = useState(null);
  const [defaultValues, setDefaultValues] = useState({ label: null, type: null, value: null });
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [categoryModal, setCategoryModal] = useState(false);
  const headingsLabel = ['Label', 'Type', 'Value', 'Action']
  const { data, loading } = useFetchData(`/api/categories`, { params: { limit: 10 } });

  useEffect(() => {
    if (!loading) {
      setFetchedCategories(data.categories)
    }
  }, [loading])

  const setOnEdit = (index) => {
    setDefaultValues(fetchedCategories[index]);
    setCategoryModal(true);
    setMode('edit')
  }

  const renderContent = () => {
    return fetchedCategories.map((category, index) => {
      const { label, type, value } = category;
      const test = value && value.reduce((acc, curr) => acc + `label:${curr.label},value:${curr.value}`, '');
      return (
        <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <td className="px-6 py-4 text-black">
            {label}
          </td>
          <td className="px-6 py-4">
            {type}
          </td>
          <td className="px-6 py-4">
            {test}
          </td>
          <td className="px-6 py-4">
            <div
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex-1"
              onClick={() => setOnEdit(index)}
            >
              Edit
            </div>
            <div
              className="font-medium text-red-600 dark:text-blue-500 hover:underline flex-1"
            >
              Delete
            </div>
          </td>
        </tr>
      )
    });
  }

  const onAddButton = () => {
    setCategoryModal(!categoryModal)
    setMode('add')
    setDefaultValues({ label: null, type: null, value: null })
  }

  return (
    <>
      <Sidebar />
      <Table
        headingsLabel={headingsLabel}
        renderContent={renderContent}
        onAddButton={onAddButton}
        setMode={setMode}
        isContentAvailable={!isEmpty(fetchedCategories)}
        showPaginate={true}
      />
      <CategoryModal
        open={categoryModal}
        setOpen={setCategoryModal}
        defaultValues={defaultValues}
        mode={mode}
      />
    </>
  )
}

export default Page;
