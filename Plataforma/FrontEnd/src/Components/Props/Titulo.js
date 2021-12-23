import React from 'react';
import { Label } from 'reactstrap';

export default function Titulo(titulo) {
    return (
        <div style={{ textAlign: "center" }}>
            <br>
            </br>
            <Label style={{ fontWeight: "bolder", fontSize: "28px", textAlign: "center", fontFamily: "Verdana", color: "#265900" }}> {titulo.nombre} </Label>
        </div>
    );
}