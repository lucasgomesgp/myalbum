import { Input } from "../../components/Input";
import { Navbar } from "../../components/Navbar";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { storage } from "../../services/firebase";
import "./styles.scss";

type InputPhotoTypes = {
  photo: string;
};
export function NewPhoto() {
  const { getFieldProps, handleSubmit, setFieldValue } = useFormik<InputPhotoTypes>({
    initialValues: {
      photo: "",
    },
    onSubmit: (values) => {
        
    },
  });

  return (
    <>
      <Navbar>
        <Link to="/user/home">New</Link>
        <Link to="/user/posts">Posts</Link>
        <Link to="/user/photos">Photos</Link>
        <Link to="/user/aboutme">About Me</Link>
      </Navbar>
      <div className="photo-container">
        <div className="title">
          <h2>NEW PHOTO</h2>
        </div>
        <form className="photo-area" onSubmit={handleSubmit}>
          <label>Choose one image</label>
          <progress value="0" max="100"></progress>
          <Input
            type="file"
            id="photoFile"
            accept="image/*"
            {...getFieldProps("photo")} />
          <Button className="success" type="submit">
            Send
          </Button>
        </form>
      </div>
    </>
  );
}
