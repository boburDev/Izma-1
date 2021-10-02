import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, split, createHttpLink } from '@apollo/client'
import ReactDOM from 'react-dom';
import App from './pages/App/App';
import { BrowserRouter } from 'react-router-dom'
import { CourseProvider } from './context/CourseProvider'
import '../src/assets/izma fonts/fonts.scss'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import { LoginProvider } from './context/LoginProvider'
import { TeacherProvider } from './context/TeacherProvider'
import { EventProvider } from './context/EventProvider'
import { CheckProvider } from './context/CheckProvider'
import { StudentTableProvider } from './context/StudentTableProvider'
import { StudentPayProvider } from './context/StudentPay';
import { StudentFilterProvider } from './context/StudentFilter';
import { CourseFilterProvider } from './context/CourseFilterProvider';
import {TeachersTableProvider} from './context/TeachersTableProvider'
import { LoaderProvider } from './context/Loader';
import { DavomatProvider } from './context/DavomatProvider';
import { Pagination } from './context/Pagination';
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';

const isTester = false

// http://api.al-azhar.uz/api/graphql

// const api = `http://${isTester ? 'localhost:4000' : '159.65.235.181'}/graphql`
// const wssApi = `ws://${isTester ? 'localhost:4000' : '159.65.235.181'}/graphql`
const api = `https://${isTester ? 'localhost:4001' : 'api.triiipple.uz'}/graphql`
const wssApi = `wss://${isTester ? 'localhost:4001' : 'api.triiipple.uz'}/graphql`
// console.log(api, wssApi)


const httpLink = createHttpLink({
	uri: api,
  })

  
  const wsLink = () => {
  // Get the authentication token from local storage if it exists
  	const token = localStorage.getItem('token')
	  return new WebSocketLink({
			  uri: wssApi,
			  options: {
			  reconnect: true,
			  timeout: 30000,
			  connectionParams: {
				  Authorization: `Bearer ${token}`,
				  authToken: token
			  }
		  }
	  })
  }
  
  const authLink = setContext(async(_, { headers }) => {
	  const token = await localStorage.getItem('token')
	  return {
		headers: {
		  ...headers,
		  authorization: token ? `${token}` : "",
		}
	  }
  })
const splitLink = split(
	({ query }) => {
	const definition = getMainDefinition(query)
	return (
		definition.kind === 'OperationDefinition' &&
		definition.operation === 'subscription'
	)
	},
	wsLink(),
	authLink.concat(httpLink)
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

const Main = () => {
	return(
		<React.StrictMode>
    <BrowserRouter>
	 <SnackbarProvider 
	 	maxSnack={3}
		anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    TransitionComponent={Slide}
	>
      <ApolloProvider client={client}>
		<LoginProvider>
			<CourseProvider>
				<TeacherProvider>
					<EventProvider>
						<CheckProvider>
							<StudentTableProvider>
								<StudentPayProvider>
									<StudentFilterProvider>
										<CourseFilterProvider>
											<TeachersTableProvider>
												<LoaderProvider>
													<DavomatProvider>
														<Pagination>
															
																<App />
														</Pagination>
													</DavomatProvider>
												</LoaderProvider>
											</TeachersTableProvider>
										</CourseFilterProvider>
									</StudentFilterProvider>
								</StudentPayProvider>
							</StudentTableProvider>
						</CheckProvider>
					</EventProvider>
				</TeacherProvider>
			</CourseProvider>
		</LoginProvider>
		</ApolloProvider>
		</SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
	)
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);