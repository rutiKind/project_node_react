
//import store from "./redux/Store"
import { Provider, useSelector } from 'react-redux'
import { Routing } from "./Routing"
import { Nav } from "./Nav"
import { BrowserRouter } from "react-router-dom";
import store from "./redux/Store";
import './styleHome.css'

export const Main = () => {

    return <>
        {/* Provider = קומפוננטה של ריאקט רידקס שמקבלת את הסטור כפרופס*/}
        {/* store = מילה שמורה שתקבל את המחסן שלי */}
        <Provider store={store}>
            {/* כל הקומפוננטות שיטענו בתוך הספק יכירו את הסטור */}
            {/* דרך טעינה, ניתוב, ילדים */}
            <BrowserRouter>
                <Nav></Nav>
                <Routing></Routing>
            </BrowserRouter>
        </Provider>

        {/* BrowserRouter - מסנן את הקומפוננטות הטעונות - נותן אפשרות לטעון רק ניתוב אחד
        {/* קומפוננטה שמנהלת את כל הניתובים */}
        {/* <BrowserRouter> */}
        {/* nav טוענת את ה */}
        {/* <Nav></Nav> */}
        {/* טוענת את כל הצהרות הניתובים */}
        {/* <Routing></Routing> */}
        {/* </BrowserRouter> */}
        {/* <Home></Home> */}
    </>
}