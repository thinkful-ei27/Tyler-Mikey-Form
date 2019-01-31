import React from 'react';
import {reduxForm, Field} from 'redux-form';
import './form.css'
import {required, nonEmpty, lengthVal, numVal} from '../validators'
export class Form extends React.Component{

    render(){
        return (
            <div className="delivery-form">
            <form>
                <h1>Report a problem with your delivery</h1>
                <label>Tracking number</label>
                <Field
                name="tracking number"
                type="text"
                component='input'
                validate={[required, nonEmpty, lengthVal]}
                />
                
                <label>What is your issue</label>
                <Field 
                name="Options"
                type="select"
                component='select'>
                <option>my delivery hasnt arrived</option>
                <option>The wrong item was delivered</option>
                <option>part of my order was missing</option>
                <option>my order was damaged</option>
                <option>Other (Provide details below)</option>
                </Field>
                <label>Give us more details (optional)</label>
                <Field
                name='details'
                type='text'
                component='textarea'
                />
                <button type="submit">Submit</button>
            </form>
            </div>

        )

    }
}

export default reduxForm({
    form:'deliveryIssues'
})(Form)