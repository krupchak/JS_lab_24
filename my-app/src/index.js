import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Task1 = ({ employees, handleDaysChange, handleRateChange }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Ім'я</th>
          <th>Прізвище</th>
          <th>Кількість днів</th>
          <th>Ставка за день</th>
          <th>Зарплата</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>
              <input
                type="number"
                value={employee.days}
                onChange={(event) => handleDaysChange(event, index)}
              />
            </td>
            <td>
              <input
                type="number"
                value={employee.rate}
                onChange={(event) => handleRateChange(event, index)}
              />
            </td>
            <td>{employee.days * employee.rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TotalSalary = ({ employees }) => {
  const total = employees.reduce((acc, employee) => acc + employee.days * employee.rate, 0);

  return <p>Сумарна зарплата: {total}</p>;
};

const AppTask1 = () => {
  const [employees, setEmployees] = useState([
    { firstName: 'Іван', lastName: 'Петров', days: 20, rate: 100 },
    { firstName: 'Марія', lastName: 'Сидорова', days: 25, rate: 120 },
    { firstName: 'Олег', lastName: 'Ковальов', days: 22, rate: 110 }
  ]);

  const handleDaysChange = (event, index) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].days = event.target.value;
    setEmployees(updatedEmployees);
  };

  const handleRateChange = (event, index) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].rate = event.target.value;
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <h1>1</h1>
      <Task1
        employees={employees}
        handleDaysChange={handleDaysChange}
        handleRateChange={handleRateChange}
      />
      <TotalSalary employees={employees} />
    </div>
  );
};

const AppTask2 = () => {
  const questions = [
    {
      question: 'Скільки буде 2 + 2?',
      answer: '4'
    },
    {
      question: 'Яка столиця України?',
      answer: 'Київ'
    },
    {
      question: 'Який кольору небо?',
      answer: 'Синій'
    }
  ];

  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);

  const handleChange = (event, index) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    setShowResults(true);
  };

  const resetTest = () => {
    setUserAnswers(Array(questions.length).fill(''));
    setShowResults(false);
  };

  return (
    <div>
      <h1>2</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          {!showResults ? (
            <input type="text" value={userAnswers[index]} onChange={(event) => handleChange(event, index)} />
          ) : userAnswers[index].toLowerCase() === question.answer.toLowerCase() ? (
            <p style={{ color: 'green' }}>Ваша відповідь правильна</p>
          ) : (
            <p style={{ color: 'red' }}>
              Ваша відповідь не правильна. Правильна відповідь така: {question.answer}
            </p>
          )}
        </div>
      ))}
      {!showResults ? (
        <button onClick={calculateScore}>Скласти тест</button>
      ) : (
        <div>
          <p>Ви завершили тест</p>
          <button onClick={resetTest}>Повторити тест</button>
        </div>
      )}
    </div>
  );
};

const Task3 = () => {
  const questions = [
    {
      question: 'Скільки буде 2 + 2?',
      answer: '4'
    },
    {
      question: 'Яка столиця України?',
      answer: 'Київ'
    },
    {
      question: 'Який кольору небо?',
      answer: 'Синій'
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (event) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(''));
    setShowResults(false);
  };

  return (
    <div>
      <h1>3</h1>
      {showResults ? (
        <>
          <h3>Результати</h3>
          {questions.map((question, index) => (
            <div key={index}>
              <p>
                {question.question} -{' '}
                {userAnswers[index].toLowerCase() === question.answer.toLowerCase() ? (
                  <span style={{ color: 'green' }}>Ваша відповідь правильна</span>
                ) : (
                  <span style={{ color: 'red' }}>
                    Ваша відповідь не правильна. Правильна відповідь така: {question.answer}
                  </span>
                )}
              </p>
            </div>
          ))}
          <button onClick={resetTest}>Повторити тест</button>
        </>
      ) : (
        <>
          <h3>{questions[currentQuestionIndex].question}</h3>
          <input
            type="text"
            value={userAnswers[currentQuestionIndex]}
            onChange={handleAnswerChange}
          />
          <button disabled={currentQuestionIndex === 0} onClick={goToPreviousQuestion}>
            Назад
          </button>
          <button
            disabled={currentQuestionIndex === questions.length - 1}
            onClick={goToNextQuestion}
          >
            Вперед
          </button>
          {currentQuestionIndex === questions.length - 1 && (
            <button onClick={checkAnswers}>Перевірити відповіді</button>
          )}
        </>
      )}
    </div>
  );
};

const Task4 = () => {
  const questions = [
    {
      question: 'Скільки буде 2 + 2?',
      answer: '4',
      options: ['5', '22', '3', '4']
    },
    {
      question: 'Яка столиця України?',
      answer: 'Київ',
      options: ['Львів', 'Одеса', 'Київ', 'Харків']
    },
    {
      question: 'Який кольору небо?',
      answer: 'Синій',
      options: ['Зелений', 'Жовтий', 'Червоний', 'Синій']
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (event) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(''));
    setShowResults(false);
  };

  return (
    <div>
      <h1>4</h1>
      {showResults ? (
        <>
          <h3>Результати</h3>
          {questions.map((question, index) => (
            <div key={index}>
              <p>
                {question.question} -{' '}
                {userAnswers[index].toLowerCase() === question.answer.toLowerCase() ? (
                  <span style={{ color: 'green' }}>Ваша відповідь правильна</span>
                ) : (
                  <span style={{ color: 'red' }}>
                    Ваша відповідь не правильна. Правильна відповідь така: {question.answer}
                  </span>
                )}
              </p>
            </div>
          ))}
          <button onClick={resetTest}>Повторити тест</button>
        </>
      ) : (
        <>
          <h3>{questions[currentQuestionIndex].question}</h3>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={userAnswers[currentQuestionIndex] === option}
                  onChange={handleAnswerChange}
                />
                {option}
              </label>
            </div>
          ))}
          <button disabled={currentQuestionIndex === 0} onClick={goToPreviousQuestion}>Назад</button>
          <button
          disabled={currentQuestionIndex === questions.length - 1}
          onClick={goToNextQuestion}>Вперед</button>
          {currentQuestionIndex === questions.length - 1 && (
          <button onClick={checkAnswers}>Перевірити відповіді</button>)}
          </>
          )}
          </div>
          );
};

const Task6 = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      return updatedTasks;
    });
  };

  const handleTaskChange = (event, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = event.target.value;
    setTasks(updatedTasks);
  };

  return (
    <div>
        <h1>5</h1>
      <input
        type="text"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      />
      <button onClick={addTask}>Додати завдання</button>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <input
              type="text"
              value={task.text}
              onChange={(event) => handleTaskChange(event, index)}
            />
            <button onClick={() => deleteTask(index)}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <div>
            <AppTask1 />
            <AppTask2 />
            <Task3 />
            <Task4 />
            <Task6 />
        </div>
    );