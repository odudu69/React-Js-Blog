import { useState } from 'react'
import {FaLaptop, FaTabletAlt, FaMobileAlt} from 'react-icons/fa'
import DataContext from './context/DataContext'

const Header = ({title}) => {

    const {width} = useState(DataContext)

    return(
        <header>
            <h1>{title}</h1>
            {width < 760 ? <FaMobileAlt/>
            : width < 992 ? <FaTabletAlt/>
            : <FaLaptop/>}
        </header>
    )
}
export default Header