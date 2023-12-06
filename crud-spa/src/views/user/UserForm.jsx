import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function UserForm() {
  //navigasi halaman
  const navigate = useNavigate();
  let { id } = useParams();

  //ini adalah state untuk menampung data user
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
    //image:'
  })
  //validasi error
  const [errors, setErrors] = useState(null)

  //const [image, setImage] = useState(null)

  //ini adalah state untuk menampilkan loading
  const [loading, setLoading] = useState(false)

  //ini adalah state untuk menampilkan notifikasi
  const { setNotification } = useStateContext()

  // const handleFileChange = (e) => {
  //   setImages(e.target.files[0]);
  // }

  //jika id ada, maka ambil data dari API
  if (id) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setLoading(true)
      //ambil data dari API
      axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false)
          //simpan data ke state user
          setUser(data)
        })
        .catch(() => {
          //jika error, loading dihentikan
          setLoading(false)
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  }

  //submit form
  const onSubmit = async (ev) => {
    ev.preventDefault()
    //jika id ada, maka update data
    if (user.id) {
      //update data ke API
      await axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          //tampilkan notifikasi
          setNotification('User berhasil diupdate.')
          //berpindah halaman ke /users
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          //jika error validasi, maka tampilkan error validasi
          if (response && response.status === 422) {
            //simpan error validasi ke state errors
            setErrors(response.data.errors)
          }
        })
    } else {
      //jika id tidak ada, maka tambahkan data
      //tambahkan data ke API
      await axiosClient.post('/users', user)
        .then(() => {
          //tampilkan notifikasi
          setNotification('User berhasil ditambahkan.')
          //berpindah halaman ke /users
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          //jika error validasi, maka tampilkan error validasi
          if (response && response.status === 422) {
            //simpan error validasi ke state errors
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder="Name" />
            <input value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder="Email" />
            <input type="password" onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder="Password" />
            <input type="password" onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} placeholder="Password Confirmation" />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
