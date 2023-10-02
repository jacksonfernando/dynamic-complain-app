import Label from '../Label';
import TextInput from '../TextInput';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import SuccessAlert from '../Alert/SuccessAlert';
import { useState } from 'react';

const SignInModal = ({ open, setOpen }) => {
  const [successSubmitAlert, setSuccessSubmitAlert] = useState(false);

  const renderErrorText = (error, label) => {
    return error?.type === 'required' && (
      <p className='text-red-600'>{`${label} is required`}</p>
    )
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: null,
      password: null
    }
  });

  const onSubmit = async (data) => {
    try {
      const { data: responseData } = await axios.post(`/api/auth/authenticate`, data);
      Cookies.set('token', responseData.token, { expires: 1 })
      setSuccessSubmitAlert(true)
      window.location.replace('/admin')
    } catch (error) {
      console.log(error);
    }
  }

  return open && (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>

              <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                {successSubmitAlert && <SuccessAlert message={'Success login!'} />}
                <div className='sm:flex sm:items-start justify-center'>
                  <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <h3 className='text-base  font-semibold leading-6 text-gray-900' id='modal-title'>Admin Login</h3>
                  </div>
                </div>
                <div className='mt-2'>
                  <Label name={'Username'} />
                  <TextInput
                    inputType={'text'}
                    name={'username'}
                    autoComplete={'username'}
                    additionalProps={{ ...register('username', { required: true }) }}
                  />
                  {renderErrorText(errors.username, 'User name is required')}
                </div>
                <div className='mt-2'>
                  <Label name={'Password'} />
                  <TextInput
                    inputType={'password'}
                    name={'password'}
                    autoComplete={'password'}
                    additionalProps={{ ...register('password', { required: true, minLength: 5 }) }}
                  />
                  {renderErrorText(errors.username, 'Password is required and min 5 character')}
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button type='submit' className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'>Sign in</button>
                <button type='button' onClick={() => setOpen(false)} className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SignInModal;
