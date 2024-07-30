import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import Inscripciones from './routes/Inscripciones.jsx';
import InscripcionTable from './pages/InscripcionTable.jsx';
import ProductosInscritos from './routes/Productos.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'inscripciones',
        element: <Inscripciones />,

      },
      {
        path: 'inscripcion-Table',
        element: <InscripcionTable />,

      },
      {
        path: 'Productos',
        element: <ProductosInscritos />,

      }
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);