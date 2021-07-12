import { Navbar } from "../../components/Navbar";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { database } from "../../services/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

type InputsTypes = {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export function SignUp() {
    const history = useHistory();

    const { getFieldProps, handleSubmit } = useFormik<InputsTypes>({
        initialValues: {
            name: "",
            lastName: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(() =>
                toast.error("Name is required!", { position: toast.POSITION.TOP_RIGHT })
            ),
            lastName: Yup.string().required(() =>
                toast.error("Last name is required!", { position: toast.POSITION.TOP_RIGHT })
            ),
            email: Yup.string().email("Email is not valid!").required(() =>
                toast.error("Email is required!", { position: toast.POSITION.TOP_RIGHT })
            ),
            password: Yup.string().min(8, () =>
                toast.warning("Password must be at least 8 characters", { position: toast.POSITION.TOP_RIGHT }))
                .required(
                    () =>
                        toast.error("Password is required!", { position: toast.POSITION.TOP_RIGHT })
                )
        }),
        onSubmit: (values, formikBag) => {
            database.ref(`/users`).push({
                name: values.name,
                lastName: values.lastName,
                email: values.email,
                password: values.password
            },
                (error) => {
                    if (!error) {
                        toast.success("Save with success!", { position: toast.POSITION.TOP_RIGHT });
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