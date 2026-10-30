"""Backend API tests for GROOM2B contact leads"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://web-revamp-88--2jlvexc5.preview.emergentagent.com').rstrip('/')


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
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["occasion"] == payload["occasion"]
        assert "id" in data and len(data["id"]) > 0
        assert "created_at" in data

        # GET list - verify persistence
        rl = api_client.get(f"{BASE_URL}/api/contact")
        assert rl.status_code == 200
        leads = rl.json()
        assert any(l["id"] == data["id"] for l in leads)

    def test_create_contact_invalid_email(self, api_client):
        payload = {
            "name": "TEST_Bad",
            "email": "not-an-email",
            "phone": "+919876543210",
            "occasion": "Wedding",
            "message": "x"
        }
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_missing_fields(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact", json={"name": "x"})
        assert r.status_code == 422

    def test_create_contact_short_name(self, api_client):
        payload = {
            "name": "A",
            "email": "a@b.com",
            "phone": "+919876543210",
        }
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422

    def test_list_contact(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200
        assert isinstance(r.json(), list)
