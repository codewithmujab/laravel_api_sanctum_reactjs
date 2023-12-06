import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import axiosClient from "../api/axios-client.js";
import { useEffect } from "react";

export default function Header() {

  //ambil data user dan token dari state
  const { user, token, setUser, setToken } = useStateContext();

  //jika user belum login, maka redirect ke halaman login
  if (!token) {
    //redirect ke halaman login
    return <Navigate to="/login" />
  }

  //keluar dari aplikasi
  const onLogout = async (ev) => {
    //jangan refresh halaman
    ev.preventDefault()

    //kirim data ke API
    await axiosClient.post('/logout')
      .then(() => {
        //hapus data user dari state
        setUser({})
        //hapus token dari state
        setToken(null)
      })
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    //ambil data user dari API
    axiosClient.get('/user')
      .then(({ data }) => {
        //simpan data user ke state
        setUser(data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>

      <header>
        <div>
          REACT-SPA = HEADER
        </div>
        <div>
          {user.name} &nbsp; &nbsp;
          <a onClick={onLogout} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">Logout</a>
        </div>
      </header>

    </div>
  )
}
