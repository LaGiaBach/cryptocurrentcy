import { configureStore } from "@reduxjs/toolkit";

import { crytoApi } from "../services/crytoApi";
import { crytoNewsApi } from "../services/cryptoNewsApi";

export default configureStore({
    reducer:{
        [crytoApi.reducerPath] : crytoApi.reducer,
        [crytoNewsApi.reducerPath] : crytoNewsApi.reducer,
    },
})