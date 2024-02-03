import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../../auth/AxiosConfig.jsx";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoPrint } from "react-icons/io5";
import { toast } from "react-toastify";
import "./print.css";
import secureLocalStorage from "react-secure-storage";

const OrderSend = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [orderDetail, setOrderDetail] = useState([]);
  // get data
  const loadData = useCallback(async () => {
    try {
      const out = await axiosInstance.get(`/api/orders/${id}`, {
        headers: {
          Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
          "Content-Type": "application/json",
        },
      });
      setData(out.data.result);
      setOrderDetail(out.data.result.Orderdetail);
    } catch (error) {
      const errMessage = JSON.parse(error.request.response);
      toast.error(errMessage.message, {
        position: "top-center",
      });
    }
  }, [id]);
  useEffect(() => {
    loadData();
  }, [loadData]);

  // print
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <Container>
        <Row className="mt-3" id="divToPrint">
          <Col
            id="mediaBorder"
            md={{ span: 4, offset: 4 }}
            className="border p-3"
          >
            <h3 className="text-center fw-bold">PT ABCD</h3>
            <h5 className="text-center">Order Detail</h5>
            <h6 className="text-center">{data.code}</h6>
            <h6 className="text-center">
              {new Date(data.date).toLocaleString("id-ID")}
            </h6>
            <hr />
            {orderDetail.map((item) => (
              <ListGroup.Item key={item.id} variant="flush" className="m-0 p-0">
                <div>{item.productName}</div>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="me-auto">
                    <small>
                      Rp {parseInt(item.price).toLocaleString("id-ID")} x{" "}
                      {item.qty}
                    </small>
                    <p>
                      <small>{item.note}</small>
                    </p>
                  </div>
                  <div>
                    <small>
                      Rp{" "}
                      {parseInt(item.price * item.qty).toLocaleString("id-ID")}
                    </small>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
            <hr />
            <strong>
              <div className="d-flex justify-content-between">
                <p>Total</p>
                <p>Rp {parseInt(data.total).toLocaleString("id-ID")}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>PPN</p>
                <p>Rp {parseInt(data.ppn).toLocaleString("id-ID")}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Gand Total</p>
                <p>Rp {parseInt(data.grandTotal).toLocaleString("id-ID")}</p>
              </div>
            </strong>
            <hr />
            <div className="text-center">
              <p>Thank You</p>
              <small className="text-center">
                Items that have been purchased cannot be returned
              </small>
            </div>
          </Col>
        </Row>
        <Row className="print">
          <Col md={{ span: 4, offset: 4 }} className="p-3">
            <div className="d-flex justify-content-evenly">
              <Link to="/sales" className="btn btn-primary">
                <IoMdArrowRoundBack />
                Back
              </Link>
              <Button variant="primary" onClick={() => handlePrint()}>
                <IoPrint /> Print
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderSend;
