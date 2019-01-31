import React from 'react';
import {reduxForm, SubmissionError, Field} from 'redux-form';
import './form.css'
import {required, nonEmpty, lengthVal, numVal} from '../validators'
import Input from './Input'
export class Form extends React.Component{

	onSubmit(values){
		console.log(values)
		return fetch(
			'https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
				method : 'POST',
				body:JSON.stringify(values),
				headers:{'Content-Type':'application/json'}
			})
			.then(res => {
				if (!res.ok) {
						if (
								res.headers.has('content-type') &&
								res.headers
										.get('content-type')
										.startsWith('application/json')
						) {
								// It's a nice JSON error returned by us, so decode it
								return res.json().then(err => Promise.reject(err));
						}
						// It's a less informative error returned by express
						return Promise.reject({
								code: res.status,
								message: res.statusText
						});
				}
				return;
		})
		.then(() => console.log('Submitted with values', values))
		.catch(err => {
				const {reason, message, location} = err;
				if (reason === 'ValidationError') {
						// Convert ValidationErrors into SubmissionErrors for Redux Form
						return Promise.reject(
								new SubmissionError({
										[location]: message
								})
						);
				}
				return Promise.reject(
						new SubmissionError({
								_error: 'Error submitting message'
						})
				);
		});
	}



    render(){
			let successMessage;
			if (this.props.submitSucceeded) {
					successMessage = (
							<div className="message message-success">
									Message submitted successfully
							</div>
					);
			}

			let errorMessage;
			if (this.props.error) {
					errorMessage = (
							<div className="message message-error">{this.props.error}</div>
					);
					}
        return (
				
            <div className="delivery-form">
            <form onSubmit={this.props.handleSubmit((values)=>this.onSubmit(values))}>
                <h1>Report a problem with your delivery</h1>
								{successMessage}
								{errorMessage}
                <label>Tracking number</label>
                <Field
                name="trackingNumber"
                type="text"
                component={Input}
                validate={[required, nonEmpty, lengthVal, numVal]}
                />
                
                <label>What is your issue</label>
								<Field 
								component={Input}
								validate={required}
                name="issue"
                type="select"
                element="select"
								id="select"
                >
                  <option value = "not-delivered">my delivery hasnt arrived</option>
                    <option value="wrong-item">The wrong item was delivered</option>
                    <option value="missing-part">part of my order was missing</option>
                    <option value="damaged">my order was damaged</option>
                    <option value="other">Other (Provide details below)</option>
                </Field>
                <label>Give us more details (optional)</label>
                <Field
                name='details'
                type='text'
                element="textarea"
                component={Input}
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