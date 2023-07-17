import { useContext,useRef,useState} from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Auth.module.css"
//import AuthContext from "../Components/store/AuthContext";
import { useDispatch } from "react-redux";
import { authAction } from "../Components/ReduxStore/AuthReducer";

const Auth = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef=useRef();
  const [login, setIsLogin] = useState(true);
  const [error,setError]=useState('');

  const dispatch = useDispatch();

  //const ctx=useContext(AuthContext);
  //const isLogin = ctx.isLogin;
  //const switchAuthHandler = ctx.switchAuth;


  const switchHandler = () => {
    //switchAuthHandler();
    setIsLogin(!login);
  };
  let url;
  const Authentication=async(email,password)=>{
      if(login){
          url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDh4Q71z_iYl7koXLXL8FAvALOnpFvgCxU'
      }else{
          url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDh4Q71z_iYl7koXLXL8FAvALOnpFvgCxU'
      }
     try
     {
      const response=await fetch(url,{
          method:'POST',
          body:JSON.stringify({
              email:email,
              password:password,
              returnSecureToken:true
          }),
          headers:{
              'Content-Type':'application/json'
          }
      })
          const data=await response.json();
          console.log(data);
          // console.log(data.error)
          // if(!data.error){
          //   localStorage.setItem('token', data.idToken);
          //   localStorage.setItem('email', email);
          //   dispatch(authAction.login());
          // }


          console.log(response.ok);
          if(!response.ok){
              //localStorage.setItem('token', data.idToken);
              //setIsAuthenticate(true);
              //localStorage.setItem('email', userEmail);
              throw new Error(data.error.message);
          }else{
              localStorage.setItem('token', data.idToken);
              localStorage.setItem('email', email);
              //setIsAuthenticate(true);
              dispatch(authAction.login());
              // if(login){
              //     console.log("User has successfully login");
              // }else{
              //     console.log("User has successfully signup");
              // }
      
          }
      }
      catch(err){
          console.log(err);
          alert(err);
      }
  }

  const loginFormSubmitHandler =  async (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if(!login){
      const enteredConfirmPass=confirmPassRef.current.value;
      if(enteredPassword !== enteredConfirmPass){
        setError("Password doen't match");
      }else{
        setError(" ");
        Authentication(enteredEmail,enteredEmail);
        //ctx.authFunction(enteredEmail,enteredPassword);
        console.log(enteredEmail,enteredPassword,enteredConfirmPass);
    
      }
    }else{
      Authentication(enteredEmail,enteredPassword);
      //ctx.authFunction(enteredEmail,enteredPassword);
      console.log(enteredEmail,enteredPassword);

    }
  };

  return (
    <Container className={classes.container}>
      <h1>{login ? 'Login' : 'Sign Up'}</h1>
      <Form onSubmit={loginFormSubmitHandler} className={classes.authentication}>
        <Form.Group className="mb-3" controlId="formBasicEmail" >
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} placeholder="Enter Your Email" required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} placeholder="Enter Your Password" required />
        </Form.Group>
        {!login && <Form.Group className="mb-3" controlId="formBasicEmail" >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" ref={confirmPassRef} placeholder="Confirm Password" required/>
        </Form.Group>}
        {error && <div className={classes.error}>{error}</div>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Button variant="secondary" type="submit">{login?'Login':'Create Account'}</Button><br/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={switchHandler}>{login?'Create new Account':'Login with existing account'}</Button>
        <div className={classes.link}>
          <Link to="/ForgotPassword">Forgot Password</Link>
        </div>
      </Form>
    </Container>
  );
};
export default Auth;
