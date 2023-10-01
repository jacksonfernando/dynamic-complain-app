const SuccessAlert = ({ message }) => {
  return <>
    <div
      className="mb-4 rounded-lg bg-green-100 px-6 py-5 text-base text-green-700"
      role="alert">
      {message}
    </div>
  </>
}

export default SuccessAlert;
