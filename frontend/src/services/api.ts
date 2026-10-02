import type { SignatureResponse, VerificationResponse } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {})
    }
  })

  const text = await response.text()
  let payload: any = null

  if (text) {
    try {
      payload = JSON.parse(text)
    } catch {
      payload = { message: text }
    }
  }

  if (!response.ok) {
    const message = payload?.detail ?? payload?.message ?? 'The API request failed.'
    throw new Error(message)
  }

  return payload as T
}

export async function healthCheck(): Promise<{ status: string }> {
  return apiRequest<{ status: string }>('/api/health')
}

export async function signMessage(message: string): Promise<SignatureResponse> {
  return apiRequest<SignatureResponse>('/api/sign', {
    method: 'POST',
    body: JSON.stringify({ message })
  })
}

export async function verifyMessage(
  message: string,
  signatureId?: string,
  signatureData?: Record<string, unknown>
): Promise<VerificationResponse> {
  const payload: Record<string, unknown> = { message }

  if (signatureId) {
    payload.signature_id = signatureId
  }

  if (signatureData) {
    payload.signature_data = signatureData
  }

  return apiRequest<VerificationResponse>('/api/verify', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
