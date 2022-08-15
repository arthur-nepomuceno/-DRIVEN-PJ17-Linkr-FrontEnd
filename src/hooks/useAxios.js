import { useEffect, useState } from "react";
import axios from 'axios';

//function that creates a querystring if requested
function queryStringBuilder(query = {}) {
    //query must be an object

    if(!Object.keys(query).length) {
        return '';
    }

    let encode = encodeURIComponent;

    const result =  `?${Object.keys(query)
        .map(k => `${encode(k)}=${encode(query[k])}`)
        .join('&')}`;

    return result;
}

function useAxios({ method, route, payloadHeaders, payloadBody, query }, manual = false) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(!manual);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    axios.defaults.baseURL = process.env.REACT_APP_AXIOS_URL /* process.env.AXIOS_DEFAULT_URL  "http://localhost:5000"*/ ;

    const config = {
        method,
        url: `${route}${queryStringBuilder(query)}`,
    };

    async function executeRequest(body = payloadBody, headers = null, callback = null) {
        try {
            setIsLoading(true);

            const result = await axios({
                ...config,
                headers:{
                    ...payloadHeaders,
                    ...headers,
                },
                data: body,
            });

            setResponse(result);
            setData(result.data);

        } catch (error) {
            setError(error);

        } finally {
            if(callback) {
                callback();
            }
            let timer;
            clearTimeout(timer)
            timer = setTimeout(() => {
                setIsLoading(false);
              }, 1000);
        }
    };

    useEffect(() => {
        if (!manual) {
            executeRequest();
        }
    }, []);

    return [{ response, data, isLoading, error }, executeRequest];
};

export default useAxios;

/**         INSTRUÇÕES DE USO
 * 
 *  Quando for usar axios em algum componentem chame o useAxios da seguinte forma:
 * 
 *      const [{ data, isLoading, error, response }, VARIÁVEL_DE_EXECUÇÃO] = useAxios
 *      ({
 *          method: Qual método você vai utilizar (get, post, ...),
 *          route: Qual a rota ('/', '/users', ...),
 *          headers: Caso tenha hearder passe as informações aqui,
 *      }, false);
 * 
 *  DATA vai retornar o 'promisse.data', ou seja, na maioria das vezes o que se espera quando faz uma req a uma API,
 *  isLoading é um booleano que diz se o hook está carregando as informações ou não, pode ser usado para renderizar uma tela de loading,
 *  ERROR caso aconteça algum erro ele retorna a mensagem, também pode ser usado para uma eventual tela de erro,
 *  RESPONSE passa todas as informações recebidas pelo axios, ou seja o retorno da promisse.
 * 
 *  O valor "FALSE" é para indicar que quando o componente carregar ele deve fazer a requisição a API imediatamente, ou seja, NÃO é uma 
 *  requisição manual. Caso você queira fazer essa requisição manualmente, caso o usuário execute uma ação na pagina você pode estruturar assim:
 * 
 *  const [{ data, loading, etc... }, executePost ] = useAxios({ ... }, TRUE ); 
 *  
 *  executePost é o nome da variável que vai chamar o axios e, um nome semantico e como existe o 'true' no fim, é uma função manual, ou seja, só vai 
 *  executar quando você chamar.
 * 
 *  Quando quiser chamar o "executePost", por exemplo, você pode passar uma função de callback, desse jeito:
 * 
 *  executePost(body, { Authorization: token }, () => executeGet(null, { Authorization: token }));
 * 
 *  Nesse momento o axios vai executar a rota configurada e ao final ele vai executar uma função de callback, que nesse exemplo
 *  serve para atualizar a pagina com o post enviado.
 * 
 **/