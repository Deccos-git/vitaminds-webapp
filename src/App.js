import { BrowserRouter } from 'react-router-dom';
import Navigation from './nav/Navigation';
import { AuthProvider } from './state/Auth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter key='router'>
        <Navigation/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
