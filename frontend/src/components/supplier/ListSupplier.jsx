import { useCallback, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { FaCheck, FaSearch, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdCancel, MdEdit } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import NavbarComponent from "../NavbarComponent.jsx";
import { axiosInstance } from "../../auth/AxiosConfig.jsx";
import secureLocalStorage from "react-secure-storage";

const ListSupplier = () => {
  const [data, setData] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const limit = 25;
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const loadData = useCallback(async () => {
    let headersList = {
      Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
      "Content-Type": "application/json",
    };
    let reqOptions = {
      url: `/api/suppliers?search_query=${keyword}&lastId=${lastId}&limit=${limit}`,
      method: "GET",
      headers: headersList,
    };
    try {
      const response = await axiosInstance.request(reqOptions);
      const newData = response.data.result;
      setData([...data, ...newData]);
      setTempId(response.data.lastId);
      setHasMore(response.data.hasMore);
    } catch (error) {
      const errMessage = error.request.response
        ? JSON.parse(error.request.response)
        : error.message;
      toast.error(errMessage.message, {
        position: "top-center",
      });
    }
  }, [data, lastId, keyword]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastId, keyword]);

  const serchData = (e) => {
    e.preventDefault();
    setLastId(0);
    setData([]);
    setKeyword(query);
  };

  const fetchMore = () => {
    setLastId(tempId);
  };

  const handleDelete = async (id) => {
    let headersList = {
      Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: `/api/suppliers/${id}`,
      method: "DELETE",
      headers: headersList,
    };
    try {
      const response = await axiosInstance.request(reqOptions);
      if (response.data) {
        toast.success(response.data.message, {
          position: "top-center",
        });
        setLastId(0);
        setData([]);
        setKeyword(" ");
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
              <Breadcrumb.Item active>Supplier</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row className="mt-3 bg-body-tertiary rounded p-3">
          <Col>
            <Row>
              <Col md={5}>
                <Link to={"/supplier/add"} className="btn btn-primary mb-3">
                  <IoMdAdd /> Add Supplier
                </Link>
              </Col>
              <Col md={7}>
                <form onSubmit={serchData}>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Search ..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button type="submit" variant="primary">
                      <FaSearch /> Search
                    </Button>
                  </InputGroup>
                </form>
              </Col>
            </Row>
            <InfiniteScroll
              dataLength={data.length}
              next={fetchMore}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {item.firstName} {item.lastName}
                      </td>
                      <td>{item.phone}</td>
                      <td>{item.email ? item.email : "n/a"}</td>
                      <td>{item.address}</td>
                      <td>
                        <Link
                          to={`/supplier/${item.id}`}
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
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListSupplier;
