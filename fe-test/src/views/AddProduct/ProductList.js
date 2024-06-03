
import React from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

const ProductList = ({ products }) => {
  return (
    <div>
      <h1>İlanlarınız</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ürün Adı</TableCell>
              <TableCell>Ürün Türü</TableCell>
              <TableCell>Teslim Tarihi</TableCell>
              <TableCell>Bütçe</TableCell>
              <TableCell>Alınacak İl</TableCell>
              <TableCell>Bırakılacak İl</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.pname}</TableCell>
                <TableCell>{product.deliveryDate}</TableCell>
                <TableCell>{product.budget}</TableCell>
                <TableCell>{product.fromCity}</TableCell>
                <TableCell>{product.toCity}</TableCell>
                <TableCell>
                  <Link to={`/products/${product.id}`}>
                    <Button variant="contained" color="primary">
                      Detaylar
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductList;
