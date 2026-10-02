from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get('/api/health')
    assert response.status_code == 200
    assert response.json()['status'] == 'ok'


def test_signature_generation_response_shape():
    response = client.post('/api/sign', json={'message': 'Hello, this is my quantum signature.'})
    assert response.status_code == 200
    payload = response.json()
    assert payload['signature_id']
    assert payload['message_hash']
    assert payload['quantum_signature']['state_description']
    assert payload['quantum_signature']['measurement_counts']
    assert payload['quantum_signature']['probabilities']
    assert payload['protocol_version']
    assert payload['created_at']


def test_sign_and_verify_round_trip():
    message = 'Hello, this is my quantum signature.'
    sign_response = client.post('/api/sign', json={'message': message})
    assert sign_response.status_code == 200
    payload = sign_response.json()

    verify_response = client.post('/api/verify', json={
        'message': message,
        'signature_id': payload['signature_id'],
    })
    assert verify_response.status_code == 200
    verify_payload = verify_response.json()
    assert verify_payload['valid'] is True
    assert verify_payload['verification_score'] >= 0.9
    assert verify_payload['message_integrity'] is True
    assert 'consistent with the stored signature' in verify_payload['reason']


def test_tampering_detected():
    message = 'Transfer approved for ₹10,000'
    sign_response = client.post('/api/sign', json={'message': message})
    assert sign_response.status_code == 200
    signature_id = sign_response.json()['signature_id']

    tampered = client.post('/api/verify', json={
        'message': 'Transfer approved for ₹50,000',
        'signature_id': signature_id,
    })
    assert tampered.status_code == 200
    payload = tampered.json()
    assert payload['valid'] is False
    assert payload['message_integrity'] is False
    assert 'does not match' in payload['reason']


def test_invalid_signature_id_rejected():
    response = client.post('/api/verify', json={
        'message': 'Hello, this is my quantum signature.',
        'signature_id': 'missing-signature-id',
    })
    assert response.status_code == 200
    payload = response.json()
    assert payload['valid'] is False
    assert payload['message_integrity'] is False
    assert 'invalid' in payload['reason'] or 'does not exist' in payload['reason']


def test_empty_message_is_rejected():
    response = client.post('/api/sign', json={'message': ''})
    assert response.status_code in {400, 422}


def test_malformed_request_is_rejected():
    response = client.post('/api/sign', json={'message': 123})
    assert response.status_code in {400, 422}


def test_verify_requires_signature_reference():
    response = client.post('/api/verify', json={'message': 'Hello, this is my quantum signature.'})
    assert response.status_code in {400, 422}
