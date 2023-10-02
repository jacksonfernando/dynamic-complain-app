'use client';
import Sidebar from "@/components/Sidebar"
import useFetchData from "@/hooks/useFetchData"
import { useEffect, useState } from 'react'
import axios from "axios"
import Cookies from "js-cookie"

//export async function getStaticProps() {
//  getServerSideProps
//  const token = Cookies.get('token')
//  const { data } = await axios.get('/api/categories', {
//    headers: {
//      'Authorization': `Bearer ${token}`
//    }
//  })
//  return { props: { data } }
//}

const Page = () => {

  const [fetchedCategories, setFetchedCategories] = useState([]);
  const { data, loading } = useFetchData(`/api/categories`);

  useEffect(() => {
    if (!loading) {
      setFetchedCategories(data.categories || CATEGORIES)
    }
  }, [loading])

  const renderHeading = () => {
    const headingsLabel = ['Label', 'Type', 'Value', 'Action']
    return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {headingsLabel.map(heading => {
            return (
              <th scope="col" className="px-6 py-3">
                {heading}
              </th>
            )
          })}
        </tr>
      </thead>

    )
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
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
          </td>
        </tr>
      )
    });
  }

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {renderHeading()}
            <tbody>
              {renderContent()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Page;
