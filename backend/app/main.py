from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.config import PROTOCOL_VERSION
from app.models.signature import SignRequest, VerifyRequest
from app.services.signature_service import SignatureService
from app.verification.verification_service import VerificationService

app = FastAPI(
    title='Quantum Signature Framework API',
    version=PROTOCOL_VERSION,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

signature_service = SignatureService()
verification_service = VerificationService()


@app.get('/api/health')
def health() -> dict[str, str]:
    return {'status': 'ok'}


@app.post('/api/sign')
def sign(payload: SignRequest) -> dict:
    try:
        return signature_service.sign_message(payload.message)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:  # pragma: no cover - safety net for unexpected runtime issues
        raise HTTPException(status_code=500, detail=f'Failed to generate signature: {exc}') from exc


@app.post('/api/verify')
def verify(payload: VerifyRequest) -> dict:
    try:
        return verification_service.verify_message(
            payload.message,
            payload.signature_id,
            payload.signature_data,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:  # pragma: no cover - safety net for unexpected runtime issues
        raise HTTPException(status_code=500, detail=f'Verification failed: {exc}') from exc


@app.get('/api/signature/{signature_id}')
def get_signature(signature_id: str) -> dict:
    record = signature_service.get_signature(signature_id)
    if record is None:
        raise HTTPException(status_code=404, detail='Signature not found.')
    return record
