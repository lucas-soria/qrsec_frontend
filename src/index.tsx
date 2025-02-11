import { createRoot } from 'react-dom/client';
import { App } from './App';
import ServiceWorkerUpdate from './ServiceWorkerUpdate';


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  	<>
    	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
		<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
		<App />
		<ServiceWorkerUpdate />
  	</>
);
