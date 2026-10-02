from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any

from app.config import DB_PATH


class StorageService:
    def __init__(self, db_path: str | Path | None = None):
        self.db_path = Path(db_path) if db_path is not None else Path(DB_PATH)
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._initialize_db()

    def _initialize_db(self) -> None:
        with sqlite3.connect(self.db_path) as connection:
            connection.execute(
                '''
                CREATE TABLE IF NOT EXISTS signatures (
                    signature_id TEXT PRIMARY KEY,
                    message_hash TEXT NOT NULL,
                    signature_metadata TEXT NOT NULL,
                    quantum_metadata TEXT NOT NULL,
                    creation_timestamp TEXT NOT NULL,
                    protocol_version TEXT NOT NULL
                )
                '''
            )
            connection.commit()

    def save_signature(self, payload: dict[str, Any]) -> dict[str, Any]:
        with sqlite3.connect(self.db_path) as connection:
            connection.execute(
                '''
                INSERT INTO signatures (
                    signature_id,
                    message_hash,
                    signature_metadata,
                    quantum_metadata,
                    creation_timestamp,
                    protocol_version
                ) VALUES (?, ?, ?, ?, ?, ?)
                ''',
                (
                    payload['signature_id'],
                    payload['message_hash'],
                    json.dumps(payload['signature_metadata'], separators=(',', ':')),
                    json.dumps(payload['quantum_metadata'], separators=(',', ':')),
                    payload['creation_timestamp'],
                    payload['protocol_version'],
                ),
            )
            connection.commit()
        return payload

    def get_signature(self, signature_id: str) -> dict[str, Any] | None:
        with sqlite3.connect(self.db_path) as connection:
            row = connection.execute(
                'SELECT signature_id, message_hash, signature_metadata, quantum_metadata, creation_timestamp, protocol_version FROM signatures WHERE signature_id = ?',
                (signature_id,),
            ).fetchone()
        if row is None:
            return None
        return {
            'signature_id': row[0],
            'message_hash': row[1],
            'signature_metadata': json.loads(row[2]),
            'quantum_metadata': json.loads(row[3]),
            'creation_timestamp': row[4],
            'protocol_version': row[5],
        }
