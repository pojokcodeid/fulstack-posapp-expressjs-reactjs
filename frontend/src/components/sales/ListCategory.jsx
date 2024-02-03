import { useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../features/CategoriSlice.js";
import { toast } from "react-toastify";
import {
  getAllByCategory,
  getAllProduct,
} from "../../features/ProductSlice.js";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { CiCoffeeCup } from "react-icons/ci";
import { FaUtensils } from "react-icons/fa";
import { TbBrandCakephp } from "react-icons/tb";
import { GiClothes } from "react-icons/gi";
import { LiaIconsSolid } from "react-icons/lia";

const ListCategory = () => {
  const categorys = useSelector((state) => state.category.data);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);
  const dispatch = useDispatch();

  const setIcon = (id) => {
    switch (id) {
      case 1:
        return <FaUtensils />;
      case 2:
        return <CiCoffeeCup />;
      case 3:
        return <TbBrandCakephp />;
      case 4:
        return <GiClothes />;
      default:
        return <LiaIconsSolid />;
    }
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
      });
    }
  }, [error]);

  function setActive(elem) {
    var a = document.getElementsByClassName("active");
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove("active");
    }
    elem.classList.add("active");
  }

  const showAll = () => {
    dispatch(getAllProduct(""));
  };
  const categoryClicked = (id) => {
    dispatch(getAllByCategory(id));
  };
  return (
    <>
      <Col md={4} lg={2}>
        <div className="bg-body-tertiary rounded p-3">
          <h4>Product Kategori</h4>
          <hr />
          {loading ? "Loading..." : ""}
          <ListGroup key="all001">
            <ListGroup.Item
              id={`all001`}
              className="mb-1 shadow-sm border-0"
              active
              action
              onClick={() => {
                setActive(document.getElementById(`all001`)), showAll();
              }}
            >
              <MdOutlineProductionQuantityLimits /> All Product
            </ListGroup.Item>
          </ListGroup>
          {categorys &&
            categorys.map((item) => (
              <ListGroup key={item.id}>
                <ListGroup.Item
                  id={`key${item.id}`}
                  className="mb-1 shadow-sm border-0"
                  action
                  onClick={() => {
                    setActive(document.getElementById(`key${item.id}`)),
                      categoryClicked(item.id);
                  }}
                >
                  {setIcon(item.id)} {item.kategoryName}
                </ListGroup.Item>
              </ListGroup>
            ))}
        </div>
      </Col>
    </>
  );
};

export default ListCategory;
