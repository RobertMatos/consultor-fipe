"use client";

import { useContext, useEffect, useState } from "react";
import { SearchContext } from "@/contexts/SearchContext";
import {
  Container,
  Typography,
  TypographyProps,
  Box,
  Button,
  Select,
  SelectChangeEvent,
  MenuItem
} from "@mui/material"; 
import { useRouter } from "next/navigation";
import {
  getBrands,
  getModelsByBrand,
  getYearsByModel,
} from "./services/fipeService";

export default function Home() {
  const { searchData, setSearchData } = useContext(SearchContext);
  const [brands, setBrands] = useState<{ codigo: string; nome: string }[]>([]);
  const [models, setModels] = useState<{ codigo: number; nome: string }[]>([]);
  const [years, setYears] = useState<{ codigo: string; nome: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    setSearchData({
      brand: "",
      brandId: "",
      model: "",
      modelId: 0,
      year: "",
      yearId: "",
    });
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getBrands();
      setBrands(
        data.map((brand: { codigo: string; nome: string }) => ({
          codigo: brand.codigo,
          nome: brand.nome,
        }))
      );
    };

    fetchBrands();
  }, []);

  const handleBrandChange = async (event: SelectChangeEvent) => {
    const selectedBrand = event.target.value;
    const brandObj = brands.find((b) => b.nome === selectedBrand);
  
    if (!brandObj) return;
  
    setSearchData({
      brand: selectedBrand,
      brandId: brandObj.codigo,
      model: "",
      modelId: 0,
      year: "",
      yearId: "",
    });
  
    const modelsData = await getModelsByBrand(brandObj.codigo);
    setModels(modelsData);
  };
  
  const handleModelChange = async (event: SelectChangeEvent) => {
    const selectedModel = event.target.value;
    const modelObj = models.find((m) => m.nome === selectedModel);
  
    if (!modelObj) return;
  
    setSearchData((prev) => ({
      ...prev,
      model: selectedModel,
      modelId: modelObj.codigo,
      year: "",
      yearId: "",
    }));
  
    const yearsData = await getYearsByModel(searchData.brandId, modelObj.codigo);
    setYears(yearsData);
  };
  
  const handleYearChange = (event: SelectChangeEvent) => {
    const selectedYear = event.target.value;
    const yearObj = years.find((y) => y.nome === selectedYear);
  
    if (!yearObj) return;
  
    setSearchData((prev) => ({
      ...prev,
      year: selectedYear,
      yearId: yearObj.codigo,
    }));
  };  

  const handleSearch = () => {
    if (searchData.brand && searchData.model && searchData.year) {
      router.push("/resultado");
    }
  };

  const BoldTypography: React.FC<TypographyProps> = (props) => (
    <Typography {...props} sx={{ fontWeight: "bold", ...props.sx }} />
  );

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        maxWidth: "100vw",
        fontWeight: "bold",
        gap: "12px"
      }}
    >
      <BoldTypography variant="h4">
        Tabela FIPE
      </BoldTypography>
      <BoldTypography variant="h5" gutterBottom>
        Consulte o valor de um veículo de forma gratuita
      </BoldTypography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          background: "#fff",
          padding: "2rem 3.5rem",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          width: "80%",
        }}
      >
        <Select
          value={searchData.brand}
          onChange={handleBrandChange}
          displayEmpty
          fullWidth={true}
        >
          <MenuItem value="" disabled>
            Selecione a Marca
          </MenuItem>
          {brands
            .filter((brand) => brand.codigo && brand.nome)
            .map((brand) => (
              <MenuItem key={brand.codigo} value={brand.nome}>
                {brand.nome}
              </MenuItem>
            ))}
        </Select>

        <Select
          value={searchData.model}
          onChange={handleModelChange}
          displayEmpty
          disabled={!searchData.brand}
          fullWidth={true}
        >
          <MenuItem value="" disabled>
            Selecione o Modelo
          </MenuItem>
          {models
            .filter((model) => model.codigo && model.nome)
            .map((model) => (
              <MenuItem key={model.codigo} value={model.nome}>
                {model.nome}
              </MenuItem>
            ))}
        </Select>
        {searchData.model && (
          <Select
            value={searchData.year}
            onChange={handleYearChange}
            displayEmpty
            disabled={!searchData.model}
            fullWidth={true}
          >
            <MenuItem value="" disabled>
              Selecione o Ano
            </MenuItem>
            {years
              .filter((year) => year.codigo && year.nome)
              .map((year) => (
                <MenuItem key={year.codigo} value={year.nome}>
                  {year.nome}
                </MenuItem>
              ))}
          </Select>
        )}

        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={!searchData.year}
          size="large"
          sx={{
            backgroundColor: "#6512c0",
            padding: "0.75rem 1.5rem",
          }}
        >
          Consultar Preço
        </Button>
      </Box>
    </Container>
  );
}
