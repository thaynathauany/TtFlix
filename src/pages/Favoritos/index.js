import { useEffect, useState } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Favoritos() {

    const [filmes, setFilmes] = useState([]) //comeca com o array vazio pois sera a lista dos nossos filmes

    useEffect(() => {
        const minhaLista = localStorage.getItem("@ttFlix"); //pega tudo que tem dentro de ttlix
        setFilmes(JSON.parse(minhaLista) || []) //transforma 
    }, [])

    function excluirFilme(id){ //retira o que tem esse id
        let filtroFilmes = filmes.filter( (item) => { //em filmes ha todos nossos filmes. filter vai devolver todos os filmes que passam na nossa condicao. e eu recebo nesse filter o acesso ao item e eu quero devolver
            return (item.id !== id)//verifica dentro de todos os nossos filmes em item.id onde o id for diferente do que estamos recebendo. Ou seja, quando eu clico em um filme, eu devolvo todos menos aquele que eu estou clicando. Clico em todos que tem item.id menos no id que eu cliquei
        })

        setFilmes(filtroFilmes); //muda a filtro filmes apenas com os filmes que quero na lista
        localStorage.setItem("@ttFlix", JSON.stringify(filtroFilmes)) //entao atualiza no JSON 
        toast.success("Filme removido com sucesso!")
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Voce não possui nenhum filme salvo :( </span>}

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id) }>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;