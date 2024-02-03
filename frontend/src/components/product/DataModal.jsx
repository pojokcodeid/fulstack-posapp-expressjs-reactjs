import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../../auth/AxiosConfig.jsx";
const axios = axiosInstance;
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import secureLocalStorage from "react-secure-storage";

const DataModal = (props) => {
  const { show, onHide, size, modalTitle, setSupplier } = props;
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
      const response = await axios.request(reqOptions);
      const newData = response.data.result;
      setData([...data, ...newData]);
      setTempId(response.data.lastId);
      setHasMore(response.data.hasMore);
    } catch (error) {
      const errMessage = JSON.parse(error.request.response);
      toast.error(errMessage.message, {
        position: "top-center",
      });
    }
  }, [data, keyword, lastId, limit]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastId, keyword]);

  const fetchMore = () => {
    setLastId(tempId);
  };

  const serchData = (e) => {
    e.preventDefault();
    setLastId(0);
    setData([]);
    setKeyword(query);
  };

  return (
    <Modal
      onClose={onHide}
      size={size}
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <form onSubmit={serchData}>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search ..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </InputGroup>
            </form>
          </Col>
        </Row>
        <Row id="scrollableDiv" style={{ height: "600px", overflow: "auto" }}>
          <Col>
            <InfiniteScroll
              dataLength={data.length}
              next={fetchMore}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSupplier(item), props.onHide();
                      }}
                    >
                      <td>{index + 1}</td>
                      <td>
                        {item.firstName} {item.lastName}
                      </td>
                      <td>{item.phone}</td>
                      <td>{item.email ? item.email : "n/a"}</td>
                      <td>{item.address}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </InfiniteScroll>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

DataModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  size: PropTypes.string,
  modalTitle: PropTypes.string,
  setSupplier: PropTypes.func,
};

export default DataModal;
