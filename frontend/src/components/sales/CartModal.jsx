import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCart, updateCart } from "../../features/CartSlice.js";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import secureLocalStorage from "react-secure-storage";

const CartModal = (props) => {
  const dispatch = useDispatch();
  const dataEdit = useSelector((state) => state.cart.dataEdit);
  const error = useSelector((state) => state.cart.error);
  const [data, setData] = useState({});

  const updateData = () => {
    dispatch(updateCart(data));
  };

  const actionDelete = (id) => {
    const user = secureLocalStorage.getItem("user");
    const data = { id: id, userId: user.id };
    if (dispatch(deleteCart(data))) {
      props.onHide();
      toast.success("Data deleted", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
      });
    }
  }, [error, props]);

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
                  actionDelete(id);
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

  useEffect(() => {
    setData(dataEdit);
  }, [dataEdit]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit {data ? data.productName : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Jumlah</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={data ? data.qty : 0}
              onChange={(e) => setData({ ...data, qty: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data ? data.note : ""}
              onChange={(e) => setData({ ...data, note: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide(), updateData();
          }}
          variant="success"
        >
          Update
        </Button>
        <Button
          onClick={() => {
            props.onHide(), confirmDel(data.id);
          }}
          variant="danger"
        >
          Delete
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

CartModal.propTypes = {
  onHide: PropTypes.func,
};

export default CartModal;
