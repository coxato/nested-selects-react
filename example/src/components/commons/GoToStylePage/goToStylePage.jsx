import React from 'react';
import { Link } from 'react-router-dom';

function GoToStylesPages() {
    return(
        <div className="card">
            <div className="card-content">
                <h1 className="subtitle">¿No tienes estilos?</h1>
                <div className="content">nested-selects-react viene sin estilos, ¿por qué?, es para que puedas personalizarlo como desees.</div>
                <div className="content">Ve a la <Link to="/styles">página de estilos</Link> para aprender más.</div>
            </div>
        </div>
    )
}

export default GoToStylesPages;