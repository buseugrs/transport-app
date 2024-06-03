import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
  } from "@mui/material";


  const products = [
    {
      id: "1",
      name: "Sunil Joshi",
      post: "Web Designer",
      pname: "Elite Admin",
      priority: "Low",
      pbg: "primary.main",
      budget: "3.9",
    },
    {
      id: "2",
      name: "Andrew McDownland",
      post: "Project Manager",
      pname: "Real Homes WP Theme",
      priority: "Medium",
      pbg: "secondary.main",
      budget: "24.5",
    },
    {
      id: "3",
      name: "Christopher Jamil",
      post: "Project Manager",
      pname: "MedicalPro WP Theme",
      priority: "High",
      pbg: "error.main",
      budget: "12.8",
    },
    {
      id: "4",
      name: "Nirav Joshi",
      post: "Frontend Engineer",
      pname: "Hosting Press HTML",
      priority: "Critical",
      pbg: "success.main",
      budget: "2.4",
    },
  ];


/*interface DataTableProps {
    data: any[]
    columns: []
    isShowButton: Boolean
    
}*/
const AliDataTable = () => {
    return(
<Table
      aria-label="simple table"
      sx={{
        mt: 3,
        whiteSpace: "nowrap",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
               Id
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Firma Adı
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Araç Türü
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Hangİ illere hizmet veriilecek?
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography color="textSecondary" variant="h6">
              Budget
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {product.id}
              </Typography>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    {product.post}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {product.pname}
              </Typography>
            </TableCell>
            <TableCell>
              <Chip
                sx={{
                  pl: "4px",
                  pr: "4px",
                  backgroundColor: product.pbg,
                  color: "#fff",
                }}
                size="small"
                label={product.priority}
              ></Chip>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">${product.budget}k</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    )
}

export default AliDataTable