package com.dany2005m.imageClassifier.demo.controller;


import com.dany2005m.imageClassifier.demo.dto.ImageEvaluationResponse;
import com.dany2005m.imageClassifier.demo.service.MlEvaluationService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/culler")
@CrossOrigin(origins = "http://localhost:4200")
public class ImageCullerController {

    private final MlEvaluationService evaluationService;

    public ImageCullerController(MlEvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    @PostMapping(value = "/evaluate-batch", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<ImageEvaluationResponse>> evaluateBatch(
            @RequestParam("files") List<MultipartFile> files) {

        List<ImageEvaluationResponse> results = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                ImageEvaluationResponse response = evaluationService.evaluateSingleImage(file);
                results.add(response);
            } catch (IOException e) {
                System.err.println("Failed to process file: " + file.getOriginalFilename());
            }
        }

        return ResponseEntity.ok(results);
    }
}
