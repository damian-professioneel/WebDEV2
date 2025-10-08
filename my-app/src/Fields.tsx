<<<<<<< HEAD
import React from 'react';
import './FrontendCSS/styles.css';

export const FieldsTable: React.FC<{}> = () => {
    return (
        <div>
            <h1>SOORTEN VELDEN</h1>
            <div>
                <p>Baan nummer: </p><input type="number" id="baanInput"/>
                <p>Spelers: </p><input type="number" id="spelersInput" placeholder="4"/>
                <p>Speltype: </p>
                <select id="spelType">
                <option>Padel</option>
                <option>Tennis</option>
                </select>
            </div>
            <button id="knopvooradd">Toevoegen</button>
            <ul id="banenLijst">
            </ul>

        </div>
    )
}
=======
export const Fields: React.FC = () => {
    return <div>DimmaD is clueless over react help deze arme jongen....</div>
};
>>>>>>> 8f0112e15b0258261642ee215ca6444b0c98e19e
