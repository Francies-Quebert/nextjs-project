import { useState } from 'react';
import Input from '../Components/Input';
import Alert from '../Components/Alert';
import ButtonWithProgress from '../Components/ButtonWithProgress';
import axios from 'axios';

const SignUpPage = () => {
  const [state, setState] = useState<any>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    apiProgress: false,
    signUpSuccess: false,
    errors: {}
  });

   const signUp = (body:any) => {
    return axios.post('/api/1.0/users', body);
  };

  const onChange = (event:any) => {
    const { id, value } = event.target;
    const errorsCopy:any = { ...state.errors };
    delete errorsCopy[id];
    setState({
      ...state,
      [id]: value,
      errors: errorsCopy
    });
  };

  const submit = async (event:any) => {
    event.preventDefault();
    const { username, email, password } = state;
    const body = {
      username,
      email,
      password
    };
    setState({ ...state, apiProgress: true });
    try {
      await signUp(body);
      setState({ ...state, signUpSuccess: true });
    } catch (error:any) {
      if (error.response.status === 400) {
        setState({ ...state, errors: error.response.data.validationErrors });
      }
      setState({ ...state, apiProgress: false });
    }
  };

  let disabled = true;
  const { password, passwordRepeat, apiProgress, signUpSuccess, errors } = state;
  if (password && passwordRepeat) {
    disabled = password !== passwordRepeat;
  }

  let passwordMismatch = password !== passwordRepeat ? 'Passwords do not match' : '';

  return (
    <div
      className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
      data-testid="signup-page"
    >
      {!signUpSuccess && (
        <form className="card" data-testid="form-sign-up">
          <div className="card-header">
            <h1 className="text-center">Sign Up</h1>
          </div>
          <div className="card-body">
            <Input
              id="username"
              label="Username"
              onChange={onChange}
              help={errors.username}
            />
            <Input
              id="email"
              label="Email"
              onChange={onChange}
              help={errors.email}
            />
            <Input
              id="password"
              label="Password"
              onChange={onChange}
              help={errors.password}
              type="password"
            />
            <Input
              id="passwordRepeat"
              label="Password Repeat"
              onChange={onChange}
              help={passwordMismatch}
              type="password"
            />
            <div className="text-center">
              <ButtonWithProgress
                disabled={disabled}
                apiProgress={state.apiProgress}
                onClick={submit}
              >
                Sign Up
              </ButtonWithProgress>
            </div>
          </div>
        </form>
      )}
      {signUpSuccess && (
        <Alert>Please check your e-mail to activate your account</Alert>
      )}
    </div>
  );
};

export default SignUpPage;
