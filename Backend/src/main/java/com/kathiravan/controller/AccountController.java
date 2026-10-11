package com.kathiravan.controller;
import java.util.List;
import com.kathiravan.entity.Transaction;
import com.kathiravan.dto.DepositRequest;
import com.kathiravan.dto.TransferRequest;
import com.kathiravan.dto.WithdrawRequest;
import com.kathiravan.entity.Account;
import com.kathiravan.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/create")
    public Account createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }
@GetMapping
public List<Account> getAllAccounts() {
    return accountService.getAllAccounts();
}

    @GetMapping("/{accountNumber}")
    public Account getAccount(@PathVariable String accountNumber) {
        return accountService.getAccount(accountNumber);
    }
    @PostMapping("/deposit")
public Account deposit(@RequestBody DepositRequest request) {

    return accountService.deposit(
            request.getAccountNumber(),
            request.getAmount()
    );
}
@PostMapping("/withdraw")
public Account withdraw(@RequestBody WithdrawRequest request) {

    return accountService.withdraw(
            request.getAccountNumber(),
            request.getAmount()
    );
}
@PostMapping("/transfer")
public String transfer(@RequestBody TransferRequest request) {

    return accountService.transfer(
            request.getFromAccount(),
            request.getToAccount(),
            request.getAmount()
    );
}
@GetMapping("/{accountNumber}/transactions")
public List<Transaction> getTransactionHistory(
        @PathVariable String accountNumber) {

    return accountService
            .getTransactionHistory(accountNumber);
}
}