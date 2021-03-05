import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
// import { getCurrentUser } from '../store/actions/UserActions';
import { loginSchema } from '../schema';
// import { login } from '../utils/otherAxiosCalls';
import { actions } from '../store/ducks/userDuck';

// Styled components
const StyledContainer = styled.div`
  background: #f7f9fa;
  height: auto;
  width: 90%;
  margin: 5em auto;
  color: snow;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);

  @media (min-width: 786px) {
    width: 60%;
  }

  label {
    color: #24b9b6;
    font-size: 1.2em;
    font-weight: 400;
  }

  h1 {
    color: #24b9b6;
    padding-top: 0.5em;
  }

  .form-group {
    margin-bottom: 2.5em;
  }
`;

const StyledForm = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;

  @media (min-width: 786px) {
    width: 50%;
  }
`;

const StyledButton = styled(Button)`
  background: #1863ab;
  border: none;
  font-size: 1.2em;
  font-weight: 400;

  &:hover {
    background: #1d3461;
  }
`;

// initial values for form
const initialLoginValues = {
  username: '',
  password: '',
};

export default function LoginForm() {
  const { push } = useHistory();
  const dispatch = useDispatch();

  return (
    <StyledContainer>
      <Formik
        initialValues={initialLoginValues}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(actions.loginThunk({ username: values.username, password: values.password }));
            // .then(res => {
            //   console.log('Login Successful ==>> ', res.data);
            //   localStorage.setItem('token', res.data.access_token);
            //   dispatch(getCurrentUser());
          push('/dashboard');
            // })
            // .catch(err => {
            //   console.log('Login Failed ==>> ', err);
            //   alert('login failed');
            //   push('/');
            // });
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <StyledForm className="mx-auto" onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username :</Form.Label>
              <Form.Control
                className={
                  touched.username && errors.username ? 'form-error' : null
                }
                type="text"
                name="username"
                placeholder="Enter Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {touched.username && errors.username ? (
                <div className="form-error-message">{errors.username}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password :</Form.Label>
              <Form.Control
                className={
                  touched.password && errors.password ? 'form-error' : null
                }
                type="password"
                name="password"
                placeholder=""
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password && errors.password ? (
                <div className="form-error-message">{errors.password}</div>
              ) : null}
            </Form.Group>
            <StyledButton
              variant="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
    </StyledContainer>
  );
}
