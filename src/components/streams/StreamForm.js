import React from "react"
import{reduxForm} from "redux-form";
import {Field} from "redux-form/es";

class StreamForm extends React.Component{

    renderError ({error,touched}){
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>)
        }
    }


    renderInput=({input,label,meta})=>{

        const className =`field ${meta.error && meta.touched ? "error":""}`
        return(
            <div className={className}>
                <label >{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}

            </div>
        )
    }

    onSubmit=(formValues)=>{
        this.props.onSubmit(formValues)
    }

    render(){
        // console.log(this.props)
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name ="title" component={this.renderInput} label ="Enter Title"/>
                <Field name ="description" component={this.renderInput} label ="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }

}

const validate=(formValues) =>{
    const errors ={}
    if(!formValues.title){
        errors.title ="You must Enter a Title"
    }

    if(!formValues.description){
        errors.description ="You must Enter a Description"
    }

    return errors
}


export default  reduxForm({
    form:'streamForm',
    validate
})(StreamForm)

