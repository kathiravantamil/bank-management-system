package com.kathiravan.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String accountNumber;

    private String accountHolderName;

    private String accountType;

    private Double balance;
}
