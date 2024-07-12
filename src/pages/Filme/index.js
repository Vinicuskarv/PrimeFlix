import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from '../../services/api';
import './filme-info.css';


function Filme(){
    const { id } = useParams();
    const [filme, setFilmes] = useState([]);
    const [loading, setLoaging] = useState(true);


    useEffect(()=>{
        async function loadFilmes(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:process.env.REACT_APP_API_KEY,
                    language:"pt-BR",
                }
            })
            .then((response)=>{
                setFilmes(response.data);
                setLoaging(false);
            })
            .catch(()=>{
                console.log("page erro")
            })
        }
        loadFilmes();
        return () => {
            console.log("foi desmontado");
        }
    }, [])
    

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Valição: {filme.vote_average} / 10</strong>
            <div className="area-buttons">
                <button>Salvar</button>
                <button>
                    <a href="#">
                        Trailler
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;