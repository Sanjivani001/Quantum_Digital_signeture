from __future__ import annotations

from pydantic import BaseModel, Field


class SignRequest(BaseModel):
    message: str = Field(..., min_length=1, description='User message to sign')


class VerifyRequest(BaseModel):
    message: str = Field(..., min_length=1, description='Received message for verification')
    signature_id: str | None = Field(default=None, description='Stored signature identifier')
    signature_data: dict | None = Field(default=None, description='Optional signature payload used for verification')


class SignatureRecord(BaseModel):
    signature_id: str
    message_hash: str
    quantum_state_description: str
    circuit_information: dict
    measurement_counts: dict[str, int]
    probability_statistics: dict[str, float]
    creation_timestamp: str
    protocol_version: str
