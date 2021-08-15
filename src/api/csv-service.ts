import httpClient from "./http-client";

const RUTE = "csv/";

export interface CsvSumarizeDto {
  _id: string;
  columns: string[];
  corr: Record<string, Record<string, number | string>>;
}

export class CsvService {
  async uploadFile(file: File): Promise<CsvSumarizeDto> {
    const data = new FormData();
    data.append("data", file);
    return await httpClient
      .post(RUTE + "upload/", data)
      .then((res) => res.data)
      .catch(() => console.log("error"));
  }
}
