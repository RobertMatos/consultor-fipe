import axios from "axios";

const BASE_URL = "/api/fipe"; // Agora usamos a API interna

/**
 * Obtém a lista de marcas disponíveis.
 */
export const getBrands = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/carros/marcas`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar marcas:", error);
    return [];
  }
};

/**
 * @param brandId Código da marca
 */
export const getModelsByBrand = async (brandId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/carros/marcas/${brandId}/modelos`);
    return response.data.modelos;
  } catch (error) {
    console.error("Erro ao buscar modelos:", error);
    return [];
  }
};

/**
 * @param brandId Código da marca
 * @param modelId Código do modelo
 */
export const getYearsByModel = async (brandId: string, modelId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/carros/marcas/${brandId}/modelos/${modelId}/anos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar anos:", error);
    return [];
  }
};

/**
 * @param brandId Código da marca
 * @param modelId Código do modelo
 * @param yearId Código do ano
 */
export const getVehicleDetails = async (brandId: string, modelId: number, yearId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do veículo:", error);
    return null;
  }
};
