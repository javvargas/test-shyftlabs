import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const BASE_URL = "http://localhost:8000/api/v1/courses";

const TABLE_HEAD = ["Course", ""];

const ListCourses = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL).then((response) => {
            setCourses(response.data);
        });
    }, [courses]);


    const handleRemove = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: 'red',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${BASE_URL}/${id}`).then((response) => {
                    if (response.data.serverStatus === 2) {
                        MySwal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'The course has been deleted',
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
        })
    }


    return (
        <div className="h-full w-full">

            <Typography variant="h4" color="blue-gray" className="m-8">
                Courses List
            </Typography>

            <Card className="m-8">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-semibold leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(({ id, course }, index) => (
                            <tr key={id} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {course} 
                                    </Typography>
                                </td>
                                
                                <td className="p-4 w-48">
                                    <Typography as="a" variant="small" color="blue" className="font-medium cursor-pointer">
                                        <div className="inline-flex" onClick={() => handleRemove(id)}>
                                            <IoIosCloseCircleOutline className="text-lg mx-1"/> Delete
                                        </div>
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>


        </div>
    )
}

export default ListCourses