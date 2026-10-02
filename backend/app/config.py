from __future__ import annotations

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = Path(os.getenv('QSF_DB_PATH', BASE_DIR / 'qsf.db'))
PROTOCOL_VERSION = 'QSF-v0.1-simulator'
SIG_THRESHOLD = 0.90
