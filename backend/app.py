from fastapi import FastAPI, HTTPException
from backend.constants import APP_NAME
app = FastAPI()

@app.get("/")
async def app_init():
    return {"response": f"{APP_NAME} Backend Running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000, debug=True)