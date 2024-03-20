import { Box, Button, FormControl, FormErrorMessage, Input, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./SignUp.css";
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from "react-redux";
import { signupAction } from "../../Redux/Auth/Action";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

const SignUp = () => {
    const initialValues={email:"",name:"",username:"",password:""}
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const{auth}=useSelector(store=>store);
    const toast = useToast();
    
    const handleNavigate= () => navigate("/login");

    const handleSubmit=(values,actions)=>{
      console.log("values", values);
      dispatch(signupAction({data:values}))
      dispatch(signupAction(values))
      actions.setSubmitting(false);

    };
    

    useEffect(()=>{ 
      if(auth.signup?.username){
       navigate("/login")
        toast({
          title: `Account created ${auth.signup?.username}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
      
    },[auth.signup])
    

  return(
    <div>     
         <div className="border">
        <Box p={8} display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <img className="mb-5" src="https://i.imgur.com/zqpwkLQ.png" alt="" />
          <p id="paragraf" className="text-center mb-3 text">Sign up to see photos and videos from your friends.</p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <Form className="space-y-8">
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                      <Input className="w-full" {...field} id="email" placeholder="Mobile Number Or Email" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="name">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <Input className="w-full" {...field} id="name" placeholder="Full Name"/>
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="username">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                      <Input className="w-full" {...field} id="username" placeholder="Username"/>
                      <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                      <Input className="w-full" {...field} id="password" placeholder="Password" />
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <p className="text-center text-sm">People who use our service may have upload your contact information to Instagram. Learn More</p>
                <p className="text-center text-sm">By signin up, you agree to our Terms, Privacy Policy and Cookies Policy .</p>
                <Button className="w-full" mt={4} colorScheme="blue" type="submit" isLoading={formikProps.isSubmitting}>
                    Sign up

                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
      <div className="border w-full pb-2 border-slate-300 mt-4">
        <p className="text-center py-2 text-sm">Have an account? <span onClick={handleNavigate} className="ml-2 text-blue-600 cursor-pointer">Log in</span></p>
      </div></div>
  )
}

/*SignUp.PropTypes={
  isAuthenticated:PropTypes.bool
}

const mapStateToProps = state =>({isAuthenticated: state.auth.isAuthenticated})*/
export default SignUp