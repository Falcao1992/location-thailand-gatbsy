import React, {useState} from "react";
import styled from "styled-components";
import {Button, TextField, Container} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import "typeface-pinyon-script"
import app from "../firebase";


const ContactForm = () => {
    const data = {
        name: "",
        firstName: "",
        mail: "",
        phoneNumber: "",
        numberPeople: "",
        dateStartReservation: "",
        dateEndReservation: "",
        message: ""
    };
    const [formData, setFormData] = useState(data);
    const [hasBeenSent, setHasBeenSent] = useState(false);
    const [missingField, setMissingField] = useState(false);

    const {name, mail, phoneNumber, numberPeople, dateStartReservation, dateEndReservation, message, firstName} = formData;

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };


    const sendData = () => {
        const newPostKey = app.database().ref("contactMessage").push().key;
        app.database().ref(`contactMessage`).update({
            [newPostKey]: formData
        });
        setHasBeenSent(true);
        setTimeout(() => {
            setHasBeenSent(false);
            console.log("data envoyé apres, le message s'affiche apres 3sec")
        }, 3000);
        setFormData(data);
        console.log("forulaire envoyé")
    };

    const checkFormConform = () => {
        return new Promise(function (resolve, reject) {
            if (name !== "" && firstName !== "" && numberPeople !== "" && message !== "" && mail !== "") {
                console.log("tout est rempli merci");
                sendData();
                setMissingField(false);
                resolve("resolu")
            } else {
                setMissingField(true);
                reject('pas résolu')
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await checkFormConform();
        console.log(result)
    };

    return (
        <Container fixed>
            <TitlePageStyled>Nous Contacter :</TitlePageStyled>
            {hasBeenSent && <ToastHasBeenSent><CheckIconStyled/> Votre message à bien été envoyé !</ToastHasBeenSent>}
            <FormStyled onSubmit={handleSubmit} autoComplete="off">

                <ContainerMultipleFields>
                    <TextFieldStyled onChange={handleChange} value={name}
                                     id="name"
                                     label="Nom *" variant="outlined"
                                     helperText={missingField && name === "" ? <small>Veuillez indiquer votre Nom svp
                                         !</small> : name !== "" && missingField ?
                                         <CorrectField>bien rempli*</CorrectField> : false}
                                     error={missingField && name === "" && true}
                    />

                    <TextFieldStyled onChange={handleChange} value={firstName}
                                     id="name"
                                     label="Nom *" variant="outlined"
                                     helperText={missingField && firstName === "" ?
                                         <small>Veuillez indiquer votre Prénom svp
                                             !</small> : firstName !== "" && missingField ?
                                             <CorrectField>bien rempli*</CorrectField> : false}
                                     error={missingField && firstName === "" && true}
                    />
                </ContainerMultipleFields>

                <TextFieldStyled onChange={handleChange} value={numberPeople}
                                 type="number"
                                 id="numberPeople"
                                 label="Nombre de personne *"
                                 variant="outlined"
                                 helperText={missingField && numberPeople === "" ?
                                     <small>Veuillez indiquer le nombre de personne svp
                                         !</small> : numberPeople !== "" && missingField ?
                                         <CorrectField>bien rempli*</CorrectField> : false}
                                 error={missingField && numberPeople === "" && true}
                />

                <ContainerMultipleFields>
                    <TextFieldStyled
                        id="dateStartReservation"
                        label="Début :"
                        type="date"
                        value={dateStartReservation}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextFieldStyled
                        id="dateEndReservation"
                        label="Fin :"
                        type="date"
                        value={dateEndReservation}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </ContainerMultipleFields>


                <TextFieldStyled onChange={handleChange} value={message}
                                 multiline
                                 rowsMax="4"
                                 id="message"
                                 label="message *" variant="outlined"
                                 helperText={missingField && message === "" ?
                                     <small>Veuillez rentrer un message svp !</small> : message !== "" && missingField ?
                                         <CorrectField>bien rempli*</CorrectField> : false}
                                 error={missingField && message === "" && true}
                />

                <TextFieldStyled onChange={handleChange} value={mail}
                                 type="mail"
                                 id="mail"
                                 label="Email *" variant="outlined"
                                 helperText={missingField && mail === "" ?
                                     <small>Veuillez rentrer une adresse mail valide
                                         !</small> : mail !== "" && missingField ?
                                         <CorrectField>bien rempli*</CorrectField> : false}
                                 error={missingField && mail === "" && true}
                />

                <TextFieldStyled onChange={handleChange} value={phoneNumber}
                                 id="phoneNumber"
                                 label="Numéro de téléphone" variant="outlined"
                />

                <ButtonCreate variant="contained" type="submit" color="primary"
                              aria-label="edit">Envoyer</ButtonCreate>
            </FormStyled>
        </Container>
    )
};

const TitlePageStyled = styled.h1`
        text-align: center;
        padding: 15px 0;
        color: ${props => props.theme.color.secondary};
        font-family: 'pinyon script' , cursive;
        font-size: 2.2rem;
        border-bottom: 1px solid ${props => props.theme.color.secondary};
        letter-spacing: 3px;
        `;

const ToastHasBeenSent = styled.p`
        background-color: #40ee5b;
        padding: 10px 5px;
        text-align: center;
        `;

const CheckIconStyled = styled(CheckIcon)`
        vertical-align: bottom;
        `;

const FormStyled = styled.form`
        display: flex;
        flex-direction: column;        
        input {
            margin-bottom: 15px;
        }
        `;

const CorrectField = styled.small`
        color: green
        `;


const ContainerMultipleFields = styled.div`
        display: flex;
        justify-content: space-between;
        > div {
        width: 45%;
        }
        `;

const TextFieldStyled = styled(TextField)`
        margin-bottom: 15px !important;   
        input {
            padding: 10px 14px;
        }                  
        `;
const ButtonCreate = styled(Button)`
        width: 50%;
        margin: auto;
        margin-top: 15px !important;
        background-color: black;
        color: ${props => props.theme.color.secondary} !important;
        transition: all .3s;
        &:hover {
            background-color: ${props => props.theme.color.secondary};
            color: ${props => props.theme.color.primary} !important;
        }       
        `;


export default ContactForm
