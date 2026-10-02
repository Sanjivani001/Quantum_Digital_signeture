from __future__ import annotations

from app.config import SIG_THRESHOLD
from app.quantum_engine.quantum_signature_engine import QuantumSignatureEngine
from app.services.storage_service import StorageService


class VerificationService:
    def __init__(self, storage: StorageService | None = None):
        self.storage = storage or StorageService()
        self.engine = QuantumSignatureEngine()

    def verify_message(
        self,
        message: str,
        signature_id: str | None = None,
        signature_data: dict | None = None,
    ) -> dict:
        if not message or not message.strip():
            raise ValueError('Message cannot be empty.')

        if signature_id is None and signature_data is None:
            raise ValueError('A signature ID or signature payload is required.')

        signature_record = None
        if signature_id:
            signature_record = self.storage.get_signature(signature_id)
            if signature_record is None:
                return {
                    'valid': False,
                    'verification_score': 0.0,
                    'threshold': SIG_THRESHOLD,
                    'message_integrity': False,
                    'reason': 'The signature ID does not exist or is invalid.',
                }
        elif signature_data:
            signature_record = signature_data

        if signature_record is None:
            return {
                'valid': False,
                'verification_score': 0.0,
                'threshold': SIG_THRESHOLD,
                'message_integrity': False,
                'reason': 'The signature data is missing or malformed.',
            }

        stored_hash = signature_record.get('message_hash')
        current_hash = self.engine.hash_message(message)

        if current_hash != stored_hash:
            return {
                'valid': False,
                'verification_score': 0.0,
                'threshold': SIG_THRESHOLD,
                'message_integrity': False,
                'reason': 'The received message does not match the message associated with this signature.',
            }

        stored_counts = signature_record.get('quantum_metadata', {}).get('measurement_counts', {})
        actual_counts = self.engine.build_state_from_hash(current_hash)[1].get('measurement_counts', {})

        all_outcomes = sorted(set(stored_counts) | set(actual_counts))
        if not all_outcomes:
            score = 1.0
        else:
            outcome_scores = []
            for outcome in all_outcomes:
                expected = stored_counts.get(outcome, 0)
                actual = actual_counts.get(outcome, 0)
                similarity = 1.0 - abs(expected - actual) / max(1, expected + actual)
                outcome_scores.append(max(0.0, min(1.0, similarity)))
            score = sum(outcome_scores) / len(outcome_scores)

        final_valid = score >= SIG_THRESHOLD
        return {
            'valid': final_valid,
            'verification_score': round(score, 4),
            'threshold': SIG_THRESHOLD,
            'message_integrity': final_valid,
            'reason': 'The received message is consistent with the stored signature.' if final_valid else 'The received message does not match the message associated with this signature.',
        }
