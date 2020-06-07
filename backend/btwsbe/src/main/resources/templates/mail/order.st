<html>
    <head>
        <style>
            table {
                border-collapse: collapse;
            }
            table, th, td {
                border: 1px solid black;
            }
            th, td {
                padding-left: 10px;
                padding-right: 10px;
            }
        </style>
    </head>
    <body>
        <p>Kedves $user.name$!</p>
        <br/>
        <p>Köszönjük megrendelését!</p>
        <br/>
        <p>Rendelés azonosítója: $order.id$<p>
        <p>Rendelés állapota: $order.status.label$</p>
        </br/>
        <p>Számlázási cím: $order.invoiceAddress.fullAddress$</p>
        <p>Szállítási cím: $order.shippingAddress.fullAddress$</p>
        </br/>
        <p>Az alábbi termékeket rendelte meg:</p>
        <table>
            <tr>
                <th>Termék neve</th>
                <th>Mennyiség</th>
                <th>Összeg</th>
            </tr>
            $products:{ product |
                <tr>
                    <td>$product.product.name$</td>
                    <td>$product.quantity$ db</td>
                    <td>$product.price$ Ft/db</td>
                </tr>
            }$
            <tr>
                <td><b>Összesen</b></td>
                <td><b>$quantitySum$ db</b></td>
                <td><b>$priceSum$ Ft</b></td>
            </th>
        </table>

        <br/><br/>
        <p>Üdvözlettel:</p>
        <p>Borostack Webshop</p>
    </body>
</html>
