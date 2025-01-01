export interface WalletData {
  income_wallet?: number;
  matching_bonus?: number;
  reference_bonus?: number;
  club_bonus?: number;
  purchase_wallet?: number;
  project_share_wallet?: number;
  fixed_deposit_wallet?: number;
  directorship_wallet?: number;
  share_holder_wallet?: number;
}

export interface AddMoneyHistoryData {
  bank_account_name?: string;
  bank_name?: string;
  branch_name?: string;
  directorship: number;
  fixed_deposit?: number;
  money_receipt_number?: string;
  payment_method?: string;
  phone?: string;
  picture?: string;
  project_share?: number;
  share_holder?: number;
  total_amount?: number;
  transaction_id?: string;
  userId?: string;
}

export interface AccountAbleData {
  add_money_history: AddMoneyHistoryData;
  bank_account_name?: string;
  bank_name?: string;
  branch_name?: string;
  date?: string;
  directorship?: number;
  fixed_deposit?: number;
  money_receipt_number?: string;
  payment_method?: string;
  phone?: number;
  picture?: string;
  project_share?: number;
  share_holder?: number;
  team_a_carry?: number;
  team_a_member?: number;
  team_a_point?: number;
  team_b_carry?: number;
  team_b_member?: number;
  team_b_point?: number;
  total_amount?: number;
  total_carry?: number;
  total_point?: number;
  transaction_id?: string;
  userId?: string;
}

export interface UserData {
  _id?: string;
  name: string;
  user_name: string;
  father_or_husband_name: string;
  mother_name: string;
  picture: string;
  cover_photo?: string;
  email: string;
  password?: string;
  phone: string;
  role: string;
  present_address: string;
  permanent_address: string;
  nationality: string;
  religion: string;
  blood_group: string;
  nid_passport_no: string;
  designation?: string;
  dob: string;
  choice_side?: string;
  marital_status: string;
  profession: string;
  reference_id?: {
    _id: string;
    user_name?: string;
  };
  parent_placement_id?: {
    _id: string;
    user_name?: string;
  };
  nominee_name: string;
  relation_with_nominee: string;
  nominee_address: string;
  nominee_mobile_no: string;
  nominee_picture: string;
  registration_date?: string;
  wallet?: WalletData;
  accountable?: AccountAbleData;
  bKash: string;
  rocket: string;
  nagad: string;
  bank_name: string;
  branch_name: string;
  bank_account_name: string;
  account_no: string;
  routing_no: string;
  swift_code: string;
}

export interface AddMoneyHistoriesInterface {
  // userId: string | "";
  _id: string;
  project_share: number;
  fixed_deposit: number;
  share_holder: number;
  directorship: number;
  total_amount: number;
  money_receipt_number: string;
  phone: string;
  payment_method: string;
  bank_name: string;
  bank_account_name: string;
  branch_name: string;
  transaction_id: string;
  picture: string;
  payment_picture: string;
  createdAt: string;
  date: string;
  is_approved: boolean;
}
