import { axiosInstance } from "../../auth/AxiosConfig.jsx";
const axios = axiosInstance;
import { useCallback, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Figure,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import Select from "react-select";
import DataModal from "./DataModal.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../NavbarComponent.jsx";
import secureLocalStorage from "react-secure-storage";

const AddProduct = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState({});
  const [nama, setNama] = useState("");
  const [barcode, setBarcode] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [supplier, setSupplier] = useState({});
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const loadKategory = useCallback(async () => {
    let headersList = {
      Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
      "Content-Type": "application/json",
    };
    let reqOptions = {
      url: "/api/categorys",
      method: "GET",
      headers: headersList,
    };
    const out = await axios.request(reqOptions);
    const result = out.data.result.map((item) => {
      return { value: item.id, label: item.kategoryName };
    });
    setData(result);
  }, []);

  useEffect(() => {
    loadKategory();
  }, [loadKategory]);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("barcode", barcode);
    formData.append("productName", nama);
    formData.append("file", file);
    formData.append("qty", qty);
    formData.append("price", price);
    formData.append("kategoryId", category.value);
    formData.append("supplierId", supplier.id);
    try {
      const out = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
        },
      });
      if (out.data) {
        toast.success(out.data.message, {
          position: "top-center",
        });
        navigate("/product");
      }
    } catch (error) {
      const errMessage = JSON.parse(error.request.response);
      toast.error(errMessage.message, {
        position: "top-center",
      });
    }
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
              <Breadcrumb.Item href="/product">Product</Breadcrumb.Item>
              <Breadcrumb.Item active>Add Product</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row className="mt-3 bg-body-tertiary rounded p-3">
          <Col>
            <form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Product Code
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="PRD-xxxxxxxx"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Categori
                </Form.Label>
                <Col sm="5">
                  <Select
                    placeholder=""
                    className="basic-single"
                    onChange={setCategory}
                    options={data}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 5,
                      colors: {
                        ...theme.colors,
                        primary: "#c2dbfeff",
                      },
                    })}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Barcode
                </Form.Label>
                <Col sm="5">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Product Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  QTY
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="number"
                    placeholder=""
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Price
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="number"
                    placeholder=""
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Supplier
                </Form.Label>
                <Col sm="6">
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={
                        supplier.firstName && supplier.lastName
                          ? supplier.firstName + " " + supplier.lastName
                          : ""
                      }
                      readOnly
                    />
                    <Button
                      variant="primary"
                      id="button-addon2"
                      onClick={() => setModalShow(true)}
                    >
                      Search
                    </Button>
                  </InputGroup>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Image
                </Form.Label>
                <Col sm="6">
                  <Form.Control type="file" onChange={loadImage} />
                </Col>
              </Form.Group>
              <Row>
                <Col md={{ span: 10, offset: 2 }}>
                  {preview ? (
                    <Figure>
                      <Figure.Image
                        width={171}
                        height={180}
                        alt="preview image"
                        src={preview}
                      />
                    </Figure>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 10, offset: 2 }}>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      <DataModal
        show={modalShow}
        size="xl"
        modalTitle="Search Supplier"
        onHide={() => setModalShow(false)}
        setSupplier={setSupplier}
      />
    </>
  );
};

export default AddProduct;
