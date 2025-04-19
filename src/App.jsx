import { useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

 
  const addTodo = (e) => {
    e.preventDefault();
    if(text.trim()=="")return
    let count=0
    for(let i=0;i<list.length;i++){
      if(list[i].text == text){
        count=1
      }
    }
    if(count==1)return
    setText(text);
    setList([{ text, index: list.length }, ...list]);
    setText("");
  };

  const deleteTodo = (items) => {
    setList(list.filter((value) => value != items));
  };

  const editFun = (editIndex, currentText) => {
    setEditIndex(editIndex);
    setEditText(currentText);
  };

  const saveEdit = () => {
    
    const updatedList = [...list];
    if(editText.trim()=="")return
    updatedList[editIndex].text = editText;
    setList(updatedList);
    setEditIndex(null);
    setEditText("");
  };

  // Styles
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#333',
      padding: '10px',
      borderBottom: '2px solid #6366f1'
    },
    form: {
      display: 'flex',
      marginBottom: '20px',
      gap: '10px'
    },
    input: {
      flex: '1',
      padding: '10px 15px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '16px',
    },
    addButton: {
      backgroundColor: '#6366f1',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    todoList: {
      listStyleType: 'none',
      padding: '0',
      margin: '0'
    },
    todoItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '10px',
      backgroundColor: '#f8f9fa',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    todoText: {
      flex: '1',
      padding: '8px 12px',
      backgroundColor: 'white',
      borderRadius: '4px',
      border: '1px solid #ddd',
      color:'red'
    },
    buttonGroup: {
      display: 'flex',
      gap: '8px',
      marginLeft: '10px'
    },
    editButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    saveButton: {
      backgroundColor: '#10b981',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginLeft: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Task Manager</h1>
      </div>
      
      <form style={styles.form} onSubmit={addTodo}>
        <input 
          type="text" 
          placeholder="Add item into Todo" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>Add</button>
      </form>
      
      <ul style={styles.todoList}>
        {list.map((items, index) => {
          return (
            <li key={index} style={styles.todoItem}>
              {index === editIndex ? (
                <>
                  <input 
                    type="text" 
                    value={editText} 
                    onChange={(e) => setEditText(e.target.value)} 
                    style={styles.input}
                  />
                  <button onClick={saveEdit} style={styles.saveButton}>Save</button>
                </>
              ) : (
                <>
                  <div style={styles.todoText}>{items.text}</div>
                  <div style={styles.buttonGroup}>
                    <button onClick={() => editFun(index, items.text)} style={styles.editButton}>Edit</button>
                    <button onClick={() => deleteTodo(items)} style={styles.deleteButton}>Delete</button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;