import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
import Logout from './pages/Logout';
import SingleBlogPage from './pages/SingleBlog';
import Profile from './pages/Profile';
import AccountLayout from './pages/AccountLayout';
import Favourates from './pages/Favourates';
import Reservations from './pages/Reservations';
import Login from './pages/Login';
import SingleNewsletter from './pages/SingleNewsletter';
import Blogs from './pages/Blogs';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import PaymentMaintenance from './components/hotel/PaymentMaintenance';
import PreVisa from './pages/PreVisa';

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
			{ path: "previsa", element: <PreVisa></PreVisa> },
			{ path: "/visa/:id", element: <SingleVisaPage></SingleVisaPage> },
			{ path: "/gate", element: <ProtectedRoute><VisaGatePage></VisaGatePage></ProtectedRoute> },
			{ path: "/table", element: <Table></Table> },
			{ path: "/trip", element: <Trip></Trip> },
			{ path: "/event", element: <Event></Event> },
			{ path: "/hotels", element: <Hotels></Hotels> },
			{ path: "/hotel/:id", element: <Hotel></Hotel> },
			{ path: "/add-house", element: <AddHouse></AddHouse> },
			{ path: "/packages", element: <Packages></Packages> },
			{ path: "/package/:id", element: <Package></Package> },
			{ path: "/terms", element: <Terms></Terms> },
			{ path: "/privacy", element: <Privacy></Privacy> },
			{ path: "/login", element: <Login></Login> },
			{ path: "/blogs", element: <Blogs></Blogs> },
			{ path: "/paymentMaintenance", element: <PaymentMaintenance></PaymentMaintenance> },
			{ path: "/blogs/:slug", element: <SingleBlogPage></SingleBlogPage> },
			{ path: "/newsletter/:slug", element: <SingleNewsletter></SingleNewsletter> },
			{
				path: "account", element: <AccountLayout />,
				children: [
					{ path: "profile", element: <Profile /> },
					{ path: "favorites", element: <Favourates /> },
					{ path: "reservations", element: <Reservations /> },
					{ path: "logout", element: <Logout /> }
				]
			}
			
		]
	}
	])
	return (
		<QueryClientProvider client={queryClient}>
			<UserContextProvider>
				<div>
					<Toaster richColors closeButton position='top-center' dir='rtl' />
					<RouterProvider router={routes}></RouterProvider>
				</div>
			</UserContextProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
export default App