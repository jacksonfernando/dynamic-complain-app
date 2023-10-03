'use client';
import CategoryModal from "@/components/Modal/CategoryModal";
import Sidebar from "@/components/Sidebar"
import Table from "@/components/Table";
import useFetchData from "@/hooks/useFetchData"
import axios from "axios";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { useEffect, useState } from 'react'

const Page = () => {
  const [mode, setMode] = useState(null);
  const [defaultValues, setDefaultValues] = useState({ label: null, type: null, value: null });
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [categoryModal, setCategoryModal] = useState(false);
  const headingsLabel = ['Label', 'Type', 'Value', 'Action']
  const { data, loading, setHeader, header, refetch } = useFetchData(`/api/categories`, { params: { offset: 0, limit: 5 } });

  useEffect(() => {
    if (!loading) {
      setFetchedCategories(data.categories)
    }
  }, [data])

  const setOnEdit = (index) => {
    setDefaultValues(fetchedCategories[index]);
    setCategoryModal(true);
    setMode('edit')
  }

  const onDelete = async (id) => {
    const token = Cookies.get('token')
    try {
      await axios.delete(`/api/categories/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      alert('success')
      refetch()
    }
    catch (error) {
      console.log(error)
      alert('error')
    }
  }

  const renderContent = () => {
    return fetchedCategories.map((category, index) => {
      const { label, type, value, id } = category;
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
              onClick={() => onDelete(id)}
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
        setHeader={setHeader}
        header={header}
        headerToken={false}
      />
      <CategoryModal
        open={categoryModal}
        setOpen={setCategoryModal}
        defaultValues={defaultValues}
        mode={mode}
        refetch={refetch}
      />
    </>
  )
}

export default Page;
