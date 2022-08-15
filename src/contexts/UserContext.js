import { createContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    function getSession() { //unnecessary
        const token = sessionStorage.getItem('token') ? `Bearer ${sessionStorage.getItem('token')}` : null;
        const username = JSON.parse(sessionStorage.getItem('username'));
        const userimage = JSON.parse(sessionStorage.getItem('userimage'));

        return { token, username, userimage };
    };

    function closingSession() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('userimage');

      setIsAuthenticated(false);
  }

    function checkSession() {
        const { token, username, userimage } = {
          token: sessionStorage.getItem('token') ? `Bearer ${sessionStorage.getItem('token')}` : null,
          username: JSON.parse(sessionStorage.getItem('username')),
          userimage: JSON.parse(sessionStorage.getItem('userimage')),
        }

        if (token && username && userimage) {
            setIsAuthenticated(true);
        } else {
            closingSession();
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    const sessionValues = useMemo(() => ({ isAuthenticated, checkSession, closingSession, getSession }), [isAuthenticated]    );
    
    return <UserContext.Provider value={sessionValues}>{children}</UserContext.Provider>;
}

export default UserContext;

/** USE MEMO (()=> (valores armazenados), [parametro de mudança])
 *  Esse hook armazena um valor de RETORNO considerando os parametros de entrada, ou seja
 *  Quando o usuário X com Token XxX fizer uma requisição a função de autenticação
 *  ele vai receber uma resposta, o useMemo() pega essa resposta e sempre que a requisição for
 *  a mesma, ele devolve a mesma resposta, assim não tendo necessidade de rodar o código n vezes...
 * 
 *  Serve para funções que são previsiveis.
 */