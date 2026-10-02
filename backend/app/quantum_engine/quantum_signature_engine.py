from __future__ import annotations

import hashlib
from datetime import datetime, timezone
from typing import Any

from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

from app.config import PROTOCOL_VERSION

# This implementation is a research/educational prototype demonstrating
# quantum-inspired/quantum-state-based signature processing. It is not a
# substitute for a formally specified and security-proven QDS protocol.


class QuantumSignatureEngine:
    def __init__(self, shots: int = 1024, seed: int = 12345):
        self.shots = shots
        self.seed = seed

    @staticmethod
    def normalize_message(message: str) -> str:
        return ' '.join(message.strip().split())

    @staticmethod
    def hash_message(message: str) -> str:
        normalized = QuantumSignatureEngine.normalize_message(message)
        return hashlib.sha256(normalized.encode('utf-8')).hexdigest()

    def build_state_from_hash(self, message_hash: str) -> tuple[QuantumCircuit, dict[str, Any]]:
        bit_values = [int(digit, 16) for digit in message_hash[:8]]
        qubits = 2
        circuit = QuantumCircuit(qubits, qubits)

        if bit_values[0] % 2 == 0:
            circuit.x(0)
        if bit_values[1] % 2 == 0:
            circuit.h(1)
        if bit_values[2] % 2 == 0:
            circuit.x(1)
        if bit_values[3] % 2 == 0:
            circuit.h(0)
        if bit_values[4] % 2 == 0:
            circuit.cx(0, 1)
        if bit_values[5] % 2 == 0:
            circuit.z(0)
        if bit_values[6] % 2 == 0:
            circuit.h(0)
        if bit_values[7] % 2 == 0:
            circuit.h(1)

        circuit.measure_all()
        simulator = AerSimulator(seed_simulator=self.seed)
        result = simulator.run(circuit, shots=self.shots).result()
        counts = result.get_counts()
        probability_statistics = {
            outcome: count / self.shots for outcome, count in sorted(counts.items())
        }
        return circuit, {
            'measurement_counts': counts,
            'probability_statistics': probability_statistics,
            'state_summary': '2-qubit prototype state prepared from a deterministic SHA-256-derived bit pattern',
            'circuit_summary': 'Hash-derived basis rotations and entanglement check using a simulator',
        }

    def generate_signature(self, message: str) -> dict[str, Any]:
        message_hash = self.hash_message(message)
        circuit, quantum_state = self.build_state_from_hash(message_hash)
        signature_id = f"QSF-{message_hash[:16]}-{int(datetime.now(timezone.utc).timestamp() * 1000)}"
        return {
            'signature_id': signature_id,
            'message_hash': message_hash,
            'quantum_state_description': quantum_state['state_summary'],
            'circuit_information': {
                'qubits': circuit.num_qubits,
                'classical_bits': circuit.num_clbits,
                'gates': [instruction.operation.name for instruction in circuit.data],
                'depth': circuit.depth(),
                'simulator': 'qiskit_aer.AerSimulator',
            },
            'measurement_counts': quantum_state['measurement_counts'],
            'probability_statistics': quantum_state['probability_statistics'],
            'creation_timestamp': datetime.now(timezone.utc).isoformat(),
            'protocol_version': PROTOCOL_VERSION,
            'signature_metadata': {
                'message_length': len(self.normalize_message(message)),
                'hash_algorithm': 'SHA-256',
                'verification_mode': 'simulation_metric',
            },
            'quantum_metadata': {
                'state_description': quantum_state['state_summary'],
                'circuit_summary': quantum_state['circuit_summary'],
                'measurement_counts': quantum_state['measurement_counts'],
                'probability_statistics': quantum_state['probability_statistics'],
                'shots': self.shots,
                'seed': self.seed,
            },
        }
