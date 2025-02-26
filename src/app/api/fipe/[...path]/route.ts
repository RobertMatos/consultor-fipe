import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest, { params }: any): Promise<Response> {
  const path = params.path;
  if (!path || !Array.isArray(path)) {
    return new Response(JSON.stringify({ error: "Parâmetros inválidos" }), { status: 400 });
  }
  const apiUrl = `https://parallelum.com.br/fipe/api/v1/${path.join("/")}`;

  try {
    const response = await axios.get(apiUrl);
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro na API FIPE", error);
    return new Response(JSON.stringify({ error: "Erro na requisição" }), { status: 500 });
  }
}
