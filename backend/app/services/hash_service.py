from __future__ import annotations

import hashlib


class HashService:
    @staticmethod
    def normalize_message(message: str) -> str:
        return ' '.join(message.strip().split())

    @staticmethod
    def sha256_hex(message: str) -> str:
        normalized = HashService.normalize_message(message)
        return hashlib.sha256(normalized.encode('utf-8')).hexdigest()
