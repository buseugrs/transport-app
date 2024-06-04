import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Button,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const initialProducts = [];

const AddVehicleAdvertForm = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newListing, setNewListing] = useState({
    id: "",
    name: "",
    post: "",
    pname: "",
    pbg: "primary.main",
    budget: "",
    selectedCities: [],
    description: "",
    images: [],
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [submittedListing, setSubmittedListing] = useState(null);
  const [editing, setEditing] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(null);

  const citiesInTurkey = [
    "Tüm iller",
    "Marmara bölgesi",
    "Ege bölgesi",
    "Akdeniz bölgesi",
    "İç Anadolu bölgesi",
    "Karadeniz bölgesi",
    "Doğu bölgesi",
    "Güneydoğu Anadolu bölgesi",
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
    setNewListing((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imagesArray = Array.from(e.target.files);
    setNewListing((prev) => ({
      ...prev,
      images: [...prev.images, ...imagesArray],
    }));
  };

  const getNextId = () => {
    if (products.length === 0) {
      return "1";
    } else {
      const lastId = parseInt(products[products.length - 1].id);
      return (lastId + 1).toString();
    }
  };

  const handleAddListing = () => {
    if (
      newListing.name === "" ||
      newListing.post === "" ||
      newListing.pname === "" ||
      newListing.budget === "" ||
      newListing.selectedCities.length === 0 ||
      newListing.description === ""
    ) {
      setSnackbarOpen(true);
      setSnackbarMessage("Lütfen tüm alanları doldurun");
      return;
    }

    if (editing) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === newListing.id ? newListing : product
        )
      );
      setSnackbarMessage("İlanınız başarıyla güncellendi");
    } else {
      const newId = getNextId();

      const listingWithId = {
        ...newListing,
        id: newId,
      };

      setProducts([...products, listingWithId]);
      setSnackbarMessage("İlanınız başarıyla kaydedildi");
    }

    setSubmittedListing(newListing);
    setNewListing({
      id: "",
      name: "",
      post: "",
      pname: "",
      pbg: "primary.main",
      budget: "",
      selectedCities: [],
      description: "",
      images: [],
    });
    setSnackbarOpen(true);
    setEditing(false);
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setNewListing(productToEdit);
    setEditing(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleExpandDescription = (id) => {
    setExpandedDescription((prev) => (prev === id ? null : id));
  };

  const getDescriptionPreview = (description) => {
    const maxLength = 100;
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + "...";
  };

  return (
    <Box>
      <Card variant="outlined" sx={{ p: 0, mb: 4 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              İlan Ekle
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Button variant="contained" component="label" size="small">
              Resim Ekle
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                hidden
              />
            </Button>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {newListing.images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Resim ${index + 1}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    margin: "8px",
                  }}
                />
              ))}
            </Box>
            <TextField
              label="Firma Adı"
              name="name"
              value={newListing.name}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Plaka"
              name="post"
              value={newListing.post}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Araç Türü</InputLabel>
              <Select
                variant="outlined"
                label="Araç Türü"
                value={newListing.pname}
                onChange={handleChange}
                name="pname"
              >
                <MenuItem value="Tır">Tır</MenuItem>
                <MenuItem value="Kamyon">Kamyon</MenuItem>
                <MenuItem value="Kamyonet">Kamyonet</MenuItem>
                <MenuItem value="Panelvan">Panelvan</MenuItem>
                <MenuItem value="Minibüs">Minibüs</MenuItem>
                <MenuItem value="Otomobil">Otomobil</MenuItem>
                <MenuItem value="Karavan">Karavan</MenuItem>
                <MenuItem value="Motosiklet">Motosiklet</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="city-label">
                Hangi İllere Hizmet Verilecek?
              </InputLabel>
              <Select
                labelId="city-label"
                label="Hangi İllere Hizmet Verilecek?"
                multiple
                value={newListing.selectedCities}
                onChange={(e) =>
                  setNewListing({
                    ...newListing,
                    selectedCities: e.target.value,
                  })
                }
                renderValue={(selected) => selected.join(", ")}
              >
                {citiesInTurkey.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Açıklama"
              name="description"
              multiline
              rows={4}
              value={newListing.description}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Bütçe"
              name="budget"
              value={newListing.budget}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddListing}
            >
              {editing ? "İlanı Güncelle" : "İlan Ekle"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default AddVehicleAdvertForm;
