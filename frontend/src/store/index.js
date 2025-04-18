import { configureStore } from '@reduxjs/toolkit';
// Importa tus reducers aquí cuando los crees
// import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    // Añade tus reducers aquí
    // auth: authReducer,
  },
});

export default store;

// Exporta tipos para usar con TypeScript si es necesario
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;