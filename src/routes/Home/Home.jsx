import { IconContext } from 'react-icons';
import {RiAliensFill as AppIcon } from 'react-icons/ri';

import './Home.scss';

export default function Home(props) {

    return (
        <main>
            <IconContext.Provider value={{ color: '#FF4301'}}>
                <AppIcon />
            </IconContext.Provider>
        </main>
    )
}