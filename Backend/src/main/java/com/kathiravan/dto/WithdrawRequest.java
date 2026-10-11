package com.kathiravan.dto;
import com.kathiravan.dto.WithdrawRequest;
import lombok.Data;

@Data
public class WithdrawRequest {

    private String accountNumber;
    private Double amount;
}