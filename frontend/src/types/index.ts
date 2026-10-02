export type QuantumSignaturePayload = {
  state_description: string
  measurement_counts: Record<string, number>
  probabilities: Record<string, number>
  circuit_information: {
    qubits: number
    classical_bits: number
    gates: string[]
    depth: number
    simulator: string
  }
}

export type SignatureResponse = {
  signature_id: string
  message_hash: string
  quantum_signature: QuantumSignaturePayload
  protocol_version: string
  created_at: string
  creation_timestamp: string
  verification_threshold: number
}

export type VerificationResponse = {
  valid: boolean
  verification_score: number
  threshold: number
  message_integrity: boolean
  reason: string
}

export type ApiError = {
  message: string
  detail?: string
}
