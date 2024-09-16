

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import userReducer from './user/userslice';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";

// const rootReducer = combineReducers({
//     user: userReducer,
// });

// const persistConfig = {
//     key: root,
//     storage,
//     version: 1,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer, 
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({serializableCheck: false}),

// });

// export const persistor = persistStore(store);



import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userslice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine all your reducers here
const rootReducer = combineReducers({
    user: userReducer,
});

// Define the persist config
const persistConfig = {
    key: 'root',  // 'root' should be a string to identify the storage key
    storage,
    version: 1,   // Version can be useful for migrations
};

// Create a persisted reducer with the config and rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,  // Disables the serializability check for certain non-serializable objects
        }),
});

// Create a persistor instance for the store
export const persistor = persistStore(store);
