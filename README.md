## Getting Started (Please set mockup API and run first)
https://fe-balerion.vercel.app/auth/login

User Test Login 2 users, 2 roles
```
- user: admin
- pass: 1234

- user: user
- pass: 1234
```

## Run in Local

First, Setting the mock API like Tweak Extention
- http://localhost:3001/api/v1/login/admin
response is:
```
{
  "status": 200,
  "response": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4xIiwiZW1haWwiOiJhZG1pbi5lbWFpbEBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifQ.91VaQcMDdRWOj849ddLZO7pR_qjl_DpHdaaYCYfakkg"
  }
}
```

- http://localhost:3001/api/v1/login/user
response is:
```
{
  "status": 200,
  "response": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjEiLCJlbWFpbCI6InVzZXIuZW1haWxAZ21haWwuY29tIiwicm9sZSI6IlVTRVIifQ.IgQln56kjBGc66IAjRMjeJtscM2u--Uz5Ul01r1f874"
  }
}
```

Second, run the development server:

```
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


