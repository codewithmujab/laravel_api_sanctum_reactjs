import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../../api/axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function Signup() {
  const emailRef = createRef()
  const nameRef = createRef()
  const passwordRef = createRef()
  // const passwordConfirmationRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [errors, setErrors] = useState(null)


  //submit form
  const onSubmit = async (ev) => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      name: nameRef.current.value,
      password: passwordRef.current.value,
      // password_confirmation: passwordConfirmationRef.current.value,
    }
    await axiosClient.post('/signup', payload)
      .then(({ data }) => {
        //simpan data user dan token ke local storage
        setUser(data.user)
        //simpan token ke local storage
        setToken(data.token);
      })
      .catch(err => {
        //jika error, cek apakah error dari API
        const response = err.response;
        //jika error dari API, maka simpan error validasi ke state errors
        if (response && response.status === 422) {
          //simpan error validasi ke state errors
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className="antialiased animated fadeInDown">
      <div className="max-w-lg mx-auto my-1 bg-white p-8 border-r border-l border-gray-100">

        <h1 className="text-3xl font-bold  pb-2">Register</h1>
        <p className="text-slate-500">Silakan login jika Anda sudah membuat akun.</p>

        {errors &&
          <div className="pt-3">
            <div className="bg-red-50 animated fadeInDown border-s-4 border-red-500 p-4 dark:bg-red-800/30" role="alert">
              <div className="flex">
                <div className="flex-shrink-0">
                  { /* Icon */}
                  <span className="inline-flex justify-center items-center w-8 h-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </span>
                  { /* End Icon */}
                </div>
                <div className="ms-3">
                  <h3 className="text-gray-800 font-semibold dark:text-white">
                    Error!
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {Object.keys(errors).map(key => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        }

        <form onSubmit={onSubmit} className="my-5">
          <div className="flex flex-col space-y-5">

            <label htmlFor="name">
              <p className="font-medium text-slate-700 pb-2">Nama</p>
              <input ref={nameRef} type="text" placeholder="Nama Lengkap" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" />
            </label>

            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email</p>
              <input ref={emailRef} type="email" placeholder="Masukan Email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" />
            </label>
            <label htmlFor="password">
              <p className="font-medium text-slate-700 pb-2">Password</p>
              <input ref={passwordRef} type="password" placeholder="Password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" />
            </label>

            {/* <label htmlFor="confirm_password">
              <p className="font-medium text-slate-700 pb-2">Konfirmasi Password</p>
              <input ref={passwordConfirmationRef} type="password" placeholder="Ulangi Password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" />
            </label> */}

            <button className="w-full py-3 font-medium text-white bg-orange-600 hover:bg-orange-500 rounded-lg border-orange-500 hover:shadow inline-flex space-x-2 items-center justify-center">
              <span>Register</span>
            </button>
            <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
              <span>Register dengan Google</span>
            </button>
            <p className="text-center">Sudah punya akun? <Link to="/login" className="text-orange-600 font-medium inline-flex space-x-1 items-center"><span>Login
            </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg></span></Link></p>

          </div>
        </form>

      </div>
    </div >

  )
}
