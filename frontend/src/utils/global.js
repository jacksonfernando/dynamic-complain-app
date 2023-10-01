import axios from "axios";

const renderErrorText = (error, label) => {
  return error?.type === 'required' && (
    <p className='text-red-600'>{`${label} is required`}</p>
  )
}

const uploadFile = async (files) => {
  if (files[0].length <= 0) return;
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('files', file));
  const uploadedResult = await axios.post(`/api/files`, formData);
  return uploadedResult.data;
}

export { renderErrorText, uploadFile }

