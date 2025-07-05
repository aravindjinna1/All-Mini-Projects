import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "learn english", day: 3, reminder: false }
  ]);

  const [showTask, setShowTask] = useState(false);
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const addTasks = (e) => {
    e.preventDefault();

    if (!text || !day) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      id: Math.floor(Math.random() * 10000) + 1,
      text,
      day,
      reminder
    };

    setTasks([...tasks, newTask]);
    setText('');
    setDay('');
    setReminder(false);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const toggleReminder = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id ? { ...item, reminder: !item.reminder } : item
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Task Adding</h1>
      <div className="btn">
        <button
          style={{ background: showTask ? "red" : "green" }}
          onClick={() => setShowTask(!showTask)}
        >
          {showTask ? "Close" : "Add"}
        </button>
      </div>

      {showTask && (
        <form onSubmit={addTasks}>
          <label>Text:</label>
          <input
            type="text"
            placeholder="Type Text.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <label>Date and Time:</label>
          <input
            type="number"
            placeholder="Enter day.."
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />

          <label>Remind:</label>
          <input
            type="checkbox"
            checked={reminder}
            onChange={(e) => setReminder(e.target.checked)}
          />

          <input type="submit" className="submit-btn" value="Save Task" />
        </form>
      )}

      {tasks.length > 0 ? (
        tasks.map((item) => (
          <div
            key={item.id}
            onDoubleClick={() => toggleReminder(item.id)}
            style={{
              border: item.reminder ? "2px solid green" : "1px solid gray",
              padding: "10px",
              margin: "10px 0"
            }}
          >
            <h3>
              {item.text}
              <span
                style={{ color: "red", cursor: "pointer", float: "right" }}
                onClick={() => deleteTask(item.id)}
              >
                ❌
              </span>
            </h3>
            <p>{item.day}</p>
          </div>
        ))
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
}

export default App;
