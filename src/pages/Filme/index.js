import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {toast} from 'react-toastify';

import './filme.css';

import api from '../../services/api';

function Filme(){

    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilmes] = useState ({});
    const [loading, setLoading] = useState (true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "76f4dfe48630c1bae43f3cd2bb61b283",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilmes(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log('FILME NÃO ENCONTRADO');
                navigate("/", {replace: true});
                return;
            })

        }
        loadFilme();

        return () => {
            //console.log('COMPONENTE DESMONTADO!')
        }

    }, [navigate, id]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme já foi salvo!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
        
    }

     if(loading){
        return(
          <div className='filme-info'>
            <h1>Carregando detalhes...</h1>
          </div>
    )
  }  
    
  return(
   <div className="filme-info">
     <h1>{filme.title}</h1>
     <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} 
          alt={filme.original_title}/>

        <div className="details">
     
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <strong>Duração: {filme.runtime} min</strong>
            <strong>Idioma original: {filme.original_language}</strong><br/>
        </div>

     <h3>Sinopse</h3>
     <span>{filme.overview}</span>
    
    <div className="area-buttons">
        
        <button onClick={salvarFilme}>Salvar</button>

        <button>
            <a 
            target="blank" 
            rel="external" 
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
        </button>
    </div>    
    
      
   </div>

  )
}

export default Filme;