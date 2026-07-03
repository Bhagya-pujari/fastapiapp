import importlib
m = importlib.import_module('backend.app.main')
app = getattr(m, 'app')
for r in app.routes:
    methods = getattr(r, 'methods', None)
    print(r.path, methods)
