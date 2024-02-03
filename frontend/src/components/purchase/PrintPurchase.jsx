import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../auth/AxiosConfig.jsx";
import secureLocalStorage from "react-secure-storage";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoPrint } from "react-icons/io5";

const PrintPurchase = () => {
  const [data, setData] = useState({});
  const [detail, setDetail] = useState([]);
  const { id } = useParams();

  const loadData = useCallback(async () => {
    try {
      const out = await axiosInstance.get(`/api/purchases/${id}`, {
        headers: {
          Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
          "Content-Type": "application/json",
        },
      });
      setData(out.data.result);
      setDetail(out.data.result.Purchasedetail);
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

  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <Container>
        <Row className="mt-3 justify-content-between">
          <Col lg={6} className="text-start align-top">
            <h4>Purchase</h4>
            <table>
              <tr>
                <td>Print Date</td>
                <td>&nbsp;:&nbsp;</td>
                <td>2022-08-01</td>
              </tr>
              <tr>
                <td>Print By</td>
                <td>&nbsp;:&nbsp;</td>
                <td>{secureLocalStorage.getItem("user")?.name}</td>
              </tr>
            </table>
          </Col>
          <Col>
            <table>
              <tr>
                <td>Purchase No</td>
                <td>&nbsp;:&nbsp;</td>
                <td>{data?.code}</td>
              </tr>
              <tr>
                <td>Purchase Date</td>
                <td>&nbsp;:&nbsp;</td>
                <td>
                  {new Date(data?.date).toDateString("id-ID") || data?.date}
                </td>
              </tr>
              <tr>
                <td>Note</td>
                <td>&nbsp;:&nbsp;</td>
                <td>{data?.note}</td>
              </tr>
            </table>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {detail?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.productName}</td>
                    <td>{Number(item?.qty).toLocaleString("id-ID")}</td>
                    <td>Rp {Number(item?.price).toLocaleString("id-ID")}</td>
                    <td className="text-end">
                      Rp {Number(item?.total).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="text-end">
                    <strong>Total</strong>
                  </td>
                  <td className="text-end">
                    <strong>
                      Rp {Number(data.total).toLocaleString("id-ID")}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="text-end">
                    <strong>PPN</strong>
                  </td>
                  <td className="text-end">
                    <strong>
                      Rp {Number(data.ppn).toLocaleString("id-ID")}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="text-end">
                    <strong>Grand Total</strong>
                  </td>
                  <td className="text-end">
                    <strong>
                      Rp {Number(data.grandTotal).toLocaleString("id-ID")}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="print">
          <Col className="p-3">
            <div className="d-flex justify-content-between">
              <Link to="/purchase" className="btn btn-primary">
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

export default PrintPurchase;
