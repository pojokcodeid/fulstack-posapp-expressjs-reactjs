import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../auth/AxiosConfig.jsx";
const axios = axiosInstance;
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { MdEdit, MdCancel } from "react-icons/md";
import { FaTrash, FaCheck } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import NavbarComponent from "../NavbarComponent.jsx";
import secureLocalStorage from "react-secure-storage";

const ListCategory = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    let headersList = {
      Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
      "Content-Type": "application/json",
    };
    let reqOptions = {
      url: "/api/categorys",
      method: "GET",
      headers: headersList,
    };
    try {
      const response = await axios.request(reqOptions);
      setData(response.data.result);
    } catch (error) {
      const errMessage = JSON.parse(error.request.response);
      toast.error(errMessage.message, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    let headersList = {
      Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
      "Content-Type": "application/json",
    };
    let reqOptions = {
      url: `/api/categorys/${id}`,
      method: "DELETE",
      headers: headersList,
    };
    try {
      const response = await axios.request(reqOptions);
      if (response.data) {
        toast.success(response.data.message, {
          position: "top-center",
        });
        loadData();
      }
    } catch (error) {
      const errMessage = JSON.parse(error.request.response);
      toast.error(errMessage.message, {
        position: "top-center",
      });
    }
  };

  const confirmDel = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-body-tertiary p-5 rounded shadow">
            <h1>Are you sure?</h1>
            <p>You want to delete this file?</p>
            <div className="text-center">
              <button className="btn btn-danger me-2" onClick={onClose}>
                <MdCancel /> No
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  handleDelete(id);
                  onClose();
                }}
              >
                <FaCheck /> Yes
              </button>
            </div>
          </div>
        );
      },
    });
  };
  return (
    <>
      <NavbarComponent />
      <Container>
        <Row className="mt-3 bg-body-tertiary rounded p-3 pb-0">
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="#">Master</Breadcrumb.Item>
              <Breadcrumb.Item active>Category</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row className="mt-3 bg-body-tertiary rounded p-3">
          <Col>
            <Link to={"/category/add"} className="btn btn-primary mb-3">
              <IoMdAdd /> Add Category
            </Link>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.kategoryName}</td>
                    <td>
                      <Link
                        to={`/category/${item.id}`}
                        className="btn btn-primary me-1"
                      >
                        <MdEdit /> Edit
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => confirmDel(item.id)}
                      >
                        <FaTrash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListCategory;
