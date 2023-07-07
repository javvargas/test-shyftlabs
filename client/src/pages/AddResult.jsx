import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from 'formik';
import { useEffect, useState } from "react";
import axios from 'axios';
import { BiSolidMessageSquareError } from "react-icons/bi";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

const BASE_URL_RESULTS = 'http://localhost:8000/api/v1/results';
const BASE_URL_STUDENTS = 'http://localhost:8000/api/v1/students';
const BASE_URL_COURSES = 'http://localhost:8000/api/v1/courses';

// Validation
const validate = values => {
    const errors = {};
    if (!values.id_student) {
        errors.id_student = 'Required';
    }

    if (!values.id_course) {
        errors.id_course = 'Required';
    }

    if (!values.result) {
        errors.result = 'Required';
    }

    return errors;
};


function addResult(values) {
    axios.post(BASE_URL_RESULTS, values)
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


const AddResult = () => {

    const formik = useFormik({
        initialValues: {
            id_student: '',
            id_course: '',
            result: '',
        },
        validate,
        onSubmit: values => {
            addResult(values);
            formik.resetForm();
        },
    });

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL_COURSES).then((response) => {
            setCourses(response.data);
        });
    }, [courses]);

    useEffect(() => {
        axios.get(BASE_URL_STUDENTS).then((response) => {
            setStudents(response.data);
        });
    }, [students]);

    return (
        <div className="m-auto">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Add New Result
                </Typography>
                <Typography color="blue-gray" className="mt-1 font-normal">
                    Enter the following information.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
                    <div className="mb-4 flex flex-col gap-6">
                        <div>
                            <select className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-cyan-500"
                                id="id_student"
                                name="id_student"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.id_student}
                            >
                                <option value="">Select student</option>
                                {students.map(({ id, firstname, lastname }, index) => (
                                    <option key={id} value={id}>{ firstname } { lastname }</option>
                                ))}

                            </select>
                            {formik.touched.id_course && formik.errors.id_course ? <div className="text-xs text-red-600 inline-flex gap-1 pt-1"> <BiSolidMessageSquareError className="text-base" /> {formik.errors.firstname}</div> : null}
                        </div>
                        <div>
                            <select className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-cyan-500"
                                id="id_course"
                                name="id_course"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.id_course}
                            >
                                <option value="">Select course</option>
                                {courses.map(({ id, course }, index) => (
                                    <option key={id} value={id}>{course}</option>
                                ))}

                            </select>
                            {formik.touched.id_course && formik.errors.id_course ? <div className="text-xs text-red-600 inline-flex gap-1 pt-1"> <BiSolidMessageSquareError className="text-base" /> {formik.errors.id_course}</div> : null}
                        </div>
                        <div>



                            <select className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-cyan-500"
                                id="result"
                                name="result"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.result}
                            >
                                <option value="">Select result</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </select>
                            {formik.touched.result && formik.errors.result ? <div className="text-xs text-red-600 inline-flex gap-1 pt-1"> <BiSolidMessageSquareError className="text-base" /> {formik.errors.result}</div> : null}
                        </div>
                    </div>

                    <Button type="submit" className="mt-6 bg-blue-gray-800" fullWidth>
                        Add Result
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export default AddResult