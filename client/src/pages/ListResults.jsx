import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const BASE_URL = "http://localhost:8000/api/v1/results";

const TABLE_HEAD = ["Course", "Student", "Result"];

const ListResults = () => {

    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL).then((response) => {
            setResults(response.data);
        });
    }, [results]);

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
                        {results.map(({ id, course, student, result }, index) => (
                            <tr key={id} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {course} 
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {student} 
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {result} 
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

export default ListResults