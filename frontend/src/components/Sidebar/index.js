import Cookies from "js-cookie"
import Link from "next/link"

const Sidebar = () => {
  return (
    <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <Link href={'/admin/users'} className="flex-1 ml-3 whitespace-nowrap">
                Users
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <Link href={'/admin/categories'} className="flex-1 ml-3 whitespace-nowrap">
                Categories
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <Link href={'/admin/complains'} className="flex-1 ml-3 whitespace-nowrap">
                Complains
              </Link>
            </div>
          </li>
          <li>
            <div href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span
                className="flex-1 ml-3 whitespace-nowrap"
                onClick={() => { Cookies.remove('token'); window.location.replace('/') }}
              >Sign out</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar

