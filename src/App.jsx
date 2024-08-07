import { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);
  const [qty, setQty] = useState(1);
  const [discount, setDiscount] = useState(0);

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code);

    //Redundant
    const exist = dataItems.find((v) => v.item === item.name && v.ppu === ppu);
    if (exist) {
      let newDataItems = [...dataItems];
      let index = newDataItems.findIndex(
        (v) => v.item === item.name && v.ppu === ppu,
      );
      newDataItems[index].qty += parseInt(qty);
      newDataItems[index].discount += parseInt(discount);
      setDataItems(newDataItems);
      return;
    }

    //Unique
    const newItem = {
      item: item.name,
      ppu: ppu,
      qty: qty,
      discount: parseInt(discount) || 0,
    };

    setDataItems([...dataItems, newItem]);
  };

  const clearDataItems = () => {
    setDataItems([]);
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {products.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                value={ppu}
                onChange={(e) => setPpu(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                defaultValue={1}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  setDiscount(e.target.value);
                }}
                defaultValue={0}
              />
            </Col>
          </Row>

          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            deleteByIndex={deleteByIndex}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
