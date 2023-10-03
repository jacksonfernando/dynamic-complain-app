'use client';
import CategoryModal from "@/components/Modal/CategoryModal";
import UserModal from "@/components/Modal/UsersModal";
import Sidebar from "@/components/Sidebar"
import Table from "@/components/Table";
import useFetchData from "@/hooks/useFetchData"
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { useEffect, useState } from 'react'

const Page = () => {
  const [mode, setMode] = useState(null);
  const [defaultValues, setDefaultValues] = useState({ username: null, password: null });
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [userModal, setUserModal] = useState(false);
  const headingsLabel = ['Username', 'Action']
  const token = Cookies.get('token')
  const { data, loading } = useFetchData(`/api/users`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  useEffect(() => {
    if (!loading) {
      setFetchedUsers(data)
    }
  }, [loading])

  const setOnEdit = (index) => {
    setDefaultValues(fetchedUsers[index]);
    setUserModal(true);
    setMode('edit')
  }

  const renderContent = () => {
    return fetchedUsers.map((user, index) => {
      const { username } = user;
      return (
        <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <td className="px-6 py-4 text-black">
            {username}
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
    setUserModal(!userModal)
    setMode('add')
    setDefaultValues({ username: null, password: null })
  }

  return (
    <>
      <Sidebar />
      {!isEmpty(fetchedUsers) && <Table
        headingsLabel={headingsLabel}
        renderContent={renderContent}
        onAddButton={onAddButton}
        setMode={setMode}
        showPaginate={false}
      />}
      <UserModal
        open={userModal}
        setOpen={setUserModal}
        defaultValues={defaultValues}
        mode={mode}
      />
    </>
  )
}

export default Page;
