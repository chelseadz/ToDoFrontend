import React, {useState, useEffect } from 'react';
import { fetchToDos,deleteToDo, doneToDo, fetchAllData} from './api.js';
import TableContainer from "./components/TableContainer.js"
import CreateToDoModal from './components/CreateToDoModal.js';
import UpdateModal from './components/UpdateModal.js';
import Filters from './components/filters.js';
import Metrics from './components/metrics.js';
import Pagination from './components/pagination.js';

import "./App.css"

function App() {


  const [todos, setToDos] = useState([]);
  const [allData, setAllData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [editModal, setEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(1);
  const [sortByDone, setSortByDone] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByPriority, setSortByPriority] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [doneFilter, setDoneFilter] = useState('all');

  
  const loadToDos = async () => {
    try {
      const response = await fetchToDos(
        pageSize,
        pageNumber,
        sortByDone,
        sortByDate,
        sortByPriority,
        nameFilter,
        priorityFilter,
        doneFilter,
      );
      setToDos(response);
    } catch (error) {
      console.error('Error fetching ToDos:', error);
    }
  };

  const loadAllData = async () => {
    try {
      const all = await fetchAllData();
      setAllData(all);
    } catch (error) {
      console.error('Error fetching ToDos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteToDo(id);
      loadToDos();
      loadAllData();
    } catch (error) {
      console.error('Error deleting ToDo:', error);
    }
  };

  const handleDone = async (id, done) => {
    try {
      await doneToDo(id, done);
      loadToDos();
      loadAllData();
    } catch (error) {
      console.error('Error updating done in ToDo:', error);
    }
  };

  const handleSetPage = (page) => {
    setPageNumber(page);
    loadToDos();
  };

  const handleSearch = (name, priority, state) => {
    setNameFilter(name);
    setPriorityFilter(priority);
    setDoneFilter(state)
    loadToDos();
  };

  const handleSortByPriority = (sort) => {
    setSortByPriority(sort);
    loadToDos();
  };

  const handleSortByDate = (sort) => {
    setSortByDate(sort);
    loadToDos();
  };

  const handleSortByDone = (sort) => {
    setSortByDone(sort);
    loadToDos();
  };

  const handleEdit = (id) => {
    setCurrentItem(id);
    setEditModal(true);
  };

  const refresh = () => {
    loadToDos();
    loadAllData();
  };


  useEffect(() => {
    loadToDos();
    loadAllData();
  },[pageSize, pageNumber, sortByDone, sortByDate, sortByPriority, nameFilter, priorityFilter, doneFilter]);


  return(
    <div className="App">
      <h1>ToDo App</h1>

      <Filters onSearch={handleSearch}></Filters>

      <div className='newtask-container'>
      <button className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}> Create To Do </button>
      </div>

      {modalOpen && 
      <CreateToDoModal
        setOpenModal={setModalOpen}
        onNewToDo={refresh} 
        />}

      {editModal && 
      <UpdateModal
        itemId={currentItem}
        setOpenModal={setEditModal}
        onUpdate={loadToDos} 
        />}

      <TableContainer
      onDelete ={handleDelete} 
      onUpdate={handleEdit} 
      onDone={handleDone}
      data = {todos} 
      sortDone={handleSortByDone}
      sortPriority={handleSortByPriority}
      sortDueDate={handleSortByDate}
      />


      <Pagination 
      setPage={handleSetPage}
      actualPage={pageNumber}
      totalPages={totalPages}></Pagination>
      

      <Metrics 
      todos={allData} 
      setterPages={setTotalPages}
      pageSize={pageSize}></Metrics>
      
      
    </div>
  )
}


export default App;
