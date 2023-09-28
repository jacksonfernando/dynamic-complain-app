const Label = ({ name }) => {
  return (
    <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{name}</label>
  )
}

export default Label
