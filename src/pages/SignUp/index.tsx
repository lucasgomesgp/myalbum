import { Navbar } from "../../components/Navbar";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { database } from "../../services/firebase";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

type InputsTypes = {
    id: string;
    name: string;
    lastName: string;
    email: string;
    avatar: string;
    password: string;
}

export function SignUp() {
    const history = useHistory();

    const { getFieldProps, handleSubmit } = useFormik<InputsTypes>({
        initialValues: {
            id: uuidv4(),
            name: "",
            lastName: "",
            email: "",
            avatar: "",
            password: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required!"),
            lastName: Yup.string().required("Last name is required!"),
            email: Yup.string().email("Email is not valid!").required("Email is required!" ),
            password: Yup.string().min(8,"Password must be at least 8 characters").required("Password is required!")
        }),
        onSubmit: (values, formikBag) => {
            database.ref(`/users`).push({
                id: values.id,
                name: values.name,
                lastName: values.lastName,
                email: values.email,
                password: values.password
            },
                (error) => {
                    if (!error) {
                        toast.success("Create with success!", { position: toast.POSITION.TOP_RIGHT });
                        history.push("/");
                    }
                });
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
            <form onSubmit={handleSubmit} className="form-signup">
                <h1>Form Sign Up</h1>
                <div className="names">
                    <Input type="text" placeholder="Name" {...getFieldProps("name")} />
                    <Input type="text" placeholder="Last Name" {...getFieldProps("lastName")} />
                </div>
                <div className="info-user">
                    <Input type="email" placeholder="Email" className="inputBg" {...getFieldProps("email")} />
                    <Input type="password" placeholder="Password" className="inputBg" {...getFieldProps("password")} />
                </div>
                <div className="buttons">
                    <Button type="button" className="cancel" onClick={handleBackLogin}>
                        Cancel
                    </Button>
                    <Button type="submit" className="success">
                        Sign Up
                    </Button>
                </div>
            </form>
        </>
    );
}