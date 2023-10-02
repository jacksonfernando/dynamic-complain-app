'use client';
import Sidebar from "@/components/Sidebar"
import useFetchData from "@/hooks/useFetchData"
import { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import Table from "@/components/Table";
import { isEmpty } from "lodash";

const Page = () => {
  const headingsLabel = ['Full Name', 'Email', 'Issue Description', 'Action']
  const [fetchedComplains, setFetchedComplains] = useState([]);
  const token = Cookies.get('token')
  const { data, loading } = useFetchData(`/api/complains`, {
    headers: {
      'Authorization': `Bearer ${token}`
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
