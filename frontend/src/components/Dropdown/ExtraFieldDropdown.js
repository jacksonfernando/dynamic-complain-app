const ExtraFieldDropdown = ({ onChange, id, name, autoComplete, options, additionalProps }) => {
  return (
    <select
      onChange={onChange}
      id={id}
      name={name}
      autoComplete={autoComplete}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
      {...additionalProps}
    >
      <option style={{ display: "none" }}></option>
      {
        options.map(option => {
          return (
            <option key={`option-${option.value}`} value={option.value}>{option.label}</option>
          )
        })
      }
    </select>
  )

}

export default ExtraFieldDropdown;
