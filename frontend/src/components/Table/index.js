'use client';
import Sidebar from "@/components/Sidebar"
const Table = ({ headingsLabel, renderContent, onAddButton }) => {
  const renderPaginate = () => {
    return (
      <nav className="flex items-center justify-between pt-4 bg-white" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul className="inline-flex -space-x-px text-sm h-8">
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-black-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-black-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>
        </ul>
      </nav>
    )
  }

  const renderHeading = () => {
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


  const renderAddButton = () => {
    return (
      <div>
        <button id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
          onClick={onAddButton}
        >
          Add Record
        </button>
      </div>
    )
  }

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        {renderAddButton()}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {renderHeading()}
            {renderContent()}
            <tbody>
            </tbody>
          </table>
          {renderPaginate()}
        </div>
      </div>
    </>
  )
}

export default Table;
