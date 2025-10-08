import React, { useState } from 'react';
import './FrontendCSS/styles.css';

type banen =
{
    baan: number;
    spelers: number;
    speltype: string;
    occupied: boolean;
}

const [banenopslag, setBanenopslag] = useState<banen[]>
([
    { baan: 1, spelers: 4, speltype: "Padel",  occupied: false },
    { baan: 2, spelers: 4, speltype: "Padel",  occupied: false },
    { baan: 3, spelers: 4, speltype: "Padel",  occupied: false },
    { baan: 4, spelers: 2, speltype: "Padel",  occupied: false },
    { baan: 5, spelers: 2, speltype: "Padel",  occupied: false },
    { baan: 6, spelers: 4, speltype: "Tennis", occupied: false },
    { baan: 7, spelers: 4, speltype: "Tennis", occupied: false },
    { baan: 8, spelers: 4, speltype: "Tennis", occupied: false },
    { baan: 9, spelers: 2, speltype: "Tennis", occupied: false },
    { baan: 10, spelers: 2, speltype: "Tennis", occupied: false }
])

const deleteBaan = (baan: banen) =>
{
    setBanenopslag(prev => prev.filter(b => b.baan != baan.baan));
}

const loadBaan = banenopslag
    .filter(baan => baan.occupied != true)
    .map(baan => <ul>Baan: {baan.baan} - Spelers: {baan.spelers} - Speltype {baan.speltype} <button className="verwijderKnop" onClick={() => deleteBaan(baan)}>Delete</button></ul>


)


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
            <ul id="banenLijst">
                {loadBaan}
            </ul>

        </div>
    )
}
