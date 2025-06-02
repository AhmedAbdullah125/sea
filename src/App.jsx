import {
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';
import { createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '../src/css/fontawesome.min.css';
import '../src/css/main.css';
import Layout from './components/Layout';
import Event from './pages/Event';
import Homepage from './pages/Homepage';
import OmraaPage from './pages/OmraaPage';
import PrivteTours from './pages/PrivteTours';
import Table from './pages/Table';
import TransportPage from './pages/TransportPage';
import Trip from './pages/Trip';
import VisaGatePage from './pages/VisaGatePage';
import VisaPage from './pages/VisaPage';

export const AppContext = createContext();
function App() {
	const queryClient = new QueryClient()
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
			{ path: "/event", element: <Event></Event> },

			// { path: '/login', element: <Login></Login> },			
		]
	}
	])
	return (
		<QueryClientProvider client={queryClient}>
			<div>
				<RouterProvider router={routes}></RouterProvider>
			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
export default App