import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { getFirestore } from "firebase/firestore";

import App from "./components/App/App";
import { initializeFirebase } from "firebaseDB/firebase_init";

getFirestore(initializeFirebase);

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);