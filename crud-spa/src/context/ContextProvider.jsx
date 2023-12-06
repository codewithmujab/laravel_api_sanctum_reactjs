import { createContext, useContext, useState } from "react"

//buat context
const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => { },
  setToken: () => { },
  setNotification: () => { }
})

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [notification, _setNotification] = useState('');

  const setToken = (token) => {
    _setToken(token)
    //cek apakah token null
    if (token) {
      //jika token tidak null, maka simpan ke localstorage
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      //dan jika token null, maka hapus dari localstorage
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  //function untuk menampilkan notifikasi
  const setNotification = message => {
    //simpan notifikasi ke state notification
    _setNotification(message);

    //hilangkan notifikasi setelah 5 detik
    setTimeout(() => {
      //simpan notifikasi ke state notification
      _setNotification('')
    }, 5000)
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      notification,
      setNotification
    }}>
      {children}
    </StateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);
