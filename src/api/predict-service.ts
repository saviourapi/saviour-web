import httpClient from "./http-client";
import { PredictionDto } from "./training-service";

const RUTE = "learning/";

export interface TestDto {
  _id: string;
  data: File;
  algorithm: number;
}

export class PredictionService {
  async prediction(test: TestDto): Promise<PredictionDto> {
    const data = new FormData();
    data.append("_id", test._id);
    data.append("data", test.data);
    data.append("algorithm", test.algorithm.toString());
    return await httpClient
      .post(RUTE + "predict/", data)
      .then((res) => res.data)
      .catch(() => console.log("error"));
  }
}
