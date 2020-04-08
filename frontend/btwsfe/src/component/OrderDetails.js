import React from 'react';

function OrderDetails({order}) {
    return (
        <div className="row py-4">
            <div className="col-12 col-lg-4">
                Rendelés dátuma: {order.orderDate.year}. {order.orderDate.monthValue}. {order.orderDate.dayOfMonth}.
            </div>
            <div className="col-12 col-lg-4">
                Termékek száma: {order.productCount}
            </div>
            <div className="col-12 col-lg-4">
                Összeg: {order.priceSum.toLocaleString()} Ft
            </div>
            <div className="col-12">
                Számlázási név: {order.invoiceName}
            </div>
            <div className="col-12">
                Számlázási cím: {order.invoiceAddress.postalCode} {order.invoiceAddress.city} {order.invoiceAddress.street} {order.invoiceAddress.houseNumber}
            </div>
            <div className="col-12">
                Szállítási cím: {order.shippingAddress.postalCode} {order.shippingAddress.city} {order.shippingAddress.street} {order.shippingAddress.houseNumber}
            </div>
        </div>
    )
}

export default OrderDetails;