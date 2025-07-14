
export interface playersResponse {
  player_uid: string;
  firstName: string;
  last_name: string;
  email: string;
  status: number;
  positions: string[];
}


export interface playersDetailResponse {
  address: string | null,
  afiliation: string | null,
  birth_dt: string | Date,
  phone_number: string,
  blood_type: string | null,
  comments: string | null,
  credential: string | null,
  curp: string | null,
  email: string;
  enfermedad: string | null
  firstName: string;
  last_name: string;
  player_uid: string;
  positions: string[] | null;
  sex: "Hombre" | "Mujer" | null,
  status: number;
  emergency_number: string,
  insurance: boolean,
  insurance_name: string | null
}


