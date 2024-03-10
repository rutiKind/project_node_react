
//התקנות של ראוטינג
//npm i router-dom react-router-dom
import './styleHome.css'
import { Route, Routes } from 'react-router-dom'
import { Nav } from './Nav'
import { Home } from './Home'
import { FindSearch } from './FindSearch'
// import { AllTora } from './AllTora'
import {FindSomeSearch} from './FindSomeSearch'
import { Details } from './details'
import { History } from './History'
import { FindOnly } from './findOnly'
import{ FindPlaceSearch} from './findPlaceSearch'
import { AllAdvertiser } from './AllAdvertiser'
import { Register } from './Register'
import {AllApartment} from './AllApartment'

export const Routing = () => {
    return <>
        {/* Routes - מכיל כמה ניתובים */}
        <Routes>
            {/* Route - הגדרת ניתוב בודד */}
            {/* path = מחרוזת הניתוב */}
            {/* element = הקומפוננטה שתטען עבור הניתוב */}
            <Route path={'/'} element={<Home></Home>}></Route>
            <Route path={'Home'} element={<Home></Home>}></Route>
            <Route path={'FindSearch/:word'} element={<FindSearch></FindSearch>}></Route>
            <Route path={'FindSomeSearch/:word'} element={<FindSomeSearch></FindSomeSearch>}></Route>
            <Route path={'FindOnly/:word'} element={<FindOnly></FindOnly>}></Route>
            <Route path={'FindPlaceSearch/:word/:setSelectedValue'} element={<FindPlaceSearch></FindPlaceSearch>}></Route>
            <Route path={'AllApartment'} element={<AllApartment></AllApartment>}></Route>
            {/* <Route path={'AllTora'} element={<AllTora></AllTora>}></Route> */}
            <Route path={'Details/:word'} element={<Details></Details>}></Route>
            <Route path={'History'} element={<History></History>}></Route>
            <Route path={'AllAdvertiser'} element={<AllAdvertiser></AllAdvertiser>}></Route>
            <Route path={'Register'} element={<Register></Register>}></Route>

            {/* :1שם_פרמטר2/:  שם_פרמטר */}
            {/* <Route path={'Wellcome/:username/:pass'} element={<Wellcome></Wellcome>}></Route>
            <Route path={'List'} element={<Prod></Prod>}> */}
                {/* children - כתיבה בין התגיות - טעינה בנוסף לאבא */}
                {/* <Route path={'Details/:name/:area/:capital'} element={<Details></Details>}></Route>
            </Route> */}
        </Routes>
    </>
}