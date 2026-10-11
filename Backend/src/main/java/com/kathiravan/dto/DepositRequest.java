package com.kathiravan.dto;
import com.kathiravan.dto.DepositRequest;
import lombok.Data;

@Data
public class DepositRequest {

    private String accountNumber;
    private Double amount;
}