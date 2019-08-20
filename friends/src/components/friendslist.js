import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from "formik";
import { axiosWithAuth } from '../utilities/axiosWithAuth';
import axios from 'axios';

function FriendForm({values}){
    console.log(values)
    const [friends, setFriends]= useState([])
     const getFriends = ()=>{
         axiosWithAuth()
         .get("http://localhost:5000/api/friends")
         .then(res => {
             console.log(res)
             setFriends(res.data)
            })
         .catch(err => console.log(err))
     }
     useEffect(()=>getFriends(), [])
    return(
        <div>
        <Form>
            <label>
                Friend Name:
                <Field type ="text" name="name" placeholder="name"/>
            </label>
            <label>
                Friend Age:
                <Field type="text" name="age" placeholder="age"/>
            </label>
            <label>
                Email:
                <Field type="text" name="email" placeholder="email"/>
            </label>
            <button type="submit">Submit</button>
        </Form>
        {console.log(friends)}
        {friends !==null && friends.map(friend => <p key={friend.id}>{friend.name}</p>)}
        </div>
        
    )
}
const FormikFriendForm = withFormik({
    mapPropsToValues({name, age, email}){
        return{
            name: name || "",
            age: age || "",
            email: email || ""
        }

    },
    handleSubmit(values, {resetForm, setSubmitting, setValues}){
        console.log(values)
        axiosWithAuth()
        .post("http://localhost:5000/api/friends", values)
        .then(res => {
            console.log(res.data)
            setValues(res.data)
            resetForm();
            setSubmitting(false);
        })
        .catch(err => {
            console.log(err.response);
            setSubmitting(false);
        });

    }
})(FriendForm);
export default FormikFriendForm;