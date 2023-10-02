const CategoriesPage = () => {
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
    return (
      <tbody>
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <td className="px-6 py-4 text-black">
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
      {renderHeading()}
      {renderContent()}
    </>
  )
}

export default CategoriesPage;
