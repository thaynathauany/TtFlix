import { useEffect, useState } from "react";
import api from '../../servico/api';
import { Link } from "react-router-dom";
import './home.css'

//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=640ba6ddec8bba985e6f040ed2521af6

function Home(){

    const [filmes, setFilmes] = useState([]);

    useEffect(() =>{
        async function loadFilms(){ //espera a funcao ser chamada 
            const response = await api.get("/movie/now_playing", {
                params:{
                    api_key: "640ba6ddec8bba985e6f040ed2521af6",
                    language: "pt-BR",
                    page: 1,
                }
            }) //espera a requisicao ir buscar os filmes na api - Get busca os dados da api

            setFilmes(response.data.results.slice(0,10))
        }
        loadFilms();
    }, []) //toda vez que a aplicacao abrir, chama o UseEffect

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} />
                            <Link to={`/filme/${filme.id}`}></Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;