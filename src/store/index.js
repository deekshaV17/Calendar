import { createStore } from "redux";

import month from "./monthReducer";

const configureStore = (state) => createStore(month, state);

export default configureStore;
