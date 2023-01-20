import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme.css'
import api from '../../servico/api';
import { toast } from 'react-toastify'

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilms(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "640ba6ddec8bba985e6f040ed2521af6",
                    language: "pt-BR"     
                }        
            })
            .then((response) => {//se encontrar o filme cai dentro do them
                setFilme(response.data);
                setLoading(false)
            }) 
            .catch(() => { //senao dentro do catch
                console.log('N Encontrado!');
                navigate("/", {replace: true}); //redireciona o usuario para a pagina de Home
                return;
            })
        }
        loadFilms()

        return () => { //quando volta para a tela inicial, o componente eh desmontado
            console.log("Componente foi desmontado");
        }
    }, [navigate, id]) //quando utilizamos dependencias externas, precisamos passar como dependencia do useEffect as dependencias que estamos utilizando por fora, no caso o navigate e o Id

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@ttFlix");

        let filmesSalvos = JSON.parse(minhaLista) || []; //parse converte de volta em uma lista. Se tiver algo em minhaLista ele coloca dentro da filmesSalvos, senao tiver cria um array vazio

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id ) //verifica se ja existe o filme adicionado no local storage

        if(hasFilme){
            toast.warn("Esse filme já está na sua lista!")
            return;
        }

        filmesSalvos.push(filme); //push adiciona mais um item dentro de filmesSalvos, que no caso eh o filme utilizado no nosso useState
        localStorage.setItem("@ttFlix", JSON.stringify(filmesSalvos));//transforma o array em uma string, pois nao conseguimos salvar um array
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carrendo detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliacao: {filme.vote_average} / 10</strong>

            <div className="area-button">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                <a  target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;