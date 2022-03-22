import { types } from "../types/types";

export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
});

export const removeError = () => ({
    type: types.uiRemoveError,
    
})


// accion para llamarlos y q hagan la accion 
export const startLoading = () => ({
    type: types.uiStartLoading,
    
})

export const finishLoading = () => ({
    type: types.uiFinishLoading,
    
})





