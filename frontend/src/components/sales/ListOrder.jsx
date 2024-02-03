import React, { useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCart, setDetail } from "../../features/CartSlice.js";
import { toast } from "react-toastify";
import TotalCart from "./TotalCart.jsx";
import CartModal from "./CartModal.jsx";

const ListOrder = () => {
  const carts = useSelector((state) => state.cart.data);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    dispatch(getAllCart());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
      });
    }
  }, [error]);

  return (
    <>
      <Col md={12} lg={3} className="mb-5 pb-5">
        <div className="bg-body-tertiary rounded p-3">
          <h4>Order List</h4>
          <hr />
          {loading ? "Loading..." : ""}
          <ListGroup variant="flush">
            {carts ? (
              carts.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  variant="flush"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch(setDetail(item)), setModalShow(true);
                  }}
                >
                  <div className="fw-bold">{item.productName}</div>
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
                      <strong>
                        <small>
                          Rp{" "}
                          {parseInt(item.price * item.qty).toLocaleString(
                            "id-ID"
                          )}
                        </small>
                      </strong>
                    </div>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <p>No Data</p>
            )}
          </ListGroup>
          <TotalCart carts={carts} />
        </div>
      </Col>
      <CartModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default ListOrder;
