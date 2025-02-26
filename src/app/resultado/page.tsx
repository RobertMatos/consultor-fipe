"use client";

import { useContext, useEffect, useState } from "react";
import { SearchContext } from "@/contexts/SearchContext";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { getVehicleDetails } from "../services/fipeService";
import { VehicleData } from "@/types/fipe";

export default function Resultado() {
  const { searchData } = useContext(SearchContext);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!searchData.brand || !searchData.model || !searchData.year) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        const vehicleData = await getVehicleDetails(
          searchData.brandId,
          searchData.modelId,
          searchData.yearId
        );

        setVehicleData({
          modelo: vehicleData.Modelo,
          ano: vehicleData.AnoModelo,
          valor: vehicleData.Valor,
          marca: vehicleData.Marca,
          combustivel: vehicleData.Combustivel,
          codigoFipe: vehicleData.CodigoFipe,
          mesReferencia: vehicleData.MesReferencia,
          siglaCombustivel: vehicleData.SiglaCombustivel,
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchData, router]);

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Buscando informações...
        </Typography>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#dcf5f2",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "96px",
        gap: "32px",
      }}
    >
      {vehicleData ? (
        <>
          <Typography variant="h4">
            <strong>
              Tabela Fipe: Preço {vehicleData.marca} {vehicleData.modelo}{" "}
              {vehicleData.ano}
            </strong>
          </Typography>
          <Box
            sx={{
              backgroundColor: "#229585",
              padding: 2,
              borderRadius: 15,
              color: "white",
            }}
          >
            <Typography variant="h5">{vehicleData.valor}</Typography>
          </Box>
          <p>Este é o preço de compra do veículo</p>
        </>
      ) : (
        <Typography variant="h6" color="error">
          Não foi possível recuperar os dados do veículo.
        </Typography>
      )}
    </div>
  );
}
