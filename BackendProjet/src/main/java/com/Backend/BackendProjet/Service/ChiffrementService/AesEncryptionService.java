package com.Backend.BackendProjet.Service.ChiffrementService;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Service
public class AesEncryptionService {
    private final SecretKey secretKey;
    private static final String KEY_FILE = "aes_key.dat"; // Fichier pour stocker la clé

    public AesEncryptionService() {
        this.secretKey = loadOrGenerateKey();
    }

    // Charger une clé existante ou en générer une nouvelle si elle n'existe pas
    private SecretKey loadOrGenerateKey() {
        File file = new File(KEY_FILE);
        try {
            if (file.exists()) {
                // Charger la clé depuis le fichier
                byte[] keyBytes = Files.readAllBytes(Paths.get(KEY_FILE));
                return new SecretKeySpec(keyBytes, "AES");
            } else {
                // Générer une nouvelle clé et la sauvegarder
                SecretKey newKey = generateKey();
                saveKeyToFile(newKey);
                return newKey;
            }
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors du chargement ou de la génération de la clé", e);
        }
    }

    // Générer une clé AES (256 bits)
    private SecretKey generateKey() {
        try {
            KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
            keyGenerator.init(256); // 256 bits
            return keyGenerator.generateKey();
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la génération de la clé AES", e);
        }
    }

    // Sauvegarder la clé dans un fichier
    private void saveKeyToFile(SecretKey key) throws IOException {
        byte[] keyBytes = key.getEncoded();
        Files.write(Paths.get(KEY_FILE), keyBytes);
    }

    // Chiffrement d'un texte avec AES
    public String encrypt(String data) {
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedBytes = cipher.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors du chiffrement", e);
        }
    }

    // Déchiffrement d'un texte avec AES
    public String decrypt(String encryptedData) {
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
            return new String(decryptedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors du déchiffrement", e);
        }
    }

}
