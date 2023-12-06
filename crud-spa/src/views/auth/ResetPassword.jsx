import { Link } from "react-router-dom"

export default function ResetPassword() {
  return (
    <div className="antialiased animated fadeInDown">
      <div className="max-w-lg mx-auto my-1 bg-white p-8 border-r border-l border-gray-100">

        <h1 className="text-3xl font-bold  pb-2">Reset Password</h1>
        <p className="text-slate-500">Buat password baru anda.</p>

        <form onSubmit={null} className="my-5">
          <div className="flex flex-col space-y-5">

            {/* form */}
            <label htmlFor="password_saat">
              <p className="font-medium text-slate-700 pb-2">Password Saat Ini</p>
              <input ref={null} type="password_saat" placeholder="Password Saat Ini" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" />
            </label>

            <label htmlFor="password">
              <p className="font-medium text-slate-700 pb-2">Password</p>
              <input ref={null} type="password" placeholder="Password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" />
            </label>

            <label htmlFor="confirm_password">
              <p className="font-medium text-slate-700 pb-2">Konfirmasi Password</p>
              <input ref={null} type="password" placeholder="Ulangi Password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" />
            </label>
            {/* end form */}

            <button className="w-full py-3 font-medium text-white bg-orange-600 hover:bg-orange-500 rounded-lg border-orange-500 hover:shadow inline-flex space-x-2 items-center justify-center">
              <span>Simpan</span>
            </button>

            <p className="text-center">Belum punya akun? <Link to="/signup" className="text-orange-600 font-medium inline-flex space-x-1 items-center"><span>Login
            </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg></span></Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}
