import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/shared/config/i18n/i18n.ts';
import '@/app/styles/index.scss';

const container = document.getElementById('root');

if (!container) {
	throw new Error('Сould not find root-container');
}

const root = createRoot(container);

root.render(
	<StrictMode>
		<BrowserRouter>
			<StoreProvider>
				<ErrorBoundary>
					<ThemeProvider>
						<ToastContainer autoClose={5000} draggable={false} position='bottom-right' />
						<App />
					</ThemeProvider>
				</ErrorBoundary>
			</StoreProvider>
		</BrowserRouter>
	</StrictMode>,
);
