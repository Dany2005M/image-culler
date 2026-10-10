import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile
from ultralytics import YOLO

app = FastAPI()

model = YOLO("yolov8n.pt")


def get_subject_sharpness(image_bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    results = model(img, verbose=False)
    boxes = results[0].boxes.xyxy

    max_sharpness = 0.0

    if len(boxes) == 0:
        h, w = gray.shape
        center_crop = gray[int(h * .25):int(h * .75), int(w * .25):int(w * .75)]
        return float(cv2.Laplacian(center_crop, cv2.CV_64F).var())

    for box in boxes:
        x1, y1, x2, y2 = map(int, box)

        subject_crop = gray[y1:y2, x1:x2]

        scale = 500.0 / max(subject_crop.shape)
        if scale < 1.0:
            width = int(subject_crop.shape[1] * scale)
            height = int(subject_crop.shape[0] * scale)
            subject_crop = cv2.resize(subject_crop, (width, height), interpolation=cv2.INTER_AREA)

        blurred_crop = cv2.GaussianBlur(subject_crop, (3, 3), 0)

        sharpness = cv2.Laplacian(blurred_crop, cv2.CV_64F).var()

        if sharpness > max_sharpness:
            max_sharpness = sharpness

    return float(max_sharpness)


@app.post("/evaluate/")
async def evaluate_image(file: UploadFile = File(...)):
    contents = await file.read()

    subject_score = get_subject_sharpness(contents)

    is_keeper = bool(subject_score > 150.0)

    return {
        "filename": file.filename,
        "sharpnessScore": subject_score,
        "keeper": is_keeper
    }
