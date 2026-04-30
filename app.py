from __future__ import annotations

import sqlite3
from datetime import datetime
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request, send_from_directory

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "santana.db"

app = Flask(__name__)


def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = get_db()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            phone TEXT NOT NULL,
            service TEXT NOT NULL,
            vehicle TEXT,
            scheduled_at TEXT,
            notes TEXT,
            status TEXT NOT NULL DEFAULT 'pendente',
            created_at TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()


@app.route("/")
def home() -> Any:
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/assets/<path:filename>")
def assets(filename: str) -> Any:
    return send_from_directory(BASE_DIR / "assets", filename)


@app.post("/api/agendamentos")
def create_appointment() -> Any:
    payload = request.get_json(silent=True) or {}
    required_fields = ["nome", "telefone", "servico"]
    missing = [field for field in required_fields if not str(payload.get(field, "")).strip()]

    if missing:
        return jsonify({"erro": f"Campos obrigatórios ausentes: {', '.join(missing)}"}), 400

    created_at = datetime.utcnow().isoformat(timespec="seconds") + "Z"
    scheduled_raw = str(payload.get("data_hora", "")).strip()
    scheduled_at = None

    if scheduled_raw:
        try:
            # formato do input datetime-local: YYYY-MM-DDTHH:MM
            scheduled_at = datetime.fromisoformat(scheduled_raw).isoformat(timespec="minutes")
        except ValueError:
            return jsonify({"erro": "Formato de data inválido."}), 400

    conn = get_db()
    cursor = conn.execute(
        """
        INSERT INTO appointments (
            customer_name, phone, service, vehicle, scheduled_at, notes, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            str(payload["nome"]).strip(),
            str(payload["telefone"]).strip(),
            str(payload["servico"]).strip(),
            str(payload.get("veiculo", "")).strip() or None,
            scheduled_at,
            str(payload.get("obs", "")).strip() or None,
            created_at,
        ),
    )
    conn.commit()
    appointment_id = cursor.lastrowid
    conn.close()

    return jsonify({"ok": True, "id": appointment_id, "criado_em": created_at}), 201


@app.get("/api/agendamentos")
def list_appointments() -> Any:
    conn = get_db()
    rows = conn.execute(
        """
        SELECT id, customer_name, phone, service, vehicle, scheduled_at, notes, status, created_at
        FROM appointments
        ORDER BY id DESC
        LIMIT 100
        """
    ).fetchall()
    conn.close()

    items = [dict(row) for row in rows]
    return jsonify(items)


if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
