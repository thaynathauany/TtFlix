import { useEffect, useState } from "react";
import api from '../../servico/api';
import { Link } from "react-router-dom";
import './home.css'

//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=640ba6ddec8bba985e6f040ed2521af6

function Home(){

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function loadFilms(){ //espera a funcao ser chamada 
            const response = await api.get("/movie/now_playing", {
                params:{
                    api_key: "640ba6ddec8bba985e6f040ed2521af6",
                    language: "pt-BR",
                    page: 1, //comeca pela pagina 1 da API
                }
            }) //espera a requisicao ir buscar os filmes na api - Get busca os dados da api

            setFilmes(response.data.results.slice(0,10)) // muda o array vazio do state inicial para o resultado dos 10 primeiros filmes (data.results - sao fornecidos pela API)
            console.log(response.data.results.slice(0,10))
            setLoading(false)//apos ele fazer toda a requisicao da api o state loading muda para falso e entao o return eh renderizado
        }
        loadFilms();
    }, []) //toda vez que a aplicacao abrir, chama o UseEffect

    if(loading){ //colocamos o if antes do nosso return como true para renderizar somente ele ate que a lista de filmes seja carregada
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => { //percorre os filmes e crio a variavel filme onde vou receber cada item de filmes
                    return(
                        <article key={filme.id}> {/* Sempre que utilizamos um map precisamos de um key para renderizar a pagina e o react nao se perder, entao passamos sempre para o primeiro item apos o retorno. e cada filme (variavel que criamos a partir do maps de filmes tem o seu proprio ID)  */}
                            <strong>{filme.title}</strong> {/* pega o valor de title (recebido da API) */}
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} /> {/* selecionamos a imagem de acordo com a API */}
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>{/* passa a rota do filme atraves do id */}
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;