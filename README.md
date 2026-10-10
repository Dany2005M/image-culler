# AI Image Culler

A full-stack AI-powered photography utility designed to automatically cull motion-blurred and out-of-focus images from high-resolution batches. 

Built for dedicated camera workflows (DSLR/Mirrorless), the application uses an AI object-detection pipeline to isolate subjects and evaluate true optical micro-contrast while rejecting ISO grain and sensor noise.

## 🚀 Architecture & Tech Stack

The application is built on a microservices-inspired architecture:

*   **Frontend:** Angular 18+ (TypeScript, Signals, SCSS)
*   **Backend Gateway:** Java Spring Boot (REST API, PostgreSQL)
*   **AI Engine:** Python (FastAPI, YOLOv8, OpenCV, NumPy)

## ✨ Key Features

*   **Reactive Drag-and-Drop UI:** Built with modern Angular Signals to handle asynchronous batch processing without ChangeDetection rendering blocks.
*   **Subject-Isolated Evaluation:** Integrates YOLOv8 object detection to crop subjects dynamically, ensuring the algorithm evaluates the focus of the subject rather than background textures.
*   **Laplacian of Gaussian (LoG) Algorithm:** Utilizes a custom OpenCV pipeline that normalizes image resolution to 500px and applies a 3x3 Gaussian Blur to destroy ISO grain before calculating Laplacian variance.
*   **Hardware-Calibrated Thresholding:** Evaluates optical sharpness against a strict `150.0` variance threshold, calibrated specifically to separate genuine focus from soft edges in large-sensor photography.

## ⚙️ How It Works

1. The user drops a batch of JPEG files into the Angular interface.
2. The Angular client transmits the batch to the Spring Boot REST gateway.
3. Spring Boot routes the payload to the Python FastAPI microservice.
4. Python executes YOLOv8 inference, processes the isolated crops via the LoG algorithm, and assigns a binary Keeper/Reject status.
5. The JSON array is returned through the Java gateway to the frontend, instantly rendering a color-coded gallery grid.
