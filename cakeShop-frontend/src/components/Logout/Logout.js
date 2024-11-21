import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import "./Logout.css"

function Logout() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    return (
        <Link to="/">
            <Button variant="primary" onClick={handleShow} className="button">
                Sair
            </Button>
        </Link>
    );
}

export default Logout;