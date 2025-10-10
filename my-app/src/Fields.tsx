import React, { useState } from 'react';

import './FrontendCSS/fields.css';




export const FieldsTable: React.FC<{}> = () => {
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

    const loadBaan = banenopslag
    .filter(baan => baan.occupied != true)
    .map(baan => <ul className='banenPrint'>Baan: {baan.baan} - Spelers: {baan.spelers} - Speltype {baan.speltype} <button className="verwijderKnop" onClick={() => deleteBaan(baan)}>Delete</button></ul>
    )

    const addBaan = () =>
    {
        const baannummer = document.getElementById("baanInput") as HTMLInputElement;
        const spelers = document.getElementById("spelersInput") as HTMLInputElement;
        const speltypeinp = document.getElementById("spelType") as HTMLInputElement;
        let errorMessage : string = ""

        //try en catch omdat hij alleen error zou geven als je iets veranderd aan de html code aka attack.
        try {
            //check empty inputs, because required is ass
            if (baannummer.value =="" || spelers.value =="")
            {
                alert("Baannummer en spelers moeten allebei ingevuld zijn.")
                return
            }

            let baannummerInt : number = parseInt(baannummer.value)
            let spelersInt : number = parseInt(spelers.value)
            if (speltypeinp.value != "Tennis" && speltypeinp.value != "Padel")
            {
                alert("Attack found, go back!");
                return;
            }

            const nieuweBaan : banen = {
                baan: baannummerInt,
                spelers: spelersInt,
                speltype: speltypeinp.value,
                occupied: false
            }


            {
                setBanenopslag(prev => [...prev, nieuweBaan]);
            }


        } catch (error) {
            alert("Attack detected, go back!")
            return;
        }

    }

    const deleteBaan = (baan: banen) =>
    {
        setBanenopslag(prev => prev.filter(b => b.baan != baan.baan));
    }
    return (
        <div className="fieldsWrapper">
            <h1>SOORTEN VELDEN</h1>
            <form className = "invoegBoxes">
                <p>Baan nummer: </p><input type="number" id="baanInput" required min="1"/>
                <p>Spelers: </p><input type="number" id="spelersInput" placeholder="4" required min="1"/>
                <p>Speltype: </p>
                <select id="spelType" required>
                <option>Padel</option>
                <option>Tennis</option>
                </select>
                <button id="knopvooradd" onClick={() => addBaan()}>Toevoegen</button>
            </form>

            <ul id="banenLijst">
            </ul>
            <ul id="banenLijst">
                {loadBaan}
            </ul>

        </div>
    )
}