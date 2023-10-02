import Sidebar from "@/components/Sidebar";
import CategoriesPage from "./CategoriesPage";


const Page = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <CategoriesPage />
          </table>
        </div>
      </div>
    </>
  )
}

export default Page;
