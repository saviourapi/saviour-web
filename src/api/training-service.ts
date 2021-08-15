import httpClient from "./http-client";

const RUTE = "learning/";

export interface Coord {
  x: string[];
  y: number[];
}

export interface DataDto {
  backgroundColor: string;
  data: Coord[];
  label: string;
}

export interface PredictionDto {
  title: string;
  xlabel: string;
  ylabel: string;
  score: number;
  datasets: DataDto[];
}

export interface ModelDto {
  score: number;
  predictions: PredictionDto[];
}

export interface TrainingDto {
  _id: string;
  x_plot: string;
  y_plot: string;
  group_by: string;
  labels: string[];
  algorithm: number;
  test: number;
}

export interface RespondeDelete {
  message: string;
}

export class TrainingService {
  async training(training: TrainingDto): Promise<ModelDto> {
    return await httpClient
      .post(RUTE, training)
      .then((res) => res.data)
      .catch(() => console.log("error"));
  }

  async deleteModal(idModel: string): Promise<RespondeDelete> {
    return await httpClient
      .delete(RUTE + "delete/", { data: { _id: idModel } })
      .then((res) => res.data)
      .catch(() => console.log("error"));
  }
}
