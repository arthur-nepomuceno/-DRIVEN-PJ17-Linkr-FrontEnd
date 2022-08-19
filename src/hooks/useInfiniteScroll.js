import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function useInfiniteScroll() {
    const API = 'http://localhost:5000/timeline';
    const {token, setPosts} = useContext(UserContext);
  
    useEffect(() => {
        axios({
            method: 'GET',
            url: API,
            headers: {Authorization: `Bearer ${token.token}`}
        }).then(res => {
            console.log(res.data);
            setPosts(res.data);
        }).catch(error => {
            console.log(error.response.data);
        })

    }, [])
  
  
    return;
}
