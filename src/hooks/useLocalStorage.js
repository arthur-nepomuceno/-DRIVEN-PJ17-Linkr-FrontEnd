import { useEffect, useState } from "react";

function useLocalStorage(key, initial) {

    //setValue is a function that returns either the initial value or the value stored in localstorage
    const [value, setValue] = useState(() => {

        const storedValue = localStorage.getItem(key);

        return storedValue ? JSON.parse(storedValue) : initial;

    });

    useEffect(() => {

        localStorage.setItem(key, JSON.stringify(value));
        
    }, [key, value]); //updates when key or value changes

    return [value, setValue];
}

export default useLocalStorage;

/**     INSTRUÇÃO DE USO
 * 
 *  Na página que quiserem usar esse custom hook criem a seguinte const:
 *  const [localStorage, setLocalStorage] = useLocalStorage('NOME DA KEY DE ARMAZENAMENTO', VALOR PARA ARMAZENAR)
 *  o valor armazenado pode ser objeto.
 * 
 *  v.1.0.0
 **/