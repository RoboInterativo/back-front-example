import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';

import React from 'react';
import { Formik} from 'formik';
// import { useFormik } from 'formik';
import { Form } from "./form";
import * as Yup from 'yup';

import { authenticationService } from '@/_services';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

          this.state = {};



        // this.state = {
        //     username: '',
        //     password: '',
        //     submitted: false
        // };
        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //
    // // const initialValues = {
    // //   username: '',
    // //   password: ''
    // // };
    // //
    //    this.validationSchema = Yup.object().shape({
    //      username: Yup.string().required('Username is required'),
    //      password: Yup.string().required('Password is required')
    //    });



    };
//     function onChangeUser(e, field, values, setValues) {
//     // update dynamic form
//     const username = [...values.username];
//     const password = [...values.password];
//
// ;
//
//     setValues({ ...values, username });
//     setValues({ ...values, password });
//
//     // call formik onChange method
//     field.onChange(e);
//     }
    // handleChange(e) {
    //     const { name, value } = e.target;
    //     this.setState({ [name]: value });
    // }
    //
    // handleSubmit(e) {
    //     e.preventDefault();
    //
    //     this.setState({ submitted: true });
    //     const { username, password } = this.state;
    //     if (username && password) {
    //         this.props.login(username, password);
    //     }
    // }
    // function onSubmit(fields) {
    //       alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
    //       // setStatus();
    //       // authenticationService.login(username, password)
    //       //     .then(
    //       //         user => {
    //       //             const { from } = this.props.location.state || { from: { pathname: "/" } };
    //       //             this.props.history.push(from);
    //       //         },
    //       //         error => {
    //       //             setSubmitting(false);
    //       //             setStatus(error);
    //       //         }
    //       //     );
    //
    //     // display form field values on success
    //     //alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
    // }
    submit = data => {
      //setStatus();
      authenticationService.login(data.username, data.password)
          .then(
              user => {
                  const { from } = this.props.location.state || { from: { pathname: "/" } };
                  this.props.history.push(from);
              },
              error => {
                //  setSubmitting(false);
                //  setStatus(error);
              }
          );
      //console.log(data);
    };
    render() {
        // const { username, password, submitted } = this.state;
        const classes = this.props;
        const validationSchema = Yup.object().shape({
              username: Yup.string().required('Username is required'),
              password: Yup.string().required('Password is required')
            });
        const values = { username: "", password: "" };
        return (
            <div>
                <Alert severity="info">
                    <strong>Normal User</strong> - U: user P: user<br />
                    <strong>Administrator</strong> - U: admin P: admin
                </Alert>
                        <div>
                        <Formik
                          render={props => <Form {...props} />}
                          initialValues={values}
                          validationSchema={validationSchema}
                          onSubmit={this.submit}
                        />

                    </div>

            </div>
        )
    }
}

export { LoginPage };
//https://github.com/cornflourblue/react-redux-registration-login-example/blob/master/src/LoginPage/LoginPage.jsx
