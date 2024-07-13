import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from '../../services/api';
import { toast } from 'react-toastify';

import './filme-info.css';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: process.env.REACT_APP_API_KEY,
                        language: "pt-BR",
                    }
                });
                setFilmes(response.data);
                setLoading(false);
            } catch (error) {
                navigate("/", { replace: true });
            }
        }

        loadFilmes();

        return;
    }, [id, navigate]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)
        if (hasFilme){
            toast.warn("Esse filme já esta na sua lista!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")


    }

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        );
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`http://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;
