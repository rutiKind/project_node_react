import './styleHome.css'
import { Route, Routes } from 'react-router-dom'
import { Nav } from './Nav'
import { Home } from './Home'
import { AllAdvertiser } from './AllAdvertiser'
import { Login } from './Login'
import {Register} from './Register'
import { AllApartments } from './AllApartments'
import { AllMyApartment } from './AllMyApartment'
import { ResertPassword } from './resetPassword'
import {AllApartment} from './AllAparatment2'
import { AddApartment } from './AddApartment'
import { CommonQuestions} from './CommonQuestions'

export const Routing = () => {
    return <>
        {/* Routes - מכיל כמה ניתובים */}
        <Routes>
            {/* Route - הגדרת ניתוב בודד */}
            {/* path = מחרוזת הניתוב */}
            {/* element = הקומפוננטה שתטען עבור הניתוב */}
            <Route path={'/'} element={<Home></Home>}></Route>
            <Route path={'Home'} element={<Home></Home>}></Route>
            <Route path={'AllAdvertiser'} element={<AllAdvertiser></AllAdvertiser>}></Route>
            <Route path={'Login'} element={<Login></Login>}></Route>
            <Route path={'Register'} element={<Register></Register>}></Route>
            <Route path={'AllApartments'} element={<AllApartments></AllApartments>}></Route>
            <Route path={'AllApartment'} element={<AllApartment></AllApartment>}></Route>
            <Route path={'AddApartment'} element={<AddApartment></AddApartment>}></Route>
            <Route path={'AllMyApartment'} element={<AllMyApartment></AllMyApartment>}></Route>
            <Route path={'ResertPassword/:email'} element={<ResertPassword></ResertPassword>}></Route>
            <Route path={'CommonQuestions'} element={<CommonQuestions></CommonQuestions>}></Route>

            {/* <Route path={'Try2/:word/:spe'} element={<BasicAccordion2></BasicAccordion2>}></Route> */}
            {/* :1שם_פרמטר2/:  שם_פרמטר */}
            {/* <Route path={'Wellcome/:username/:pass'} element={<Wellcome></Wellcome>}></Route>
            <Route path={'List'} element={<Prod></Prod>}> */}
                {/* children - כתיבה בין התגיות - טעינה בנוסף לאבא */}
                {/* <Route path={'Details/:name/:area/:capital'} element={<Details></Details>}></Route>
            </Route> */}
        </Routes>
    </>
}