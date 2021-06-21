import { useEffect } from "react"
import { useReducer } from "react"

interface AuthState {
  validando: boolean,
  token: null | string,
  username: string,
  nombre: string
}

const initialState: AuthState = {
  validando: true,
  token: null,
  username: '',
  nombre: ''
}

type LoginPayload = {
  username: string,
  nombre: string
}

type AuthAction =
  | { type: 'logout' }
  | { type: 'login', payload: LoginPayload }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'logout':
      return {
        validando: false,
        token: null,
        username: '',
        nombre: ''
      }
    case 'login':
      const { username, nombre } = action.payload
      return {
        validando: false,
        token: 'jaslkdfjaslkdfj',
        username,
        nombre
      }
    default:
      return state
  }
}

export const Login = () => {
  const [{ validando, token, nombre }, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'logout' })
    }, 1500)
  }, [])

  const login = () => {
    dispatch({
      type: 'login',
      payload: {
        nombre: 'Michael',
        username: 'Maicolrg11'
      }
    })
  }

  const logout = () => {
    dispatch({ type: 'logout' })
  }

  if (validando) {
    return (
      <>
        <h3>Login</h3>
        <div className='alert alert-info'>
          Validando...
        </div>
      </>
    )
  }

  return (
    <div>
      <h3>Login</h3>
      {
        token ?
          (
            <>
              <div className='alert alert-success'>
                Autenticado como: {nombre}
              </div>
              <button className='btn btn-danger' onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <div className='alert alert-danger'>
                No autenticado
              </div>
              <button className='btn btn-primary' onClick={login}>Login</button>
            </>
          )

      }
    </div>
  )
}
