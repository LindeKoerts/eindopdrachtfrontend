import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

import InputField from "../inputField/InputField";
import Button from "../button/Button";

import './RegisterForm.css';

const RegisterForm = () => {
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleFormSubmit = async (data) => {
        const source = axios.CancelToken.source();

        try {
            await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                'username': data.username,
                'email': data.email,
                'password': data.password,
            }, {
                cancelToken: source.token,
            })

            history.push('/inloggen');

            toast('You have successfully registered an account!')

            return function cleanup() { source.cancel(); }

        } catch (e) {
            console.error(e.response);
        }
    }

    return (

        <form className="register-form" onSubmit={handleSubmit(handleFormSubmit)}>
            <h1 className="title">AANMELDEN BIJ #WHATTOWEAR.</h1>

            <InputField
                labelText='Gebruikersnaam'
                inputId='username-input'
                inputName='username'
                placeholder="Gebruikersnaam (min. 6)"
                register={register}
                errors={errors}
                validationRules={
                    {
                        required: 'Gebruikersnaam is noodzakelijk',
                        minLength: {
                            value: 6,
                            message: 'Gebruikers naam moet minimaal 6 karakters bevatten '
                        }
                    }
                }
            />


            <br/>
            <br/>

            <InputField
                labelText='Email'
                inputType='email'
                inputId='email-input'
                inputName='email'
                placeholder="Email"
                register={register}
                errors={errors}
                validationRules={{required: 'Email is noodzakelijk'}}
            />

            <br/>
            <br/>


            <InputField
                labelText='Wachtwoord'
                inputType='password'
                inputId='password-input'
                inputName='password'
                placeholder="Wachtwoord (min. 6)"
                register={register}
                errors={errors}
                validationRules={
                    {
                        required: 'Wachtwoord is noodzakelijk',
                        minLength: {
                            value: 6,
                            message: 'Wachtwoord moet minimaal 6 karakters bevatten '
                        }
                    }
                }
            />

            <br/>

            <Button
                className="roze"
            >
                Register
            </Button>

            <p>Heb je al een account? <Link to='/inloggen' className="signin-link">Log in</Link></p>
        </form>
    );
}

export default RegisterForm;