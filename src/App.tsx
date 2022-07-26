import React, { useState } from 'react';
import './App.css';
import DeleteModal from './DeleteModal';
import { TodoInterface } from './interfaces/todo.interface';
import { getUniqueId } from './utilit';
function App() {
  const [title ,setTitle] = useState<string>('')
  const [todos,setTodos] = useState<TodoInterface[]>([])
  // const [show,setShow] = useState<boolean>(true)
  const [search , setSearch] = useState<string>("")
  const [searchedArray , setSearchedArray] = useState<TodoInterface[]>([])
  const [rowId,setRowId] = useState<number>()
  const onTitleChange = (input : React.FormEvent<HTMLInputElement>) => {
    setTitle(input.currentTarget.value)
  }
  
const onSearchChange = (input:React.FormEvent<HTMLInputElement>)=>{
  setSearch(input.currentTarget.value)
  let todoArray = [...todos]
  let newsearchedArray = todoArray.filter(x=> x.title.includes(input.currentTarget.value))
  setSearchedArray(newsearchedArray)
}
  const addTodos = () =>{
    if(!title){
      return
    }
    
    let todoArray = [...todos]
    todoArray.push({
      title,
      isComplete:false,
      id:getUniqueId()
    })
    setTodos(todoArray)
    setTitle('')
  }
  
  function doDataCompleteandIncomplete(id:number){
    let todoArray = [...todos]
    let a = todoArray.filter(x=> x.id === id)
    a[0].isComplete = !a[0].isComplete
    setTodos(todoArray)
  }
  


  const deleteTodo = (id:number) => {
    
   let todoArray = [...todos]
   console.log(id)
    let filteredArray = todoArray.filter(x=> x.id !== id)
    console.log(filteredArray)
    setTodos(filteredArray)
  }


const loadData=(arg:TodoInterface[])=>{
return arg && arg.length>0 && arg.map(row=>{
  return(
    <tr key={row.id}>
    <td onClick={ ()=>onTitleClick(row.id,row.title)} style={{width:"700px"}}>{row.title}</td>
    <td><div className="form-check">
<input style={{width:"30px" , height:"30px" , float:"right"}} checked={row.isComplete} onChange={()=>{}} onClick={()=>doDataCompleteandIncomplete(row.id)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />

</div>
</td>
    <td ><DeleteModal id={row.id} handleDelete={deleteTodo} /></td>
  </tr>
  )
})
}


const onTitleClick = (id:number,title:string)=>{
  console.log(id)
  setRowId(id)
  setTitle(title)
}
const updateData = (id:number)=>{
  let newArray = [...todos]
  let filteredArray = newArray.filter(x=>x.id === id)
  filteredArray[0].title = title
  setTodos(newArray)
  setRowId(undefined)
  setTitle('')
}

  return (
    <div>
    <div className='row' style={{ marginLeft: "150px"}}>
     <div className='col-md-8'>
        <h3 className='mt-3 mb-3'>Todo App</h3>
        <div className='row'>
          <div className='col-md-10'>
            <input value={title} onChange={onTitleChange}  className="form-control form-control-lg" type="text" placeholder="What you will do today?" aria-label=".form-control-lg example" />
          </div>
          <div className='col-md-2'>
            {rowId == null ? <button onClick={addTodos} className='btn btn-primary btn-lg'>Add</button> : <button className="btn btn-primary" onClick={()=> updateData(rowId)}>Update</button>}
          </div>
        </div>

        <div className="mb-3 row mt-5">
          <h4 className="col-sm-2">Todo List</h4>
          <div className="col-sm-9">
            <input onChange={onSearchChange} type="text" className="form-control" id="inputText" placeholder='Filter list by typing a word or phrase' />
          </div>
        </div>

        <div  style={{marginRight:"80px"}}>
        <table className="table">
  
  <tbody>
    {search && loadData(searchedArray) || (todos.length>0 && loadData(todos) || null )}
   
  </tbody>
</table>
        </div>
        </div>
        <div className='col-md-4' style={{marginTop:"150px"}}>
        <h2 className='mb-3'>Summary</h2>
        <h5>Pending : {todos.filter(x=>x.isComplete !== true).length} </h5>
        <h5>Completed : {todos.filter(x=>x.isComplete== true).length}</h5>
        <h5>Total : {todos.length}</h5>
        </div>
    </div>
    </div>
    );
  }

export default App;
