export const types = {

    // ESTO APARARECERA EN LA PANTALLA  DE REDUC PARA VER COMO SE LLAMA ESE ERROR
    login : '[Auth] Login',
    Logout: '[Auth] Logout',

    uiSetError :'[UI] set error',
    uiRemoveError : '[UI]set Error',

    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',


    notesAddNew : '[Notes]newNote',
    notesActive : '[Notes]Set active note',
    notesLoad : '[Notes]Load Note',
    notesUpdated: '[Notes] Updated notes',
     notesFileUrl : '[Notes] Update image url',
     notesDelete: '[Notes] Delete note',
     notesLogoutCleaning: '[Notes] Logout Cleaning',
  
}
/// UNA VEZ llamados se vera los errores q uno quiere q se carguen (name no completado)