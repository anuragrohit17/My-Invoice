const handlePrintInvoice = () => {
    const invoiceContainer = document.getElementById('invoice-container');
    const win = window.open();
    win.document.write(invoiceContainer.outerHTML);
    win.print();
    win.close();
  };
  