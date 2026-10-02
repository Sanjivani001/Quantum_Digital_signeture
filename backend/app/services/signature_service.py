from __future__ import annotations

from app.config import SIG_THRESHOLD
from app.quantum_engine.quantum_signature_engine import QuantumSignatureEngine
from app.services.hash_service import HashService
from app.services.storage_service import StorageService


class SignatureService:
    def __init__(self, storage: StorageService | None = None):
        self.storage = storage or StorageService()
        self.engine = QuantumSignatureEngine()

    def sign_message(self, message: str) -> dict:
        if not message or not message.strip():
            raise ValueError('Message cannot be empty.')

        normalized_message = HashService.normalize_message(message)
        signature_payload = self.engine.generate_signature(normalized_message)
        stored_payload = {
            'signature_id': signature_payload['signature_id'],
            'message_hash': signature_payload['message_hash'],
            'signature_metadata': signature_payload['signature_metadata'],
            'quantum_metadata': signature_payload['quantum_metadata'],
            'creation_timestamp': signature_payload['creation_timestamp'],
            'protocol_version': signature_payload['protocol_version'],
        }
        self.storage.save_signature(stored_payload)

        return {
            'signature_id': signature_payload['signature_id'],
            'message_hash': signature_payload['message_hash'],
            'quantum_signature': {
                'state_description': signature_payload['quantum_state_description'],
                'measurement_counts': signature_payload['measurement_counts'],
                'probabilities': signature_payload['probability_statistics'],
                'circuit_information': signature_payload['circuit_information'],
            },
            'protocol_version': signature_payload['protocol_version'],
            'created_at': signature_payload['creation_timestamp'],
            'creation_timestamp': signature_payload['creation_timestamp'],
            'verification_threshold': SIG_THRESHOLD,
        }

    def get_signature(self, signature_id: str) -> dict | None:
        row = self.storage.get_signature(signature_id)
        if row is None:
            return None
        row['signature_metadata'] = row.get('signature_metadata', {})
        row['quantum_metadata'] = row.get('quantum_metadata', {})
        return row
