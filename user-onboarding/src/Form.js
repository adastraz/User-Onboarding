import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import {withFormik, Form, Field} from 'formik'

const FormUser = ({
    values,
    errors,
    touched,
    status
}) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        console.log(status)
        status && setUsers(users =>
            [...users, status])
        },[status])
    
    return (
        <div className='user-form'>
            <Form>
                <label>
                    Name:
                    <Field
                        type='text'
                        name='name'
                    />
                    {touched.name &&
                    errors.name &&
                    <p className='errors'>
                        {errors.name}
                    </p>
                    }
                </label>
                <label>
                    Email:
                    <Field
                        type='email'
                        name='email'
                    />
                </label>
                <label>
                    Password:
                    <Field  
                        type='password'
                        name='password'
                    />
                    {touched.password &&
                    errors.password &&
                    <p className='errors'>
                        {errors.password}
                    </p>
                    }
                </label>
                <label>
                    Please Accept our Terms of Service :
                    <Field
                        type='checkbox'
                        name='terms'
                        checked={values.terms}
                    />
                    {touched.terms &&
                    errors.terms &&
                    <p className='errors'>
                        {errors.terms}
                    </p>
                    }
                </label>
                <button type='submit'>Submit!</button>
            </Form>
            {users.map(users => (
                <ul key={users.id}>
                    <li>Name: {users.name}</li>
                    <li>Email: {users.email}</li>
                    <li>Password: {users.password}</li>
                    <li>Terms: {users.terms}</li>
                </ul>
            ))}
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues(props){
        return {
            name: props.name || '',
            email: props.email || '',
            password: props.password || '',
            terms: false
        }
    },
    validationSchema:Yup.object().shape({
        name:Yup.string().required(),
        password:Yup.string().required(),
        terms:Yup.boolean().oneOf([true], "Must agree to terms")
    }),
    handleSubmit(values, {setStatus, resetForm}) {
        console.log(values)
        axios.post('https://reqres.in/api/users/',values)
            .then (res => {
                console.log(res)
                setStatus(res.data)
                resetForm()
            })
            .catch (err => {
                console.log(err)
            })
    }
})(FormUser)

export default FormikUserForm;