import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './admin/auth';
import { solicitudSlice } from './admin/solicitud';
import { contactoSlice } from './admin/contacto';

export const store = configureStore({
    reducer: {
        auth        : authSlice.reducer,
        solicitud   : solicitudSlice.reducer,
        contacto    :contactoSlice.reducer,
    },
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;