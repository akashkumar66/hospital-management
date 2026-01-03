import { configureStore } from "@reduxjs/toolkit";
import { Doctorreducer} from "./reducers.js";


const Store=configureStore(
    {
        reducer:Doctorreducer
    }
)

export default Store;