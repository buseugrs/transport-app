import React, { useState } from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import ProductList from "./ProductList";

const initialProducts = [];

const AddProduct = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    pname: "",
    budget: "",
    fromCity: "",
    toCity: "",
    description: "",
    elevatorRequired: "no",
    fromFloor: "",
    toFloor: "",
    deliveryDate: "",
    images: [],
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(null);

  const citiesInTurkey = [
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Aksaray",
    "Amasya",
    "Ankara",
    "Antalya",
    "Ardahan",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bartın",
    "Batman",
    "Bayburt",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Düzce",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Iğdır",
    "Isparta",
    "İstanbul",
    "İzmir",
    "Kahramanmaraş",
    "Karabük",
    "Karaman",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırıkkale",
    "Kırklareli",
    "Kırşehir",
    "Kilis",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Mardin",
    "Mersin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Osmaniye",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Şanlıurfa",
    "Şırnak",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Uşak",
    "Van",
    "Yalova",
    "Yozgat",
    "Zonguldak",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const imagesArray = await Promise.all(Array.from(files).map(fileToBase64));
    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...imagesArray].slice(0, 3),
    }));
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAddProduct = () => {
    if (
      newProduct.name === "" ||
      newProduct.pname === "" ||
      newProduct.budget === "" ||
      newProduct.fromCity === "" ||
      newProduct.toCity === "" ||
      newProduct.description === "" ||
      newProduct.deliveryDate === ""
    ) {
      setSnackbarOpen(true);
      setSnackbarMessage("Lütfen tüm alanları doldurun");
      return;
    }

    if (editing) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === newProduct.id ? newProduct : product
        )
      );
      setSnackbarMessage("Ürün başarıyla güncellendi");
    } else {
      const newId =
        products.length > 0
          ? Math.max(...products.map((p) => parseInt(p.id))) + 1
          : 1;

      const productWithId = {
        ...newProduct,
        id: newId.toString(),
      };

      setProducts([...products, productWithId]);
      setSnackbarMessage("Ürün başarıyla eklendi");
    }

    setNewProduct({
      id: "",
      name: "",
      pname: "",
      budget: "",
      fromCity: "",
      toCity: "",
      description: "",
      elevatorRequired: "no",
      fromFloor: "",
      toFloor: "",
      deliveryDate: "",
      images: [],
    });
    setSnackbarOpen(true);
    setEditing(false);
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setNewProduct(productToEdit);
    setEditing(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    setSnackbarOpen(true);
    setSnackbarMessage("Ürün başarıyla silindi");
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getDescriptionPreview = (description) => {
    const maxLength = 100;
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + "...";
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Ürün Ekle
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              id="image-upload"
              style={{ display: "none" }}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" color="primary" component="span">
                Resim Yükle
              </Button>
            </label>
            <Box
              sx={{ display: "flex", flexDirection: "row", gap: 1, marginTop: 1 }}
            >
              {newProduct.images &&
                newProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`upload-${index}`}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                ))}
            </Box>
            <TextField
              id="product-name"
              label="Ürün Adı"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="product-type-label">Ürün Türü</InputLabel>
                  <Select
                    labelId="product-type-label"
                    id="product-type"
                    label="Ürün Türü"
                    name="pname"
                    value={newProduct.pname}
                    onChange={handleChange}
                  >
                    <MenuItem value="Dosya">Dosya</MenuItem>
                    <MenuItem value="Küçük paket">Küçük paket</MenuItem>
                    <MenuItem value="Büyük paket">Büyük paket</MenuItem>
                    <MenuItem value="Beyaz eşya">Beyaz eşya</MenuItem>
                    <MenuItem value="Tek parça mobilya">
                      Tek parça mobilya
                    </MenuItem>
                    <MenuItem value="Mobilyalar">Mobilyalar</MenuItem>
                    <MenuItem value="Tüm ev taşımacılığı">
                      Tüm ev taşımacılığı
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="delivery-date"
                  label="Hangi tarihte düşünüyorsunuz?"
                  name="deliveryDate"
                  type="date"
                  value={newProduct.deliveryDate}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="from-city-label">Hangi İlden alınacak?</InputLabel>
                  <Select
                    labelId="from-city-label"
                    id="from-city"
                    label="Hangi İlden alınacak?"
                    name="fromCity"
                    value={newProduct.fromCity}
                    onChange={handleChange}
                  >
                    {citiesInTurkey.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="to-city-label">Hangi İle bırakılacak?</InputLabel>
                  <Select
                    labelId="to-city-label"
                    id="to-city"
                    label="Hangi İle bırakılacak?"
                    name="toCity"
                    value={newProduct.toCity}
                    onChange={handleChange}
                  >
                    {citiesInTurkey.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Asansör Gerekli mi?</Typography>
              <RadioGroup
                aria-label="elevatorRequired"
                name="elevatorRequired"
                value={newProduct.elevatorRequired}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="yes" control={<Radio />} label="Evet" />
                <FormControlLabel value="no" control={<Radio />} label="Hayır" />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField
                  id="from-floor"
                  label="Alınacak kat"
                  name="fromFloor"
                  value={newProduct.fromFloor}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="to-floor"
                  label="Bırakılacak kat"
                  name="toFloor"
                  value={newProduct.toFloor}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <TextField
              id="product-budget"
              label="Bütçe"
              name="budget"
              value={newProduct.budget}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="product-description"
              label="Açıklama"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
              sx={{ mb: 2 }}
            >
              {editing ? "Güncelle" : "Ekle"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
