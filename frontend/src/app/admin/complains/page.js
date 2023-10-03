'use client';
import Sidebar from "@/components/Sidebar"
import useFetchData from "@/hooks/useFetchData"
import { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import Table from "@/components/Table";
import { isEmpty } from "lodash";

const Page = () => {
  const [mode, setMode] = useState(null);
  const [defaultValues, setDefaultValues] = useState({
    email: null,
    fullName: null,
    issueDescription: null,
    extraFields: null,
  });
  const [complainsModal, setComplainsModal] = useState(false);
  const headingsLabel = ['Full Name', 'Email', 'Issue Description', 'Action']
  const [fetchedComplains, setFetchedComplains] = useState([]);
  const token = Cookies.get('token')
  const { data, loading } = useFetchData(`/api/complains`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      limit: 10
    }
  });

  useEffect(() => {
    if (!loading) {
      setFetchedComplains(data.complains)
    }
  }, [loading])


  const renderContent = () => {
    return fetchedComplains.map((complain, index) => {
      const { fullName, email, issueDescription } = complain;
      return (
        <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <td className="px-6 py-4 text-black">
            {fullName}
          </td>
          <td className="px-6 py-4">
            {email}
          </td>
          <td className="px-6 py-4">
            {issueDescription}
          </td>
          <td className="px-6 py-4">
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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

  return (
    <>
      <Sidebar />
      {!isEmpty(fetchedComplains) && <Table headingsLabel={headingsLabel} renderContent={renderContent} />}
    </>
  )
}

export default Page;
