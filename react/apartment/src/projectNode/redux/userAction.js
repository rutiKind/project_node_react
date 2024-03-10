
export const setCurrentUser = (user) => {
    debugger
    return { type: 'SET_CURRENT_USER', payload: user }
}

export const setCurrentClient = (user) => {
    debugger
    return { type: 'SET_CURRENT_CLIENT', payload: user }
}


export const addUser = (newUser) => {
    return { type: 'ADD_USER', payload: newUser }
}

export const updateUser = (index, user) => {
    //יכול לקבל רק אובייקט אחד payload
    //שיכיל את כל הפרמטרים json לכן נשלח אובייקט 
    return { type: 'UPDATE_USER', payload: { index, user } }
}

export const addStart = (index, start) => {
    //יכול לקבל רק אובייקט אחד payload
    //שיכיל את כל הפרמטרים json לכן נשלח אובייקט 
    return { type: 'ADD_START', payload: { index, start } }
}