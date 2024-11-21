import React, { useState } from 'react';
import './App.css';



function InvoiceForm() {
  const [invoice, setInvoice] = useState({
    products: [],
    totalAmount: 0,
    labourCharge: 0,
    cuttingCharge: 0,
    grandTotal: 0,
  });
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [rate, setRate] = useState(0);
  const [cuttingChargeValue, setCuttingChargeValue] = useState(0);

  const handleAddProduct = () => {
    const product = {
      name: productName,
       quantity,
       rate,
       amount: quantity * rate,
    };
    setInvoice((prevInvoice) => {
      const newTotalAmount = prevInvoice.totalAmount + product.amount;
      const labourCharge = newTotalAmount * 0.03;
      const grandTotal = newTotalAmount + labourCharge + cuttingChargeValue;
      return {
        products: [...prevInvoice.products, product],
        totalAmount: newTotalAmount,
        labourCharge,
        grandTotal,
      };
    });
    setProductName('');
    setQuantity(0);
    setRate(0);
  };

  const handleRemoveProduct = (index) => {
    setInvoice((prevInvoice) => {
      const newProducts = [...prevInvoice.products];
      newProducts.splice(index, 1);
      const newTotalAmount = prevInvoice.totalAmount - newProducts[index].amount;
      const labourCharge = newTotalAmount * 0.03;
      const grandTotal = newTotalAmount + labourCharge + cuttingChargeValue;
      return {
        products: newProducts,
        totalAmount: newTotalAmount,
        labourCharge,
        grandTotal,
      };
    });
  };

  const handleCuttingChargeChange = (event) => {
    const cuttingCharge = parseInt(event.target.value);
    setCuttingChargeValue(cuttingCharge);
    setInvoice((prevInvoice) => {
      const newTotalAmount = prevInvoice.totalAmount;
      const labourCharge = newTotalAmount * 0.03;
      const grandTotal = newTotalAmount + labourCharge + cuttingCharge;
      return {
        ...prevInvoice,
        labourCharge,
        grandTotal,
      };
    });
  };

  const handlePrintInvoice = () => {
    window.print();
  };
  const handleExportPdf = () => {
    //const doc = new jsPDF();
   // doc.text('Invoice', 10, 10);
    doc.text(`Invoice Number: #123`, 10, 20);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);
    invoice.products.forEach((product, index) => {
      doc.text(`${product.name} x ${product.quantity} = ${product.amount}`, 10, 40 + index * 10);
    });
    doc.text(`Total Amount: ${invoice.totalAmount}`, 10, 100);
    doc.text(`Labour Charge (3%): ${invoice.labourCharge}`, 10, 110);
    doc.text(`Cutting Charge: ${cuttingChargeValue}`, 10, 120);
    doc.text(`Grand Total: ${invoice.grandTotal}`, 10, 130);
    doc.save('invoice.pdf');
  };const handleExportExcel = () => {
    const data = [
      ['Product', 'Quantity', 'Rate', 'Amount'],
      ...invoice.products.map((product) => [product.name, product.quantity, product.rate, product.amount]),
      ['Total Amount', '', '', invoice.totalAmount],
      ['Labour Charge (3%)', '', '', invoice.labourCharge],
      ['Cutting Charge', '', '', cuttingChargeValue],
      ['Grand Total', '', '', invoice.grandTotal],
    ];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoice');
    XLSX.writeFile(workbook, 'invoice.xlsx');
  };



  return (
    <div id="invoice-container">
      <h2>Invoice Form</h2>
      <form>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(parseFloat(event.target.value))}
          />
        </div>
        <div>
        <label>Rate:</label>
          <input
            type="number"
            value={rate}
            onChange={(event) => setRate(parseFloat(event.target.value))}
          />
        </div>
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
      <form>
        <div>
          <label>Cutting Charge:</label>
          <input
            type="number"
            value={cuttingChargeValue}
            onChange={handleCuttingChargeChange}
          />
        </div>
      </form>
      <h3>Invoice Details</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {invoice.products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.rate}</td>
              <td>{product.amount}</td>
              <td>
                <button type="button" onClick={() => handleRemoveProduct(index)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Amount: {invoice.totalAmount}</p>
      <p>Labour Charge (3%): {invoice.labourCharge}</p>
      <p>Cutting Charge: {cuttingChargeValue}</p>
      <p>Grand Total: {invoice.grandTotal}</p>
      <button onClick={handlePrintInvoice}>Print Invoice</button>
      <div className="print-area">
      <p>Date: {new Date().toLocaleDateString()}</p>
       
       
        
      </div>
    </div>
  );
}

export default InvoiceForm;


