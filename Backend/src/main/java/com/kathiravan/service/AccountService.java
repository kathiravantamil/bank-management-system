
package com.kathiravan.service;
import com.kathiravan.entity.Account;
import com.kathiravan.entity.Transaction;
import com.kathiravan.repository.AccountRepository;
import com.kathiravan.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    // Create a new account
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    // Get all accounts
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    // Get account by account number
    public Account getAccount(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new RuntimeException("Account Not Found"));
    }

    // Save transaction history
    private void saveTransaction(
            String accountNumber,
            String transactionType,
            Double amount) {

        Transaction transaction = new Transaction();

        transaction.setAccountNumber(accountNumber);
        transaction.setTransactionType(transactionType);
        transaction.setAmount(amount);
        transaction.setTransactionDate(LocalDateTime.now());

        transactionRepository.save(transaction);
    }

    // Deposit money
    @Transactional
    public Account deposit(String accountNumber, Double amount) {

        validateAmount(amount);

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new RuntimeException("Account Not Found"));

        account.setBalance(account.getBalance() + amount);

        Account savedAccount = accountRepository.save(account);

        saveTransaction(accountNumber, "DEPOSIT", amount);

        return savedAccount;
    }

    // Withdraw money
    @Transactional
    public Account withdraw(String accountNumber, Double amount) {

        validateAmount(amount);

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new RuntimeException("Account Not Found"));

        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient Balance");
        }

        account.setBalance(account.getBalance() - amount);

        Account savedAccount = accountRepository.save(account);

        saveTransaction(accountNumber, "WITHDRAWAL", amount);

        return savedAccount;
    }

    // Transfer money between accounts
    @Transactional
    public String transfer(
            String fromAccount,
            String toAccount,
            Double amount) {

        validateAmount(amount);

        if (fromAccount == null || toAccount == null
                || fromAccount.equals(toAccount)) {
            throw new IllegalArgumentException(
                    "Sender and receiver accounts must be different");
        }

        Account sender = accountRepository
                .findByAccountNumber(fromAccount)
                .orElseThrow(() ->
                        new RuntimeException("Sender Account Not Found"));

        Account receiver = accountRepository
                .findByAccountNumber(toAccount)
                .orElseThrow(() ->
                        new RuntimeException("Receiver Account Not Found"));

        if (sender.getBalance() < amount) {
            throw new RuntimeException("Insufficient Balance");
        }

        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        accountRepository.save(sender);
        accountRepository.save(receiver);

        // Record both sides of the transfer
        saveTransaction(fromAccount, "TRANSFER_DEBIT", amount);
        saveTransaction(toAccount, "TRANSFER_CREDIT", amount);

        return "Transfer Successful";
    }

    // Get transaction history for an account
    public List<Transaction> getTransactionHistory(
            String accountNumber) {

        return transactionRepository
                .findByAccountNumber(accountNumber);
    }

    // Validate transaction amount
    private void validateAmount(Double amount) {
        if (amount == null
                || !Double.isFinite(amount)
                || amount <= 0) {

            throw new IllegalArgumentException(
                    "Amount must be greater than zero");
        }
    }
}
