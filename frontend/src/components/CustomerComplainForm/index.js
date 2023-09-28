const CustomerComplainForm = () => {
  return (
    <form>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Complain form</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Submit your complain here</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div className="col-span-full">
            <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
            <div className="mt-2">
              <input type="text" name="first-name" id="full-name" autocomplete="full-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="col-span-full">
            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="col-span-full">
            <label for="country" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
            <div className="mt-2">
              <select id="country" name="country" autocomplete="country-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option>Test 1</option>
                <option>Test 2</option>
                <option>Test 3</option>
              </select>
            </div>
          </div>

          <div class="col-span-full">
            <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Issue description</label>
            <div class="mt-2">
              <textarea id="about" name="about" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
            <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the issue.</p>
          </div>

        </div>
      </div>
    </form>
  )
}

export default CustomerComplainForm;
