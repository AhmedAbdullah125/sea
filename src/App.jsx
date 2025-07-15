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
import PrivteTours from './pages/PrivteTours';
import Table from './pages/Table';
import TransportPage from './pages/TransportPage';
import Trip from './pages/Trip';
import VisaGatePage from './pages/VisaGatePage';
import VisaPage from './pages/VisaPage';
import Hotels from './pages/Hotels';
import Hotel from './pages/Hotel';
import { Toaster } from 'sonner';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import UserContextProvider from './context/UserContext';
import SingleVisaPage from './pages/SingleVisaPage';
import SingleTourPage from './pages/SingleTourPage';
import AddHouse from './pages/AddHouse';
import Packages from './pages/Packages';
import Package from './pages/Package';
import BlogsPage from './pages/blogs';
import SingleBlogPage from './pages/SingleBlog';

export const AppContext = createContext();
function App() {
	const queryClient = new QueryClient()
	const routes = createBrowserRouter([{
		path: '', element: <Layout></Layout>, children: [
			{ index: true, element: <Homepage></Homepage> },
			{ path: "/transport", element: <TransportPage></TransportPage> },
			{ path: "/privite-tours", element: <PrivteTours></PrivteTours> },
			{ path: "/tours/:id", element: <SingleTourPage></SingleTourPage> },
			{ path: "visa", element: <VisaPage></VisaPage> },
			{ path: "/visa/:id", element: <SingleVisaPage></SingleVisaPage> },
			{ path: "/gate", element: <ProtectedRoute><VisaGatePage></VisaGatePage></ProtectedRoute> },
			{ path: "/table", element: <Table></Table> },
			{ path: "/trip", element: <Trip></Trip> },
			{ path: "/event", element: <Event></Event> },
			{ path: "/hotels", element: <Hotels></Hotels> },
			{ path: "/hotel", element: <Hotel></Hotel> },
			{ path: "/add-house", element: <AddHouse></AddHouse> },
			{ path: "/packages", element: <Packages></Packages> },
			{ path: "/package", element: <Package></Package> },
			{ path: "/blogs", element: <BlogsPage></BlogsPage> },
			{ path: "/blogs/:slug", element: <SingleBlogPage></SingleBlogPage> },

			// { path: '/login', element: <Login></Login> },			
		]
	}
	])
	return (
		<QueryClientProvider client={queryClient}>
			<UserContextProvider>
			<div>
				<Toaster richColors closeButton position='top-center' dir='rtl'/>
				<RouterProvider router={routes}></RouterProvider>
			</div>
			</UserContextProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
export default App