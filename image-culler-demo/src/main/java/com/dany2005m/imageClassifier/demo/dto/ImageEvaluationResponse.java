package com.dany2005m.imageClassifier.demo.dto;

public record ImageEvaluationResponse(
        String filename,
        double sharpnessScore,
        boolean keeper
) {}

