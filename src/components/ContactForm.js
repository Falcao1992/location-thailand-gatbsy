import React, {useState} from "react";
import styled from "styled-components";
import {Button, TextField, Container} from "@material-ui/core";
import app from "../firebase";


const ContactForm = () => {
    const data = {
        name: "",
        mail: "",
        phoneNumber: "",
        numberPeople: "",
        dateStartReservation: "",
        dateEndReservation: "",
        message: ""
    };
    const [formData, setFormData] = useState(data);
    const {name, mail, phoneNumber, numberPeople, dateStartReservation, dateEndReservation, message} = formData;

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const newPostKey = app.database().ref("contactMessage").push().key;
        app.database().ref(`contactMessage`).update({
            [newPostKey] : formData
        });
        console.log("forulaire envoyé")
    };

    return (
        <Container fixed>
            <FormStyled onSubmit={handleSubmit} autoComplete="off">

                <TextFieldStyled onChange={handleChange} value={name}
                                 required
                                 id="name"
                                 label="name" variant="outlined"
                />

                <TextFieldStyled onChange={handleChange} value={numberPeople} required
                                 type="number"
                                 id="numberPeople"
                                 label="numberPeople"
                                 InputLabelProps={{
                                     shrink: true,
                                 }}
                                 variant="outlined"
                />

                <TextFieldStyled
                    id="dateStartReservation"
                    label="dateStartReservation"
                    type="date"
                    value={dateStartReservation}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextFieldStyled
                    id="dateEndReservation"
                    label="dateEndReservation"
                    type="date"
                    value={dateEndReservation}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextFieldStyled onChange={handleChange} value={message}
                                 multiline
                                 rowsMax="4"
                                 required
                                 id="message"
                                 label="message" variant="outlined"
                />

                <TextFieldStyled onChange={handleChange} value={mail} required
                                 type="mail"
                                 id="mail"
                                 label="mail" variant="outlined"
                />

                <TextFieldStyled onChange={handleChange} value={phoneNumber} required
                                 id="phoneNumber"
                                 label="phoneNumber" variant="outlined"
                />

                <ButtonCreate variant="contained" type="submit" color="primary"
                              aria-label="edit">create</ButtonCreate>
            </FormStyled>
        </Container>
    )
};

const FormStyled = styled.form`
        display: flex;
        flex-direction: column;        
         input {
             margin-bottom: 15px;
         }
        `;

const TextFieldStyled = styled(TextField)`
        width: 100%;
        margin-bottom: 15px !important;                     
    `;
const ButtonCreate = styled(Button)`
          margin-top: 15px !important;
    `;

export default ContactForm
