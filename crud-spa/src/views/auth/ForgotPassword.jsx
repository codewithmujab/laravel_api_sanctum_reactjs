import { Link } from "react-router-dom"

export default function ForgotPassword() {
  return (
    <div className="antialiased animated fadeInDown">
      <div className="max-w-lg mx-auto my-1 bg-white p-8 border-r border-l border-gray-100">
        <h1 className="text-3xl font-bold pb-2">Lupa password</h1>
        <p className="text-slate-500">Lupa password Anda? Tidak masalah. Cukup beri tahu kami alamat email Anda dan kami akan mengirimkan tautan untuk mereset password yang memungkinkan Anda untuk memilih yang baru.</p>

        <form onSubmit={null} className="pt-5">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email</p>
              <input ref={null} type="email" placeholder="Masukan Email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" />
            </label>
            <button className="w-full py-3 font-medium text-white bg-orange-600 hover:bg-orange-500 rounded-lg border-orange-500 hover:shadow inline-flex space-x-2 items-center justify-center">
              <span>Kirim</span>
            </button>
            <p className="text-center">Sudah ingat password? <Link to="/login" className="text-orange-600 font-medium inline-flex space-x-1 items-center"><span>Login
            </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg></span></Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}
