import http.client, urllib.parse  
conn=http.client.HTTPConnection('127.0.0.1',8000)  
body=urllib.parse.urlencode({'grant_type':'password','username':'test@example.com','password':'test123'})  
conn.request('POST','/auth/login',body,{'Content-Type':'application/x-www-form-urlencoded'})  
r=conn.getresponse()  
print(r.status)  
print(r.read().decode())  
