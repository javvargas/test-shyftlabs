import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from 'formik';
import axios from 'axios';
import { BiSolidMessageSquareError } from "react-icons/bi";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const BASE_URL = 'http://localhost:8000/api/v1/courses'; 

// Validation
const validate = values => {
    const errors = {};
    if (!values.course) {
        errors.course = 'Required';
    } else if (values.course.length > 20) {
        errors.course = 'Must be 20 characters or less';
    }

    return errors;
};

function addCourse(values) {
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


const AddCourse = () => {

    const formik = useFormik({
        initialValues: {
            course: '',
        },
        validate,
        onSubmit: values => {
            addCourse(values);
            formik.resetForm();
        },
    });


    return (
        <div className="m-auto">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Add New Course
                </Typography>
                <Typography color="blue-gray" className="mt-1 font-normal">
                    Enter the following information.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
                    <div className="mb-4 flex flex-col gap-6">
                        <div>
                            <Input color="cyan" size="lg" label="Name of the course"
                                id="course"
                                name="course"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.course}
                            />
                            {formik.touched.course && formik.errors.course ? <div className="text-xs text-red-600 inline-flex gap-1 pt-1"> <BiSolidMessageSquareError className="text-base" /> {formik.errors.course}</div> : null}
                        </div>
                        
                    </div>

                    <Button type="submit" className="mt-6 bg-blue-gray-800" fullWidth>
                        Add Course
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export default AddCourse