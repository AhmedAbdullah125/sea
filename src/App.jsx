import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage'
import { createContext } from 'react';
import '../src/css/main.css'
import '../src/css/fontawesome.min.css';
import Layout from './components/Layout';
export const AppContext = createContext();
function App() {
	const routes = createBrowserRouter([{
		path: '', element: <Layout></Layout>, children: [
			{ index: true, element: <Homepage></Homepage> },
			// { path: '/login', element: <Login></Login> },			
		]
	}
	])
	return (
		<div>
			<RouterProvider router={routes}></RouterProvider>
		</div>
	)
}
export default App