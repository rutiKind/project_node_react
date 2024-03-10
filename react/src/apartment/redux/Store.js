
//immer - ספריה שמאפשרת עריכת משתנים סופיים - constant variables
import { produce } from 'immer';

import { createStore } from 'redux';

//State - משתנה גלובלי שיהיה מוכר לכל הקומפוננטות
//initialState = סטייט מאותחל
//שם מקובל - לא חובה
const initialState = {
    tora:{text:' ! {ב} והארץ היתה תהו ובהו וחשך על פני תהום ורוח אלהים מרחפת על פני המים:'}
}

//reducer - לא מילה שמורה!
//produce - פונקציה מובנית
//מזהה את הפעולות שנשלחות לאויר ומפעילה אותן בפועל על הסטייט
//מקבלת שני ארגומנטים
//1. callback פונקציית 
//2. סטייט שעליו נפעיל את הפעולות
//הפונקציה הפנימית מקבלת שני ארגומנטים
//1. state - הסטייט שהתקבל בפונקציה החיצונית
//2. action - פעולה כלשהיא
//הפונקציה הפנימית תבדוק איזה פעולה נשלחה ותפעיל אותה על הסטייט
const reducer = produce((state, action) => {

    switch (action.type) {
        case 'GET_TORA':
            state.tora = action.payload
            break;
        default:
            break;
    }

}, initialState)

//יצירת המחסן - מקבל את הרדיוסר
const store = createStore(reducer)
window.store = store;
export default store;