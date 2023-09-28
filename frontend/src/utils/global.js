const renderErrorText = (error, label) => {
  return error?.type === 'required' && (
    <p className='text-red-600'>{`${label} is required`}</p>
  )
}

export { renderErrorText }

