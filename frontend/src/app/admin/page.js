import Sidebar from "@/components/Sidebar";


const Page = () => {
  const renderHeading = () => {
    const headingsLabel = ['Label', 'Type', 'Value', 'Action']
    return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            label
          </th>
          <th scope="col" className="px-6 py-3">
            Type
          </th>
          <th scope="col" className="px-6 py-3">
            value
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>

    )
  }

  const renderContent = () => {
    const headingsLabel = ['Label', 'Type', 'Value', 'Action']
    return (
      <tbody>
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Apple MacBook Pro 17"
          </th>
          <td className="px-6 py-4">
            Silver
          </td>
          <td className="px-6 py-4">
            Laptop
          </td>
          <td className="px-6 py-4">
            $2999
          </td>
          <td className="px-6 py-4">
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {renderHeading()}
            {renderContent()}
          </table>
        </div>
      </div>
    </>
  )
}

export default Page;
