import React, {useState} from "react";
import styled from "styled-components";
import {Button, TextField, Container, Input, MenuItem, Select, InputLabel, CardMedia} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

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


    return (
        <div>
            <FormStyled autoComplete="off">

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

                <TextFieldStyled onChange={handleChange} value={message}
                                 multiline
                                 rowsMax="4"
                                 required
                                 id="message"
                                 label="message" variant="outlined"
                />

                <TextField
                    id="dateStartReservation"
                    label="dateStartReservation"
                    type="date"
                    value={dateStartReservation}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="dateEndReservation"
                    label="dateEndReservation"
                    type="date"
                    value={dateEndReservation}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
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


                <ButtonCreate variant="contained" onClick={() => console.log("soumission du formulaire")} color="primary"
                              aria-label="edit">create</ButtonCreate>
            </FormStyled>

        </div>
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
