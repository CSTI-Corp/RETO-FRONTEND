import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './admin/auth';
import { userSlice } from './admin/solicitud';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
    },
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;