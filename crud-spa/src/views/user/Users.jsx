import { useEffect, useState } from "react";
import axiosClient from "../../api/axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function Users() {
  // ini adalah state untuk menampung data user
  const [users, setUsers] = useState([]);
  //ini adalah state untuk menampilkan loading
  const [loading, setLoading] = useState(false);
  //ini adalah state untuk menampilkan notifikasi
  const { setNotification } = useStateContext()

  //tampilkan data ketika pertama kali komponen di render
  useEffect(() => {
    //panggil function getUsers
    getUsers();
  }, [])

  //delete user
  const onDeleteClick = async (user) => {
    //jika user tidak setuju, maka batalkan
    if (!window.confirm("Apa kamu yakin menghapus user ini?")) {
      return
    }
    //hapus data dari API
    await axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        //tampilkan notifikasi
        setNotification('Hapus user berhasil.')
        //panggil function getUsers
        getUsers()
      })
  }

  //ambil data dari API
  const getUsers = async () => {
    setLoading(true)
    await axiosClient.get('/users')
      .then(({ data }) => {
        //loading dihentikan
        setLoading(false)
        //response data dari API disimpan ke state users
        setUsers(data.data)
      })
      .catch(() => {
        //loading dihentikan
        setLoading(false)
      })
  }

  return (
    <div>

      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Users</h1>
        <Link className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800" to="/users/new">Tambah Users</Link>
      </div>
      <div className="animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Load Data...
                </td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  {/* <td>{u.image}</td> */}
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    <Link className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800t" to={'/users/' + u.id}>Edit</Link>
                    &nbsp;
                    <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={() => onDeleteClick(u)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
