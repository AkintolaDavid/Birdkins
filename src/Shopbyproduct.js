import { FaDatabase } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { TbBrandPython } from "react-icons/tb";
import { SiPowerbi } from "react-icons/si";
import img from "./assets/image.jpg";
const Shopbyproduct = [
  {
    id: 1,
    image: img,
    description: "Rings",
    courseName: "Introduction and pathway to Mastering Excel",
    lecturerName: "John Doe",
    lastUploadDate: "July 21, 2018",
    price: "$20",
    rating: 4.5,
    votes: 4,
    // icon: <SiMicrosoftexcel className="text-white text-4xl" />,
  },
  {
    id: 2,
    image: img,
    description: "Necklace",
    courseName: "Python for Beginner",
    lecturerName: "Jane Smith",
    lastUploadDate: "May 10, 2020",
    price: "$15",
    rating: 4.5,
    votes: 4,
    // icon: <TbBrandPython className="text-white text-4xl" />,
  },
  {
    id: 3,
    image: img,
    description: "Bracelet",
    courseName: "Data Analysis Guide",
    lecturerName: "Alice Johnson",
    lastUploadDate: "March 5, 2019",
    price: "Free",
    rating: 4.5,
    votes: 4,
    // icon: <FaDatabase className="text-white text-4xl" />,
  },
  {
    id: 4,
    image: img,
    description: "Watch",
    courseName: "Amateur to Professional in Power BI",
    lecturerName: "Michael Lee",
    lastUploadDate: "August 30, 2021",
    price: "$20",
    rating: 4.5,
    votes: 4,
    // icon: <SiPowerbi className="text-white text-4xl" />,
  },
];

export default Shopbyproduct;
