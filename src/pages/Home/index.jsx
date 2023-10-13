import './styles.css'
import { Card } from '../../components/Card'
import React, {useState, useEffect} from 'react'

export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({})

  function handleAddStudent(){
    const newStudent ={
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br",{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() =>{
    async function fetchData(){
      const response = await fetch('https://api.github.com/users/riquecelo');
      const data = await response.json();
      console.log("DADOS ===> ", data);

      setUser({
        name:data.name,
        avatar:data.avatar_url,
      })
    }

    fetchData();
  })

  /* useEffect(() =>{
    fetch('https://api.github.com/users/riquecelo')
      .then(response => response.json())
      .then(data =>{
        setUser({
          name:data.name,
          avatar:data.avatar_url,
        })
      })
  },[]) */

  return (
    <div className='container'>

      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="" />
        </div>

      </header>

      <input 
        type="text" 
        placeholder="Digite o seu nome..." 
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(students => <Card key={students.time} name={students.name} time={students.time}/>)
      }
      
    </div>
  )
}


