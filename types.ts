export interface CheckConfidence {
    bank_name: number;
    payer_name: number;
    payee_name: number;
    amount: number;
    micr_line: number;
}

export interface CheckData {
    bank_name: string | null;
    payer_name: string | null;
    payee_name: string | null;
    check_number: string | null;
    account_number: string | null;
    routing_number: string | null;
    micr_line: string | null;
    amount_numeric: number | null;
    amount_words: string | null;
    check_date: string | null; // YYYY-MM-DD
    signature_present: boolean;
    currency: string | null;
    confidence_score: CheckConfidence;
}
