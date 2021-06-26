import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar';

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      background: "linear-gradient(to right, #4880EC, #019CAD)",
    }
}

const App = () => {
  return(
    <div style={styles.container}>
      <Calendar />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
