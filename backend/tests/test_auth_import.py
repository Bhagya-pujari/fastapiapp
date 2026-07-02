from routers.auth import router


def test_auth_router_imports():
    assert router is not None
