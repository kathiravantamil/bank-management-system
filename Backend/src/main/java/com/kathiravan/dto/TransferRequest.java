package com.kathiravan.dto;
import com.kathiravan.dto.TransferRequest;
import lombok.Data;

@Data
public class TransferRequest {

    private String fromAccount;
    private String toAccount;
    private Double amount;
}