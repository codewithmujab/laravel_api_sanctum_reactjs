import { Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function DefaultLayout() {
  //ambil data user dan token dari state
  const { notification } = useStateContext();

  return (
    <div>
      <div className="antialiased animated fadeInDown">
        <div className="max-w-lg mx-auto my-1 bg-white p-8 border-r border-l border-gray-100">

          <Header />
          <Sidebar />

          {/* dinamic content */}
          <main>
            <Outlet />
          </main>
          {/* end dinamic content */}
          <Footer />

          {/* notification */}
          {notification &&
            <div className="bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30" role="alert">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="inline-flex justify-center items-center w-8 h-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
                  </span>
                </div>
                <div className="ms-3">
                  <h3 className="text-gray-800 font-semibold dark:text-white">
                    Successfully
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {notification}
                  </p>
                </div>
              </div>
            </div>
          }
          {/* end notification */}

        </div>
      </div>
    </div>

  )
}
