import { Navbar } from "../../components/Navbar";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
// import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import "./styles.scss";

type InputsTypes = {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export function SignUp() {

    const history = useHistory();

    const { getFieldProps, handleSubmit, errors } = useFormik<InputsTypes>({
        initialValues: {
            id: "",
            name: "",
            lastName: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required!"),
            lastName: Yup.string().required("Last name is required!"),
            email: Yup.string().email("Email is not valid!").required("Email is required!"),
            password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required!")
        }),
        onSubmit: (values, formikBag) => {
            alert(JSON.stringify(values));
        }
    });

    function handleBackLogin() {
        history.push("/");
    }
    return (
        <>
            <Navbar>
                <Link to="/faq">FAQ</Link>
            </Navbar>
            <form onSubmit={handleSubmit}>
                <h1>Form Sign Up</h1>
                <div className="names">
                    <Input type="text" placeholder="Name" {...getFieldProps("name")} />
                    <Input type="text" placeholder="Last Name" {...getFieldProps("lastName")} />
                </div>
                <Input type="email" placeholder="Email" className="inputBg" {...getFieldProps("email")} />
                <Input type="password" placeholder="Password" className="inputBg" {...getFieldProps("password")} />
                <div className="buttons">
                    <Button type="button" className="cancel" onClick={handleBackLogin}>
                        Cancel
                    </Button>
                    <Button className="success">
                        Sign Up
                    </Button>
                </div>
            </form>

        </>
    );
}