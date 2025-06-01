import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage'
import { createContext } from 'react';
import '../src/css/main.css'
import '../src/css/fontawesome.min.css';
import Layout from './components/Layout';
import VisaPage from './pages/VisaPage';
import VisaGatePage from './pages/VisaGatePage';
import OmraaPage from './pages/OmraaPage';
import Table from './pages/Table';
import TransportPage from './pages/TransportPage';
import PrivteTours from './pages/PrivteTours';
import Trip from './pages/Trip';
export const AppContext = createContext();
function App() {
	const routes = createBrowserRouter([{
		path: '', element: <Layout></Layout>, children: [
			{ index: true, element: <Homepage></Homepage> },
			{ path: "/transport", element: <TransportPage></TransportPage> },
			{ path: "/transport/privte-tours", element: <PrivteTours></PrivteTours> },
			{ path: "visa/:country", element: <VisaPage></VisaPage> },
			{ path: "/gate", element: <VisaGatePage></VisaGatePage> },
			{ path: "/omraa", element: <OmraaPage></OmraaPage> },
			{ path: "/table", element: <Table></Table> },
			{ path: "/trip", element: <Trip></Trip> },

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