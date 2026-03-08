export interface InsuranceFormData {
  age: number;
  sex: number;
  bmi: number;
  children: number;
  smoker: number;
  region_northwest: number;
  region_southeast: number;
  region_southwest: number;
}

export interface PredictionResponse {
  predicted_charges: number;
}
