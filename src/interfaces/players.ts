
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

export interface playerTypeForm {
  birth_dt: string
  address: string | null
  afiliation: string | null
  blood_type: string | null
  comments: string | null
  credential: string | null
  curp: string | null,
  email: string | null,
  emergency_number: string | null,
  enfermedad: string | null,
  firstName: string,
  insurance_name: string | null,
  insurance: boolean,
  last_name: string,
  phone_number: string,
  position: string[] | null,
  sex: "Hombre" | "Mujer" | null,
}

