"""Backend API tests for GROOM2B contact leads and bookings"""
import os
import pytest
import requests
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[2] / 'frontend' / '.env')
BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/')


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestContactLeads:
    def test_root(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/")
        assert r.status_code == 200

    def test_create_contact_valid(self, api_client):
        payload = {
            "name": "TEST_Rohan",
            "email": "test_rohan@example.com",
            "phone": "+919876543210",
            "occasion": "Wedding",
            "message": "Looking for sherwani"
        }
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert "id" in data

        rl = api_client.get(f"{BASE_URL}/api/contact")
        assert rl.status_code == 200
        assert any(l["id"] == data["id"] for l in rl.json())

    def test_create_contact_invalid_email(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Bad", "email": "not-an-email",
            "phone": "+919876543210", "occasion": "Wedding", "message": "x"
        })
        assert r.status_code == 422

    def test_create_contact_missing_fields(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact", json={"name": "x"})
        assert r.status_code == 422


# ------------------- Bookings -------------------

VALID_BOOKING = {
    "occasion": "Wedding",
    "outfits": ["Sherwani"],
    "mode": "Video call",
    "date": "2026-02-15",
    "time": "11:00 AM",
    "name": "TEST_Groom",
    "phone": "+919876543210",
    "email": "test_groom@example.com",
    "notes": "TEST booking",
    "interest": "Namam Sherwani",
}


class TestBookings:
    def test_create_booking_valid(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/bookings", json=VALID_BOOKING)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["occasion"] == "Wedding"
        assert data["outfits"] == ["Sherwani"]
        assert data["email"] == VALID_BOOKING["email"]
        assert "id" in data and len(data["id"]) > 0
        assert "_id" not in data

    def test_create_booking_null_email_ok(self, api_client):
        payload = {**VALID_BOOKING, "email": None, "name": "TEST_NoEmail"}
        r = api_client.post(f"{BASE_URL}/api/bookings", json=payload)
        assert r.status_code == 201, r.text
        assert r.json()["email"] is None

    def test_create_booking_missing_fields(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/bookings", json={"occasion": "Wedding"})
        assert r.status_code == 422

    def test_create_booking_bad_date(self, api_client):
        payload = {**VALID_BOOKING, "date": "15-02-2026"}
        r = api_client.post(f"{BASE_URL}/api/bookings", json=payload)
        assert r.status_code == 422

    def test_create_booking_bad_email(self, api_client):
        payload = {**VALID_BOOKING, "email": "not-email"}
        r = api_client.post(f"{BASE_URL}/api/bookings", json=payload)
        assert r.status_code == 422

    def test_list_bookings_newest_first_no_underscore_id(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/bookings")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        if len(data) >= 2:
            # newest first (ISO string sort works)
            for i in range(len(data) - 1):
                assert data[i]["created_at"] >= data[i + 1]["created_at"]
        for d in data:
            assert "_id" not in d
