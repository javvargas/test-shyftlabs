import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from 'formik';
import axios from 'axios';
import { BiSolidMessageSquareError } from "react-icons/bi";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const BASE_URL = 'http://localhost:8000/api/v1/students'; // must be load from docker env, sorry I did't have time to fix it
//const BASE_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/test`;

// Validation
const validate = values => {
    const errors = {};
    if (!values.firstname) {
        errors.firstname = 'Required';
    } else if (values.firstname.length > 20) {
        errors.firstname = 'Must be 20 characters or less';
    }

    if (!values.lastname) {
        errors.lastname = 'Required';
    } else if (values.lastname.length > 20) {
        errors.lastname = 'Invalid date format';
    }

    if (!values.birth) {
        errors.birth = 'Required';
    } else if (values.birth.length > 10) {
        errors.birth = 'Invalid date format';
    } else {
        if (!validateAge(values.birth)) {
            errors.birth = 'You must be over 10 years old';
        }
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};


// Validate input birth date
const validateAge = (birth) => {
    const today = new Date();
    const compare = new Date(birth);
    const dateCopy = new Date(today);
    dateCopy.setFullYear(today.getFullYear() - 10);
    if (compare < dateCopy) {
        return true;
    } else {
        return false;
    }
}

function addStudent(values) {
    axios.post(BASE_URL, values)
        .then((response) => {
            if (response.data.serverStatus === 2) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Perfect',
                    text: 'The information has been saved',
                    confirmButtonColor: 'red',
                });
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    confirmButtonColor: 'red',
                });
            }
    });
}

const AddStudent = () => {

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            birth: '',
            email: '',
        },
        validate,
        onSubmit: values => {
            addStudent(values);
            formik.resetForm();
        },
    });

    return (
        <div className="m-auto">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Add New Student
                </Typography>
                <Typography color="blue-gray" className="mt-1 font-normal">
                    Enter the following information.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
                    <div className="mb-4 flex flex-col gap-6">
                        <div>
                            <Input color="cyan" size="lg" label="First name"
                                id="firstname"
                                name="firstname"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstname}
                            />
                            {formik.touched.firstname && formik.errors.firstname ? <div className="text-xs text-red-600 inline-flex gap-1 pt-1"> <BiSolidMessageSquareError className="text-base" /> {formik.errors.firstname}</div> : null}
                        </div>
                        <div>
                            <Input color="cyan" size="lg" label="Family name"
                                id="lastname"
                                name="lastname"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastname}
                            />
                            {formik.touched.lastname && formik.errors.lastname ? <div className="text-xs text-red-600 inline-flex gap-1 pt-1"> <BiSolidMessageSquareError className="text-base" /> {formik.errors.lastname}</div> : null}
                        </div>
                        <div>
                            <Input color="cyan" size="lg" label="Date of birth"
                                id="birth"
                                name="birth"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.birth}
                            />
                            {formik.touched.birth && formik.errors.birth ? <div className="text-xs text-red-600 inline-flex gap-1 pt-1"> <BiSolidMessageSquareError className="text-base" /> {formik.errors.birth}</div> : null}
                        </div>
                        <div>
                            <Input color="cyan" size="lg" label="Email address"
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? <div className="text-xs text-red-600 inline-flex gap-1 pt-1"> <BiSolidMessageSquareError className="text-base" /> {formik.errors.email}</div> : null}
                        </div>
                    </div>

                    <Button type="submit" className="mt-6 bg-blue-gray-800" fullWidth>
                        Add Student
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export default AddStudent