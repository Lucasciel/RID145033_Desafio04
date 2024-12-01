import './Tarefas.css'; // Importa o CSS específico
import { useState, useEffect } from 'react';

function Tarefas() {


  const [lista, setLista] = useState([]) //lista completa 
  const [valorInput, setValorInput] = useState('')//input envia valor digitado
  
  const [pegueiDaMemoria, setPegueiDaMemoria] = useState(false)

    const adicionarTarefa = () => {
        if(valorInput !== '' ){ //se o valor foi enviado
          const novoId = crypto.randomUUID() //função para criar id aleatório
          const novaLista = {
            id: novoId,  //sera a key do li
            texto: valorInput,
            completado: false
          }
          setLista([...lista, novaLista]) 
          setValorInput('')
        }
    }

    //atualiza a lista conforme clica no checkbox
    const marcarCompleto = (id) => {
      tamanhoListaFeita()
      const listaAtualizada = lista.map((listas) => {
        
        if (listas.id === id) {
          return {...listas, completado: !listas.completado}
        }
        return listas
      })
      setLista(listaAtualizada)
    }

    const apagarLista = (id) => {
      const listaAtualizada = lista.filter((itens) => itens.id !== id)
      setLista(listaAtualizada)
    }

    //retorna numero de checked
    const tamanhoListaFeita = () => {
      const listaChecked = lista.filter((itens)=> itens.completado)
      return listaChecked.length
    }


    //guardar na Memoria sempre que lista aumenta
    useEffect(()=> {
      if(pegueiDaMemoria) {
        localStorage.setItem('tarefas', JSON.stringify(lista))
      }
      
    },[lista, pegueiDaMemoria])


    //pega da memoria primeiro
    useEffect (() => {
      const tarefasDaMemoria = localStorage.getItem('tarefas')

      if(tarefasDaMemoria) {
        setLista(JSON.parse(tarefasDaMemoria))
      }
      setPegueiDaMemoria(true)
    },[])

  return (
    <>
      <div id='container-Tarefas'>
        <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
        <div id='container-lista'>
            <ul id='titulo-tarefas'>
                <li>Tarefas {`${tamanhoListaFeita()}/${lista.length}`}</li>
                <li>Status</li>
                <li>Opções</li>
            </ul>
            <ul id='lista-tarefas'>

              {
                lista.map((listas)=> (
                  <li key={listas.id}> 
                  <p style={{textDecoration: listas.completado? "line-through": 'none'}}>{listas.texto}</p>
                <div id='alinha-status-opções'>
                    <input type="checkbox" checked={listas.completado} onChange={()=> marcarCompleto(listas.id)} />

                    <div id='alinha-botão'>
                        <button className='botoes'><img src='lapis.svg'></img></button>
                        <button onClick={()=> apagarLista(listas.id)} className='botoes'><img src='lixeira.svg'></img></button>
                    </div>
                </div>  
                </li>
                ))
              }
                
            </ul>
            <div id='container-adiciona-tarefa'>
                <input type="text" 
                 onChange={(e)=> setValorInput(e.target.value)}
                 value={valorInput}
                 placeholder='Adicionar nova tarefa...'/>

                <button onClick={adicionarTarefa} className='botoes'>+</button>
            </div>
        </div>
      </div>
    </>
  );
}

export default Tarefas;
