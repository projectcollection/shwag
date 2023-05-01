import { Link, Outlet, useLocation } from 'react-router-dom';

import './App.css'

function App() {
    const { pathname } = useLocation();

    return (
        <>
            <div id="layout">
                <div>
                    <img src="https://wips.art/cdn/images%2FO8y5i3rtfhNlmM2UrQc18lFOD222%2Feopekxtjwthdm3qhbvxoga_image.png" id="extra" />
                </div>
                <div>
                    <div>
                        <h1>test react</h1>
                    </div>
                    <div className="card">
                        {pathname != '/signup' && <Link to='/signup'>signup</Link>}
                        {pathname != '/login' && <Link to='/login'>login</Link>}
                        {pathname != '/dashboard' && <Link to='/dashboard'>dash</Link>}
                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default App
