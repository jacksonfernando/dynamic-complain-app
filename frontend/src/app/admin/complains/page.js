'use client';
import Sidebar from "@/components/Sidebar"
import useFetchData from "@/hooks/useFetchData"
import { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import Table from "@/components/Table";
import { isEmpty } from "lodash";

const Page = () => {
  const headingsLabel = ['Full Name', 'Email', 'Issue Description', 'Remarks', 'Resolved']
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

  const redirectToDetailpage = (index) => {
    window.location.replace(`/admin/complains/${index}`)
  }

  useEffect(() => {
    if (!loading) {
      setFetchedComplains(data.complains)
    }
  }, [loading])

  const renderContent = () => {
    return fetchedComplains.map((complain, index) => {
      const { fullName, email, issueDescription, id, remarks } = complain;
      const isResolved = remarks != null;
      const resolvedMessage = isResolved ? 'Resolved' : 'Not resolved';
      return (
        <tr onClick={() => redirectToDetailpage(id)} key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
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
            {remarks}
          </td>
          <td className="px-6 py-4">
            {resolvedMessage}
          </td>
        </tr>
      )
    });
  }

  return (
    <>
      <Sidebar />
      {<Table
        headingsLabel={headingsLabel}
        renderContent={renderContent}
        isContentAvailable={!isEmpty(fetchedComplains)}
      />}
    </>
  )
}

export default Page;
