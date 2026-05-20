---
name: crypto-architecture-kit
description: Crypto Architecture Kit提供统一的加解密算法框架，屏蔽底层算法库差异，通过ArkTS和C/C++接口提供密钥生成与转换、对称/非对称加解密、签名验签、消息摘要与MAC计算、密钥协商、密钥派生和安全随机数生成能力。
---

## 功能说明

Crypto Architecture Kit（加解密算法框架服务）屏蔽了底层第三方密码学算法库的差异，为开发者提供统一的安全算法框架。该服务涵盖密钥生成与转换、对称/非对称加解密、签名验签、消息摘要计算、消息认证码计算、密钥协商、密钥派生、安全随机数生成等完整的密码学能力。开发者可通过ArkTS和C/C++两种接口进行开发，当前底层仅支持OpenSSL实现。

密钥生成与转换能力支持对称密钥（AES、SM4、3DES、DES、ChaCha20、HMAC）和非对称密钥对（RSA、ECC、DSA、DH、SM2、X25519、Ed25519）的随机生成、指定参数生成以及通过二进制数据、PEM格式字符串进行密钥转换。加解密能力支持多种对称算法（AES-GCM/CBC/ECB/CCM、SM4-GCM/CBC/ECB、3DES、DES-ECB、ChaCha20/Poly1305）和非对称算法（SM2、RSA-PKCS1/PKCS1_OAEP），以及大数据量的分段加解密和AES-WRAP密钥封装。

签名验签能力支持SM2、RSA（PKCS1和PSS模式）、ECDSA等算法的签名与验签操作，包括分段签名验签和签名恢复。消息摘要支持SHA-256、SHA3、MD5等算法，消息认证码支持HMAC和CMAC计算。密钥协商支持ECDH、DH、X25519算法，密钥派生支持PBKDF2、HKDF、SCRYPT、X963KDF算法。此外还提供安全随机数生成和基于硬件熵源的安全随机数生成能力。

该服务不支持多线程并发操作，提供的大部分常用算法中部分（如MD5）不适用于对安全要求较高的场景，请开发者根据实际需求选择合适的算法。加解密算法库框架仅提供密钥的密码学操作，不提供密钥管理功能，如需系统级密钥管理请使用Universal Keystore Kit。

## 使用场景

当你的应用需要对敏感数据进行加密存储或传输时使用加解密能力。典型场景包括用户密码加密存储、通信数据加密传输、文件加密保护等。根据数据量大小选择单次加解密或分段加解密，根据安全需求选择对称加解密（高效，适合大量数据）或非对称加解密（安全性高，适合密钥交换）。

当你的应用需要验证数据完整性或进行身份认证时使用签名验签和消息摘要能力。典型场景包括数字签名验证、数据防篡改检测、消息完整性校验等。当你的应用需要在通信双方之间安全地协商共享密钥时使用密钥协商能力，当需要从密码或共享秘密中派生出加密密钥时使用密钥派生能力。

## 典型场景

- 如何使用AES-GCM模式对数据进行对称加解密？
- 如何使用RSA非对称密钥进行数据加解密？
- 如何使用SM2国密算法进行签名验签？
- 如何使用SM4国密算法进行对称加解密？
- 如何计算SHA-256或MD5消息摘要？
- 如何使用HMAC或CMAC计算消息认证码？
- 如何通过ECDH或X25519进行密钥协商？
- 如何使用PBKDF2或HKDF进行密钥派生？
- 如何生成安全的随机数？
- 如何将PEM格式字符串转换为非对称密钥对？

## 使用指南

**重要提示：** 本Kit的references目录下包含大量详细参考文档（114个文件）。在查询时，请根据用户的具体问题，仅加载references中与问题相关的MD文件进行阅读，不要一次性加载所有文件，以免上下文过长影响回答质量。先通过标题和描述判断哪些文件与当前问题相关，再针对性地读取。

## 参考文档

### 简介与概述

- [Crypto Architecture Kit简介](references/Crypto%20Architecture%20Kit简介.md) - 加解密算法框架服务整体介绍，包括能力范围、约束限制和基本概念
- [加解密介绍](references/加解密介绍.md) - 对称密钥和非对称密钥加解密操作的整体说明
- [对称密钥加解密算法规格](references/对称密钥加解密算法规格.md) - 对称密钥加解密支持的算法和参数规格详细说明
- [非对称密钥加解密算法规格](references/非对称密钥加解密算法规格.md) - 非对称密钥加解密支持的算法和参数规格详细说明
- [分段加解密说明](references/分段加解密说明.md) - 大数据量分段加解密的使用说明和注意事项
- [跨平台数据兼容实践指导](references/跨平台数据兼容实践指导.md) - 跨平台数据兼容性的实践指导说明

### 密钥生成与转换

- [密钥生成与转换介绍](references/密钥生成与转换介绍.md) - 密钥生成和转换功能的整体介绍
- [对称密钥生成和转换规格](references/对称密钥生成和转换规格.md) - 对称密钥生成和转换的算法规格说明
- [非对称密钥生成和转换规格](references/非对称密钥生成和转换规格.md) - 非对称密钥生成和转换的算法规格说明
- [随机生成对称密钥(ArkTS)](references/随机生成对称密钥(ArkTS).md) - 使用ArkTS接口随机生成对称密钥
- [随机生成对称密钥(C/C++)](references/随机生成对称密钥(C_C++).md) - 使用C/C++接口随机生成对称密钥
- [随机生成非对称密钥对(ArkTS)](references/随机生成非对称密钥对(ArkTS).md) - 使用ArkTS接口随机生成非对称密钥对
- [随机生成非对称密钥对(C/C++)](references/随机生成非对称密钥对(C_C++).md) - 使用C/C++接口随机生成非对称密钥对
- [指定密钥参数生成非对称密钥对(ArkTS)](references/指定密钥参数生成非对称密钥对(ArkTS).md) - 使用密钥参数生成非对称密钥对（ArkTS接口）
- [指定密钥参数生成非对称密钥对(C/C++)](references/指定密钥参数生成非对称密钥对(C_C++).md) - 使用密钥参数生成非对称密钥对（C/C++接口）
- [指定二进制数据转换对称密钥(ArkTS)](references/指定二进制数据转换对称密钥(ArkTS).md) - 将二进制数据转换为对称密钥（ArkTS接口）
- [指定二进制数据转换对称密钥(C/C++)](references/指定二进制数据转换对称密钥(C_C++).md) - 将二进制数据转换为对称密钥（C/C++接口）
- [指定二进制数据转换非对称密钥对(ArkTS)](references/指定二进制数据转换非对称密钥对(ArkTS).md) - 将二进制数据转换为非对称密钥对（ArkTS接口）
- [指定二进制数据转换非对称密钥对(C/C++)](references/指定二进制数据转换非对称密钥对(C_C++).md) - 将二进制数据转换为非对称密钥对（C/C++接口）
- [指定PEM格式字符串数据转换非对称密钥对(ArkTS)](references/指定PEM格式字符串数据转换非对称密钥对(ArkTS).md) - 将PEM格式字符串转换为非对称密钥对（ArkTS接口）
- [指定PEM格式字符串数据转换非对称密钥对(C/C++)](references/指定PEM格式字符串数据转换非对称密钥对(C_C++).md) - 将PEM格式字符串转换为非对称密钥对（C/C++接口）
- [使用私钥对象获取公钥对象(ArkTS)](references/使用私钥对象获取公钥对象(ArkTS).md) - 从私钥对象中获取对应的公钥对象（ArkTS接口）
- [使用私钥对象获取公钥对象(C/C++)](references/使用私钥对象获取公钥对象(C_C++).md) - 从私钥对象中获取对应的公钥对象（C/C++接口）
- [使用RSA私钥进行编码解码(ArkTS)](references/使用RSA私钥进行编码解码(ArkTS).md) - RSA私钥编码与解码操作（ArkTS接口）
- [使用RSA私钥进行编码解码(C/C++)](references/使用RSA私钥进行编码解码(C_C++).md) - RSA私钥编码与解码操作（C/C++接口）
- [使用ECC压缩/非压缩点格式转换(ArkTS)](references/使用ECC压缩_非压缩点格式转换(ArkTS).md) - ECC椭圆曲线点格式压缩与非压缩转换（ArkTS接口）
- [使用ECC压缩/非压缩点格式转换(C/C++)](references/使用ECC压缩_非压缩点格式转换(C_C++).md) - ECC椭圆曲线点格式压缩与非压缩转换（C/C++接口）
- [使用ECC压缩/非压缩公钥格式转换(ArkTS)](references/使用ECC压缩_非压缩公钥格式转换(ArkTS).md) - ECC公钥压缩与非压缩格式转换（ArkTS接口）
- [使用ECC压缩/非压缩公钥格式转换(C/C++)](references/使用ECC压缩_非压缩公钥格式转换(C_C++).md) - ECC公钥压缩与非压缩格式转换（C/C++接口）

### 签名验签

- [签名验签介绍及算法规格](references/签名验签介绍及算法规格.md) - 签名验签算法介绍及支持的规格说明
- [使用SM2密钥对签名验签(ArkTS)](references/使用SM2密钥对签名验签(ArkTS).md) - SM2国密算法签名验签（ArkTS接口）
- [使用SM2密钥对签名验签(C/C++)](references/使用SM2密钥对签名验签%20(C_C++).md) - SM2国密算法签名验签（C/C++接口）
- [SM2签名数据格式转换(ArkTS)](references/SM2签名数据格式转换(ArkTS).md) - SM2签名数据格式转换（ArkTS接口）
- [SM2签名数据格式转换(C/C++)](references/SM2签名数据格式转换%20(C_C++).md) - SM2签名数据格式转换（C/C++接口）
- [使用RSA密钥对（PKCS1模式）签名验签(ArkTS)](references/使用RSA密钥对（PKCS1模式）签名验签(ArkTS).md) - RSA PKCS1模式签名验签（ArkTS接口）
- [使用RSA密钥对（PKCS1模式）签名验签(C/C++)](references/使用RSA密钥对签名验签%20(PKCS1模式)(C_C++).md) - RSA PKCS1模式签名验签（C/C++接口）
- [使用RSA密钥对（PKCS1模式）签名及签名恢复(ArkTS)](references/使用RSA密钥对（PKCS1模式）签名及签名恢复(ArkTS).md) - RSA PKCS1模式签名及签名恢复（ArkTS接口）
- [使用RSA密钥对（PKCS1模式）签名恢复(C/C++)](references/使用RSA密钥对（PKCS1模式）签名恢复(C_C++).md) - RSA PKCS1模式签名恢复（C/C++接口）
- [使用RSA密钥对签名验签（PSS模式）(ArkTS)](references/使用RSA密钥对签名验签（PSS模式）(ArkTS).md) - RSA PSS模式签名验签（ArkTS接口）
- [使用RSA密钥对签名验签（PSS模式）(C/C++)](references/使用RSA密钥对签名验签%20(PSS模式)(C_C++).md) - RSA PSS模式签名验签（C/C++接口）
- [使用RSA密钥对分段签名验签（PKCS1模式）(ArkTS)](references/使用RSA密钥对分段签名验签（PKCS1模式）(ArkTS).md) - RSA PKCS1模式分段签名验签（ArkTS接口）
- [使用RSA密钥对分段签名验签（PKCS1模式）(C/C++)](references/使用RSA密钥对分段签名验签%20(PKCS1模式)(C_C++).md) - RSA PKCS1模式分段签名验签（C/C++接口）
- [使用ECDSA密钥对签名验签(ArkTS)](references/使用ECDSA密钥对签名验签(ArkTS).md) - ECDSA椭圆曲线签名验签（ArkTS接口）
- [使用ECDSA密钥对签名验签(C/C++)](references/使用ECDSA密钥对签名验签%20(C_C++).md) - ECDSA椭圆曲线签名验签（C/C++接口）

### 消息摘要

- [消息摘要计算介绍及算法规格](references/消息摘要计算介绍及算法规格.md) - 消息摘要算法介绍及支持的规格说明
- [消息摘要计算SHA256(ArkTS)](references/消息摘要计算SHA256(ArkTS).md) - SHA-256摘要计算（ArkTS接口）
- [消息摘要计算SHA256(C/C++)](references/消息摘要计算SHA256(C_C++).md) - SHA-256摘要计算（C/C++接口）
- [消息摘要计算SHA3(ArkTS)](references/消息摘要计算SHA3(ArkTS).md) - SHA3摘要计算（ArkTS接口）
- [消息摘要计算SHA3-256(C/C++)](references/消息摘要计算SHA3-256(C_C++).md) - SHA3-256摘要计算（C/C++接口）
- [消息摘要计算MD5(ArkTS)](references/消息摘要计算MD5(ArkTS).md) - MD5摘要计算（ArkTS接口）
- [消息摘要计算MD5(C/C++)](references/消息摘要计算MD5(C_C++).md) - MD5摘要计算（C/C++接口）

### 消息认证码

- [消息认证码计算介绍及算法规格](references/消息认证码计算介绍及算法规格.md) - 消息认证码算法介绍及支持的规格说明
- [消息认证码计算HMAC(ArkTS)](references/消息认证码计算HMAC(ArkTS).md) - HMAC消息认证码计算（ArkTS接口）
- [消息认证码计算HMAC(C/C++)](references/消息认证码计算HMAC(C_C++).md) - HMAC消息认证码计算（C/C++接口）
- [消息认证码计算CMAC(ArkTS)](references/消息认证码计算CMAC(ArkTS).md) - CMAC消息认证码计算（ArkTS接口）
- [消息认证码计算CMAC(C/C++)](references/消息认证码计算CMAC(C_C++).md) - CMAC消息认证码计算（C/C++接口）

### 对称加解密

- [使用AES对称密钥（GCM模式）加解密(ArkTS)](references/使用AES对称密钥（GCM模式）加解密(ArkTS).md) - AES-GCM对称加解密（ArkTS接口）
- [使用AES对称密钥（GCM模式）加解密(C/C++)](references/使用AES对称密钥（GCM模式）加解密(C_C++).md) - AES-GCM对称加解密（C/C++接口）
- [使用AES对称密钥（GCM模式）分段加解密(ArkTS)](references/使用AES对称密钥（GCM模式）分段加解密(ArkTS).md) - AES-GCM分段加解密（ArkTS接口）
- [使用AES对称密钥（GCM模式）分段加解密(C/C++)](references/使用AES对称密钥（GCM模式）分段加解密(C_C++).md) - AES-GCM分段加解密（C/C++接口）
- [使用AES对称密钥（ECB模式）加解密(ArkTS)](references/使用AES对称密钥（ECB模式）加解密(ArkTS).md) - AES-ECB对称加解密（ArkTS接口）
- [使用AES对称密钥（ECB模式）加解密(C/C++)](references/使用AES对称密钥（ECB模式）加解密(C_C++).md) - AES-ECB对称加解密（C/C++接口）
- [使用AES对称密钥（CCM模式）加解密(ArkTS)](references/使用AES对称密钥（CCM模式）加解密(ArkTS).md) - AES-CCM对称加解密（ArkTS接口）
- [使用AES对称密钥（CCM模式）加解密(C/C++)](references/使用AES对称密钥（CCM模式）加解密(C_C++).md) - AES-CCM对称加解密（C/C++接口）
- [使用AES对称密钥（CBC模式）加解密(ArkTS)](references/使用AES对称密钥（CBC模式）加解密(ArkTS).md) - AES-CBC对称加解密（ArkTS接口）
- [使用AES对称密钥（CBC模式）加解密(C/C++)](references/使用AES对称密钥（CBC模式）加解密(C_C++).md) - AES-CBC对称加解密（C/C++接口）
- [使用AES-WRAP算法对对称密钥加解密(ArkTS)](references/使用AES-WRAP算法对对称密钥加解密(ArkTS).md) - AES-WRAP密钥封装加解密（ArkTS接口）
- [使用AES-WRAP算法对对称密钥加解密(C/C++)](references/使用AES-WRAP算法对对称密钥加解密(C_C++).md) - AES-WRAP密钥封装加解密（C/C++接口）
- [使用SM4对称密钥（GCM模式）加解密(ArkTS)](references/使用SM4对称密钥（GCM模式）加解密(ArkTS).md) - SM4-GCM国密对称加解密（ArkTS接口）
- [使用SM4对称密钥（GCM模式）加解密(C/C++)](references/使用SM4对称密钥（GCM模式）加解密(C_C++).md) - SM4-GCM国密对称加解密（C/C++接口）
- [使用SM4对称密钥（GCM模式）分段加解密(ArkTS)](references/使用SM4对称密钥（GCM模式）分段加解密(ArkTS).md) - SM4-GCM分段加解密（ArkTS接口）
- [使用SM4对称密钥（GCM模式）分段加解密(C/C++)](references/使用SM4对称密钥（GCM模式）分段加解密(C_C++).md) - SM4-GCM分段加解密（C/C++接口）
- [使用SM4对称密钥（ECB模式）加解密(ArkTS)](references/使用SM4对称密钥（ECB模式）加解密(ArkTS).md) - SM4-ECB国密对称加解密（ArkTS接口）
- [使用SM4对称密钥（ECB模式）加解密(C/C++)](references/使用SM4对称密钥（ECB模式）加解密(C_C++).md) - SM4-ECB国密对称加解密（C/C++接口）
- [使用SM4对称密钥（CBC模式）加解密(ArkTS)](references/使用SM4对称密钥（CBC模式）加解密(ArkTS).md) - SM4-CBC国密对称加解密（ArkTS接口）
- [使用SM4对称密钥（CBC模式）加解密(C/C++)](references/使用SM4对称密钥（CBC模式）加解密(C_C++).md) - SM4-CBC国密对称加解密（C/C++接口）
- [使用3DES对称密钥加解密(ArkTS)](references/使用3DES对称密钥加解密(ArkTS).md) - 3DES对称加解密（ArkTS接口）
- [使用3DES对称密钥加解密(C/C++)](references/使用3DES对称密钥加解密(C_C++).md) - 3DES对称加解密（C/C++接口）
- [使用DES对称密钥（ECB模式）加解密(ArkTS)](references/使用DES对称密钥（ECB模式）加解密(ArkTS).md) - DES-ECB对称加解密（ArkTS接口）
- [使用DES对称密钥（ECB模式）加解密(C/C++)](references/使用DES对称密钥（ECB模式）加解密(C_C++).md) - DES-ECB对称加解密（C/C++接口）
- [使用ChaCha20对称密钥（Poly1305模式）加解密(ArkTS)](references/使用ChaCha20对称密钥（Poly1305模式）加解密(ArkTS).md) - ChaCha20-Poly1305加解密（ArkTS接口）
- [使用ChaCha20对称密钥（Poly1305模式）加解密(C/C++)](references/使用ChaCha20对称密钥（Poly1305模式）加解密(C_C++).md) - ChaCha20-Poly1305加解密（C/C++接口）
- [使用ChaCha20对称密钥加解密(ArkTS)](references/使用ChaCha20对称密钥加解密(ArkTS).md) - ChaCha20对称加解密（ArkTS接口）
- [使用ChaCha20对称密钥加解密(C/C++)](references/使用ChaCha20对称密钥加解密(C_C++).md) - ChaCha20对称加解密（C/C++接口）

### 非对称加解密

- [使用SM2非对称密钥加解密(ArkTS)](references/使用SM2非对称密钥加解密(ArkTS).md) - SM2国密非对称加解密（ArkTS接口）
- [使用SM2非对称密钥加解密(C/C++)](references/使用SM2非对称密钥加解密(C_C++).md) - SM2国密非对称加解密（C/C++接口）
- [使用SM2密文格式转换(ArkTS)](references/使用SM2密文格式转换(ArkTS).md) - SM2密文格式转换（ArkTS接口）
- [使用SM2密文格式转换(C/C++)](references/使用SM2密文格式转换(C_C++).md) - SM2密文格式转换（C/C++接口）
- [使用RSA非对称密钥（PKCS1模式）加解密(ArkTS)](references/使用RSA非对称密钥（PKCS1模式）加解密(ArkTS).md) - RSA PKCS1模式非对称加解密（ArkTS接口）
- [使用RSA非对称密钥（PKCS1模式）加解密(C/C++)](references/使用RSA非对称密钥（PKCS1模式）加解密(C_C++).md) - RSA PKCS1模式非对称加解密（C/C++接口）
- [使用RSA非对称密钥（PKCS1_OAEP模式）加解密](references/使用RSA非对称密钥（PKCS1_OAEP模式）加解密.md) - RSA PKCS1_OAEP模式非对称加解密
- [使用RSA非对称密钥分段加解密(ArkTS)](references/使用RSA非对称密钥分段加解密(ArkTS).md) - RSA分段非对称加解密（ArkTS接口）
- [使用RSA非对称密钥分段加解密(C/C++)](references/使用RSA非对称密钥分段加解密(C_C++).md) - RSA分段非对称加解密（C/C++接口）

### 密钥协商

- [密钥协商介绍及算法规格](references/密钥协商介绍及算法规格.md) - 密钥协商算法（ECDH、DH、X25519）介绍及规格说明
- [使用ECDH进行密钥协商(ArkTS)](references/使用ECDH进行密钥协商(ArkTS).md) - ECDH密钥协商（ArkTS接口）
- [使用ECDH进行密钥协商(C/C++)](references/使用ECDH进行密钥协商(C_C++).md) - ECDH密钥协商（C/C++接口）
- [使用DH进行密钥协商(ArkTS)](references/使用DH进行密钥协商(ArkTS).md) - DH密钥协商（ArkTS接口）
- [使用DH进行密钥协商(C/C++)](references/使用DH进行密钥协商(C_C++).md) - DH密钥协商（C/C++接口）
- [使用X25519进行密钥协商(ArkTS)](references/使用X25519进行密钥协商(ArkTS).md) - X25519密钥协商（ArkTS接口）
- [使用X25519进行密钥协商(C/C++)](references/使用X25519进行密钥协商(C_C++).md) - X25519密钥协商（C/C++接口）

### 密钥派生

- [密钥派生介绍及算法规格](references/密钥派生介绍及算法规格.md) - 密钥派生算法（PBKDF2、HKDF、SCRYPT、X963KDF）介绍及规格说明
- [使用PBKDF2进行密钥派生(ArkTS)](references/使用PBKDF2进行密钥派生(ArkTS).md) - PBKDF2密钥派生（ArkTS接口）
- [使用PBKDF2进行密钥派生(C/C++)](references/使用PBKDF2进行密钥派生(C_C++).md) - PBKDF2密钥派生（C/C++接口）
- [使用HKDF进行密钥派生(ArkTS)](references/使用HKDF进行密钥派生(ArkTS).md) - HKDF密钥派生（ArkTS接口）
- [使用HKDF进行密钥派生(C/C++)](references/使用HKDF进行密钥派生(C_C++).md) - HKDF密钥派生（C/C++接口）
- [使用SCRYPT进行密钥派生(ArkTS)](references/使用SCRYPT进行密钥派生(ArkTS).md) - SCRYPT密钥派生（ArkTS接口）
- [使用SCRYPT进行密钥派生(C/C++)](references/使用SCRYPT进行密钥派生(C_C++).md) - SCRYPT密钥派生（C/C++接口）
- [使用X963KDF进行密钥派生(ArkTS)](references/使用X963KDF进行密钥派生(ArkTS).md) - X963KDF密钥派生（ArkTS接口）
- [使用X963KDF进行密钥派生(C/C++)](references/使用X963KDF进行密钥派生(C_C++).md) - X963KDF密钥派生（C/C++接口）

### 安全随机数

- [安全随机数生成(ArkTS)](references/安全随机数生成(ArkTS).md) - 安全随机数生成（ArkTS接口）
- [安全随机数生成(C/C++)](references/安全随机数生成(C_C++).md) - 安全随机数生成（C/C++接口）
- [使用硬件熵源生成安全随机数(ArkTS)](references/使用硬件熵源生成安全随机数(ArkTS).md) - 基于硬件熵源的安全随机数生成（ArkTS接口）
- [使用硬件熵源生成安全随机数(C/C++)](references/使用硬件熵源生成安全随机数(C_C++).md) - 基于硬件熵源的安全随机数生成（C/C++接口）

### 常见问题

- [AES解密失败返回17630001](references/AES解密失败返回17630001.md) - AES解密失败错误码17630001的排查与解决方法

<!-- verikit:references-index -->

## References / 参考文档索引

_Auto-generated by VeriKit from this Kit's reference manifest — `114` document(s) shipped under `references/`. Each link points at a real file in the plugin tree; load any with the agent's file-read tool._

- **AES解密失败返回17630001** — 开发者使用加解密算法库经常遇到对称算法解密报错17630001，下文将对其失败原因进行详细分析。 #### AES-GCM算法 **问题现象** AES解密时调用doFinal失败，返回错误码17630001，无法得到正确明文。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAl… [`references/AES解密失败返回17630001.md`](<references/AES解密失败返回17630001.md>)
- **Crypto Architecture Kit简介** — Crypto Architecture Kit屏蔽了第三方密码学算法库实现差异的算法框架，提供加解密、签名验签、消息认证码、哈希、安全随机数、密钥派生等相关功能。 开发者可以通过调用加解密算法框架服务，忽略底层不同第三方密码学算法库的差异，实现迅捷开发。 #### 约束与限制 - Crypto Architecture Kit不支持多线程并发操作。 - Cr… [`references/Crypto Architecture Kit简介.md`](<references/Crypto Architecture Kit简介.md>)
- **SM2签名数据格式转换 (C/C++)** — 当前支持DER格式与r、s格式互转的能力。 开发者可指定SM2密文的参数，将其转换成DER格式密文。反之，也可以从DER格式密文中提取出SM2的具体密文参数。 **指定密文参数，转换为DER格式** 1. 调用 OH_CryptoEccSignatureSpec_Create ，创建 OH_CryptoEccSignatureSpec 对象，用于设置SM2密… [`references/SM2签名数据格式转换 (C_C++).md`](<references/SM2签名数据格式转换 (C_C++).md>)
- **SM2签名数据格式转换(ArkTS)** — 当前支持DER格式与（r、s）格式互转的能力。 开发者可指定SM2签名数据，将其转换成DER格式密文。反之，也可以从DER格式密文中取出具体的SM2签名数据。 **指定密文参数，转换为DER格式** 1. 构造 EccSignatureSpec 对象，用于指定SM2密文参数。 2. 调用 genEccSignature ，将EccSignatureSpec对… [`references/SM2签名数据格式转换(ArkTS).md`](<references/SM2签名数据格式转换(ArkTS).md>)
- **使用3DES对称密钥加解密(ArkTS)** — 对应的算法规格请查看 对称密钥加解密算法规格：3DES 。 #### 开发步骤 **加密** 1. 调用 cryptoFramework.createSymKeyGenerator 和 SymKeyGenerator.convertKey ，生成密钥算法为3DES、密钥长度为192位的对称密钥（SymKey）。 如何生成3DES对称密钥，开发者可参考下文示例… [`references/使用3DES对称密钥加解密(ArkTS).md`](<references/使用3DES对称密钥加解密(ArkTS).md>)
- **使用3DES对称密钥加解密(C/C++)** — 对应的算法规格请查看 对称密钥加解密算法规格：3DES 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 **创建对象** 调用 OH_CryptoSymKeyGenerator_Create 、 OH_CryptoSymKeyGenera… [`references/使用3DES对称密钥加解密(C_C++).md`](<references/使用3DES对称密钥加解密(C_C++).md>)
- **使用AES-WRAP算法对对称密钥加解密(ArkTS)** — 从API version 22开始，算法库支持使用该算法进行加密和解密操作。 对应的算法规格请参见 AES-WRAP加解密算法规格 。 **加密** 1. 调用 cryptoFramework.createSymKeyGenerator 、 SymKeyGenerator.generateSymKey ，生成密钥算法为AES、密钥长度为128位的对称密钥（S… [`references/使用AES-WRAP算法对对称密钥加解密(ArkTS).md`](<references/使用AES-WRAP算法对对称密钥加解密(ArkTS).md>)
- **使用AES-WRAP算法对对称密钥加解密(C/C++)** — 从API version 22开始，算法库支持使用该算法进行加密和解密操作。 请查看 AES-WRAP加解密算法规格 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 **创建对象** 调用 OH_CryptoSymKeyGenerator… [`references/使用AES-WRAP算法对对称密钥加解密(C_C++).md`](<references/使用AES-WRAP算法对对称密钥加解密(C_C++).md>)
- **使用AES对称密钥（CBC模式）加解密(ArkTS)** — 对应的算法规格请参见 对称密钥加解密算法规格：AES 。 **加密** 1. 调用 cryptoFramework.createSymKeyGenerator 、 SymKeyGenerator.generateSymKey ，生成密钥算法为AES、密钥长度为128位的对称密钥（SymKey）。 如何生成AES对称密钥，开发者可参考下文示例，并结合 对称密钥… [`references/使用AES对称密钥（CBC模式）加解密(ArkTS).md`](<references/使用AES对称密钥（CBC模式）加解密(ArkTS).md>)
- **使用AES对称密钥（CBC模式）加解密(C/C++)** — 请查看 对称密钥加解密算法规格：AES 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 **创建对象** 调用 OH_CryptoSymKeyGenerator_Create 和 OH_CryptoSymKeyGenerator_Gene… [`references/使用AES对称密钥（CBC模式）加解密(C_C++).md`](<references/使用AES对称密钥（CBC模式）加解密(C_C++).md>)
- **使用AES对称密钥（CCM模式）加解密(ArkTS)** — 查看 对称密钥加解密算法规格：AES 。 **加密** 1. 调用 cryptoFramework.createSymKeyGenerator 、 SymKeyGenerator.generateSymKey ，生成密钥算法为AES、密钥长度为128位的对称密钥（SymKey）。 如何生成AES对称密钥，开发者可参考下文示例，并结合 对称密钥生成和转换规格：… [`references/使用AES对称密钥（CCM模式）加解密(ArkTS).md`](<references/使用AES对称密钥（CCM模式）加解密(ArkTS).md>)
- **使用AES对称密钥（CCM模式）加解密(C/C++)** — 请查看 对称密钥加解密算法规格：AES 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 **创建对象** 调用 OH_CryptoSymKeyGenerator_Create 、 OH_CryptoSymKeyGenerator_Gene… [`references/使用AES对称密钥（CCM模式）加解密(C_C++).md`](<references/使用AES对称密钥（CCM模式）加解密(C_C++).md>)
- **使用AES对称密钥（ECB模式）加解密(ArkTS)** — 请查看 对称密钥加解密算法规格：AES 。 **加密** 1. 调用 cryptoFramework.createSymKeyGenerator 、 SymKeyGenerator.generateSymKey ，生成密钥算法为AES、密钥长度为128位的对称密钥（SymKey）。 如何生成AES对称密钥，开发者可以参考以下示例，并结合 对称密钥生成和转换规… [`references/使用AES对称密钥（ECB模式）加解密(ArkTS).md`](<references/使用AES对称密钥（ECB模式）加解密(ArkTS).md>)
- **使用AES对称密钥（ECB模式）加解密(C/C++)** — 对应的算法规格请查看 对称密钥加解密算法规格：AES 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 **创建对象** 调用 OH_CryptoSymKeyGenerator_Create 和 OH_CryptoSymKeyGenerat… [`references/使用AES对称密钥（ECB模式）加解密(C_C++).md`](<references/使用AES对称密钥（ECB模式）加解密(C_C++).md>)
- **使用AES对称密钥（GCM模式）分段加解密(ArkTS)** — 对应的算法规格请查看 对称密钥加解密算法规格：AES 。 **加密** 1. 调用 cryptoFramework.createSymKeyGenerator 、 SymKeyGenerator.generateSymKey ，生成密钥算法为AES、密钥长度为128位的对称密钥（SymKey）。 如何生成AES对称密钥，开发者可参考下文示例，并结合 对称密钥… [`references/使用AES对称密钥（GCM模式）分段加解密(ArkTS).md`](<references/使用AES对称密钥（GCM模式）分段加解密(ArkTS).md>)
- **使用AES对称密钥（GCM模式）分段加解密(C/C++)** — 对应的算法规格请查看 对称密钥加解密算法规格：AES 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 **创建对象** 调用 OH_CryptoSymKeyGenerator_Create 和 OH_CryptoSymKeyGenerat… [`references/使用AES对称密钥（GCM模式）分段加解密(C_C++).md`](<references/使用AES对称密钥（GCM模式）分段加解密(C_C++).md>)
- **使用AES对称密钥（GCM模式）加解密(ArkTS)** — 对应的算法规格请查看 对称密钥加解密算法规格：AES 。 **加密** 1. 调用 cryptoFramework.createSymKeyGenerator ，生成密钥算法为AES、密钥长度为128位的对称密钥（SymKey）。然后调用 SymKeyGenerator.generateSymKey 生成对称密钥。 如何生成AES对称密钥，开发者可以参考以下… [`references/使用AES对称密钥（GCM模式）加解密(ArkTS).md`](<references/使用AES对称密钥（GCM模式）加解密(ArkTS).md>)
- **使用AES对称密钥（GCM模式）加解密(C/C++)** — 对应的算法规格请查看 对称密钥加解密算法规格：AES 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 **创建对象** 调用 OH_CryptoSymKeyGenerator_Create 和 OH_CryptoSymKeyGenerat… [`references/使用AES对称密钥（GCM模式）加解密(C_C++).md`](<references/使用AES对称密钥（GCM模式）加解密(C_C++).md>)
- **使用ChaCha20对称密钥加解密(ArkTS)** — 从API22开始，算法库支持该算法。 对应的算法规格请查看 对称密钥加解密算法规格：ChaCha20 。 #### 开发步骤 **创建对象** 调用 cryptoFramework.createSymKeyGenerator 、 SymKeyGenerator.generateSymKey ，生成密钥算法为ChaCha20的对称密钥（SymKey）。 如何生… [`references/使用ChaCha20对称密钥加解密(ArkTS).md`](<references/使用ChaCha20对称密钥加解密(ArkTS).md>)
- **使用ChaCha20对称密钥加解密(C/C++)** — 从API22开始，算法库支持该算法。 对应的算法规格请查看 对称密钥加解密算法规格：ChaCha20 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 **创建对象** 调用 OH_CryptoSymKeyGenerator_Create … [`references/使用ChaCha20对称密钥加解密(C_C++).md`](<references/使用ChaCha20对称密钥加解密(C_C++).md>)
- **使用ChaCha20对称密钥（Poly1305模式）加解密(ArkTS)** — 从API22开始，算法库支持该算法。 对应的算法规格请查看 对称密钥加解密算法规格：ChaCha20 。 #### 开发步骤 **创建对象** 调用 cryptoFramework.createSymKeyGenerator 、 SymKeyGenerator.generateSymKey ，生成密钥算法为ChaCha20的对称密钥（SymKey）。 如何生… [`references/使用ChaCha20对称密钥（Poly1305模式）加解密(ArkTS).md`](<references/使用ChaCha20对称密钥（Poly1305模式）加解密(ArkTS).md>)
- **使用ChaCha20对称密钥（Poly1305模式）加解密(C/C++)** — 从API22开始，算法库支持该算法。 对应的算法规格请查看 对称密钥加解密算法规格：ChaCha20 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 **创建对象** 调用 OH_CryptoSymKeyGenerator_Create … [`references/使用ChaCha20对称密钥（Poly1305模式）加解密(C_C++).md`](<references/使用ChaCha20对称密钥（Poly1305模式）加解密(C_C++).md>)
- **使用DES对称密钥（ECB模式）加解密(ArkTS)** — 对应的算法规格请查看 对称密钥加解密算法规格：DES 。 **加密** 1. 调用 cryptoFramework.createSymKeyGenerator 、 SymKeyGenerator.convertKey ，生成密钥算法为DES、密钥长度为64位的对称密钥（SymKey）。 如何生成DES对称密钥，开发者可参考下文示例，并结合 对称密钥生成和转换… [`references/使用DES对称密钥（ECB模式）加解密(ArkTS).md`](<references/使用DES对称密钥（ECB模式）加解密(ArkTS).md>)
- **使用DES对称密钥（ECB模式）加解密(C/C++)** — 对应的算法规格请查看 对称密钥加解密算法规格：DES 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 **创建对象** 调用 OH_CryptoSymKeyGenerator_Create 、 OH_CryptoSymKeyGenerat… [`references/使用DES对称密钥（ECB模式）加解密(C_C++).md`](<references/使用DES对称密钥（ECB模式）加解密(C_C++).md>)
- **使用DH进行密钥协商(ArkTS)** — 对应的算法规格请查看 密钥协商算法规格：DH 。 #### 开发步骤 1. 调用 cryptoFramework.createAsyKeyGenerator 、 AsyKeyGenerator.generateKeyPair 生成密钥算法为DH、采用知名安全素数群modp1536的非对称密钥（KeyPair）。 如何生成DH非对称密钥，开发者可参考下文示例，… [`references/使用DH进行密钥协商(ArkTS).md`](<references/使用DH进行密钥协商(ArkTS).md>)
- **使用DH进行密钥协商(C/C++)** — 对应的算法规格请查看 密钥协商算法规格：DH 。 #### 开发步骤 1. 调用 OH_CryptoAsymKeyGenerator_Create 、 OH_CryptoAsymKeyGenerator_Generate 生成密钥算法为DH_modp1536的非对称密钥（keyPair）。 如何生成DH非对称密钥，开发者可参考下文示例，并结合 非对称密钥生成… [`references/使用DH进行密钥协商(C_C++).md`](<references/使用DH进行密钥协商(C_C++).md>)
- **使用ECC压缩/非压缩公钥格式转换(ArkTS)** — 可通过指定ECC公钥数据生成公钥对象（PubKey），也可以从公钥对象（PubKey）中获取ECC公钥数据。 当前仅支持满足X509规范的ECC算法压缩和非压缩格式的公钥数据。此处的公钥数据应当是完整的X509公钥，对于只使用点数据的情况，请参考 使用ECC压缩/非压缩点格式转换 。 ECC的算法规格请查看 非对称密钥生成和转换规格：ECC 。 通过传入字符… [`references/使用ECC压缩_非压缩公钥格式转换(ArkTS).md`](<references/使用ECC压缩_非压缩公钥格式转换(ArkTS).md>)
- **使用ECC压缩/非压缩公钥格式转换(C/C++)** — 可通过指定ECC公钥数据生成公钥对象（ PubKey ），也可从公钥对象中获取ECC公钥数据。 当前仅支持满足X509规范的ECC算法的压缩或非压缩格式的完整公钥数据。此处的公钥数据应当是完整的X509公钥，对于仅使用点数据的情况，请参考 使用ECC压缩/非压缩点格式转换 。 查看 非对称密钥生成和转换规格：ECC 。 通过传入字符串参数，可指定需要获取的E… [`references/使用ECC压缩_非压缩公钥格式转换(C_C++).md`](<references/使用ECC压缩_非压缩公钥格式转换(C_C++).md>)
- **使用ECC压缩/非压缩点格式转换(ArkTS)** — 支持将压缩/非压缩的点数据转换为Point对象，用于密钥对象生成；也支持将Point对象转换为压缩/非压缩的点数据。 ECC的算法规格请查看 非对称密钥生成和转换规格：ECC 。 通过传入字符串参数format，可指定需要获取的点数据格式。如果需要获取压缩格式，则指定format为："COMPRESSED"；需要获取非压缩格式，则指定format为："UNC… [`references/使用ECC压缩_非压缩点格式转换(ArkTS).md`](<references/使用ECC压缩_非压缩点格式转换(ArkTS).md>)
- **使用ECC压缩/非压缩点格式转换(C/C++)** — 支持将压缩/非压缩的点数据，转换为Point对象，用于密钥对象生成；也支持将Point对象转换为压缩/非压缩的点数据。 ECC的算法规格请查看 非对称密钥生成和转换规格：ECC 。 通过传入字符串参数format，可指定获取的点数据格式。如果获取压缩格式，则指定format为："COMPRESSED"；获取非压缩格式，则指定format为："UNCOMPRE… [`references/使用ECC压缩_非压缩点格式转换(C_C++).md`](<references/使用ECC压缩_非压缩点格式转换(C_C++).md>)
- **使用ECDH进行密钥协商(ArkTS)** — 对应的算法规格请查看 密钥协商算法规格：ECDH 。 #### 开发步骤 1. 调用 cryptoFramework.createAsyKeyGenerator 、 AsyKeyGenerator.generateKeyPair 、 AsyKeyGenerator.convertKey 生成密钥算法为ECC、密钥长度为256位的非对称密钥（KeyPair）。… [`references/使用ECDH进行密钥协商(ArkTS).md`](<references/使用ECDH进行密钥协商(ArkTS).md>)
- **使用ECDH进行密钥协商(C/C++)** — 对应的算法规格请查看 密钥协商算法规格：ECDH 。 #### 开发步骤 1. 调用 OH_CryptoAsymKeyGenerator_Create 、 OH_CryptoAsymKeyGenerator_Generate 、 OH_CryptoAsymKeyGenerator_Convert 生成密钥算法为ECC、密钥长度为256位的非对称密钥（keyP… [`references/使用ECDH进行密钥协商(C_C++).md`](<references/使用ECDH进行密钥协商(C_C++).md>)
- **使用ECDSA密钥对签名验签 (C/C++)** — 对应的算法规格请查看 签名验签算法规格：ECDSA 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 签名开发步骤 1. 调用 OH_CryptoSign_Create ，指定字符串参数'RSA2048|PSS|SHA256|MGF1_SHA256'… [`references/使用ECDSA密钥对签名验签 (C_C++).md`](<references/使用ECDSA密钥对签名验签 (C_C++).md>)
- **使用ECDSA密钥对签名验签(ArkTS)** — 对应的算法规格请查看 签名验签算法规格：ECDSA 。 **签名** 1. 调用 cryptoFramework.createAsyKeyGenerator 、 AsyKeyGenerator.generateKeyPair ，生成非对称密钥算法为ECC、密钥长度为256位的密钥对（KeyPair）。 如何生成ECC非对称密钥，开发者可参考下文示例，并结合 … [`references/使用ECDSA密钥对签名验签(ArkTS).md`](<references/使用ECDSA密钥对签名验签(ArkTS).md>)
- **使用HKDF进行密钥派生(ArkTS)** — 对应算法规格请查看 密钥派生算法规格：HKDF 。 #### 开发步骤 1. 构造 HKDFSpec 对象，作为密钥派生参数进行密钥派生。 HKDFSpec是 KdfSpec 的子类，需要指定： - algName：指定算法'HKDF'。 - key：原始密钥材料。 如果使用string类型，需要直接传入用于密钥派生的数据，而不是HexString、base… [`references/使用HKDF进行密钥派生(ArkTS).md`](<references/使用HKDF进行密钥派生(ArkTS).md>)
- **使用HKDF进行密钥派生(C/C++)** — 对应算法规格请查看 密钥派生算法规格：HKDF 。 #### 开发步骤 1. 调用 OH_CryptoKdfParams_Create ，指定字符串参数'HKDF'，创建密钥派生参数对象。 2. 调用 OH_CryptoKdfParams_SetParam ，设置HKDF所需的参数。示例如下： - CRYPTO_KDF_KEY_DATABLOB：用于生成派生… [`references/使用HKDF进行密钥派生(C_C++).md`](<references/使用HKDF进行密钥派生(C_C++).md>)
- **使用PBKDF2进行密钥派生(ArkTS)** — 对应的算法规格请查看 密钥派生算法规格：PBKDF2 。 #### 开发步骤 1. 构造 PBKDF2Spec 对象，作为密钥派生参数进行密钥派生。 PBKDF2Spec是 KdfSpec 的子类，需要指定： - algName：指定算法'PBKDF2'。 - password：用于生成派生密钥的原始密码。 如果使用string类型，需要直接传入用于密钥派生… [`references/使用PBKDF2进行密钥派生(ArkTS).md`](<references/使用PBKDF2进行密钥派生(ArkTS).md>)
- **使用PBKDF2进行密钥派生(C/C++)** — 对应的算法规格请查看 密钥派生算法规格：PBKDF2 。 #### 开发步骤 1. 调用 OH_CryptoKdfParams_Create ，指定字符串参数'PBKDF2'，创建密钥派生参数对象。 2. 调用 OH_CryptoKdfParams_SetParam ，设置PBKDF2所需的参数。示例如下： - CRYPTO_KDF_KEY_DATABLOB… [`references/使用PBKDF2进行密钥派生(C_C++).md`](<references/使用PBKDF2进行密钥派生(C_C++).md>)
- **使用RSA密钥对分段签名验签 (PKCS1模式)(C/C++)** — 对应的算法规格请查看 签名验签算法规格：RSA 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 签名开发步骤 1. 调用 OH_CryptoSign_Create ，指定字符串参数'RSA1024|PKCS1|SHA256'，创建Sign实例，用于… [`references/使用RSA密钥对分段签名验签 (PKCS1模式)(C_C++).md`](<references/使用RSA密钥对分段签名验签 (PKCS1模式)(C_C++).md>)
- **使用RSA密钥对分段签名验签（PKCS1模式）(ArkTS)** — 对应的算法规格请查看 签名验签算法规格：RSA 。 **签名** 1. 调用 cryptoFramework.createAsyKeyGenerator 、 AsyKeyGenerator.generateKeyPair ，生成密钥算法为RSA、密钥长度为1024位、素数个数为2的非对称密钥对象（KeyPair），包括公钥（PubKey）和私钥（PriKey… [`references/使用RSA密钥对分段签名验签（PKCS1模式）(ArkTS).md`](<references/使用RSA密钥对分段签名验签（PKCS1模式）(ArkTS).md>)
- **使用RSA密钥对签名验签 (PKCS1模式)(C/C++)** — 对应的算法规格请查看 签名验签算法规格：RSA 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 签名开发步骤 1. 调用 OH_CryptoSign_Create ，指定字符串参数'RSA1024|PKCS1|SHA256'，创建Sign实例，用于… [`references/使用RSA密钥对签名验签 (PKCS1模式)(C_C++).md`](<references/使用RSA密钥对签名验签 (PKCS1模式)(C_C++).md>)
- **使用RSA密钥对签名验签 (PSS模式)(C/C++)** — 对应的算法规格请查看 签名验签算法规格：RSA 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 签名开发步骤 1. 调用OH_CryptoSign_Create，指定字符串参数'RSA2048|PSS|SHA256|MGF1_SHA256'，创建非… [`references/使用RSA密钥对签名验签 (PSS模式)(C_C++).md`](<references/使用RSA密钥对签名验签 (PSS模式)(C_C++).md>)
- **使用RSA密钥对签名验签（PSS模式）(ArkTS)** — 对应的算法规格请查看 签名验签算法规格：RSA 。 **签名** 1. 调用 cryptoFramework.createAsyKeyGeneratorBySpec 、 AsyKeyGeneratorBySpec.generateKeyPair ，指定密钥参数，生成RSA非对称密钥对（KeyPair）。 如何生成RSA非对称密钥，开发者可参考下文示例，并结合… [`references/使用RSA密钥对签名验签（PSS模式）(ArkTS).md`](<references/使用RSA密钥对签名验签（PSS模式）(ArkTS).md>)
- **使用RSA密钥对（PKCS1模式）签名及签名恢复(ArkTS)** — 对应的算法规格请查看 签名验签算法规格：RSA 。 **签名** 1. 调用 cryptoFramework.createAsyKeyGenerator 、 AsyKeyGenerator.generateKeyPair ，生成密钥算法为RSA、密钥长度为1024位、素数个数为2的非对称密钥对象（KeyPair），包括公钥（PubKey）和私钥（PriKey… [`references/使用RSA密钥对（PKCS1模式）签名及签名恢复(ArkTS).md`](<references/使用RSA密钥对（PKCS1模式）签名及签名恢复(ArkTS).md>)
- **使用RSA密钥对（PKCS1模式）签名恢复(C/C++)** — 对应的算法规格请查看 验签算法规格：RSA 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 1. 调用 OH_CryptoVerify_Create ，指定字符串参数'RSA1024|PKCS1|SHA256|Recover'，与签名的S… [`references/使用RSA密钥对（PKCS1模式）签名恢复(C_C++).md`](<references/使用RSA密钥对（PKCS1模式）签名恢复(C_C++).md>)
- **使用RSA密钥对（PKCS1模式）签名验签(ArkTS)** — 对应的算法规格请查看 签名验签算法规格：RSA 。 **签名** 1. 调用 cryptoFramework.createAsyKeyGenerator 、 AsyKeyGenerator.generateKeyPair ，生成密钥算法为RSA、密钥长度为1024位、素数个数为2的非对称密钥对象（KeyPair），包括公钥（PubKey）和私钥（PriKey… [`references/使用RSA密钥对（PKCS1模式）签名验签(ArkTS).md`](<references/使用RSA密钥对（PKCS1模式）签名验签(ArkTS).md>)
- **使用RSA私钥进行编码解码(ArkTS)** — **编码** 1. 调用 cryptoFramework.createAsyKeyGenerator 、 AsyKeyGenerator.generateKeyPair ，生成RSA密钥类型为RSA1024、素数个数为2的非对称密钥对（KeyPair）。KeyPair对象中包括公钥PubKey、私钥PriKey。 如何生成RSA非对称密钥对，开发者可参考下文… [`references/使用RSA私钥进行编码解码(ArkTS).md`](<references/使用RSA私钥进行编码解码(ArkTS).md>)
- **使用RSA私钥进行编码解码(C/C++)** — **编码** 1. 调用 OH_CryptoAsymKeyGenerator_Create 、 OH_CryptoAsymKeyGenerator_Generate ，生成RSA密钥类型为RSA2048、素数个数为2的非对称密钥对（keyPair）。keyPair对象中包括公钥PubKey、私钥PriKey。 如何生成RSA非对称密钥对，开发者可参考下文示例… [`references/使用RSA私钥进行编码解码(C_C++).md`](<references/使用RSA私钥进行编码解码(C_C++).md>)
- **使用RSA非对称密钥分段加解密(ArkTS)** — 对应的算法规格请查看 非对称密钥加解密算法规格：RSA 。 **加密** 1. 调用 cryptoFramework.createAsyKeyGenerator 、 AsyKeyGenerator.generateKeyPair ，生成RSA密钥类型为RSA1024、素数个数为2（不填默认）的非对称密钥对（KeyPair）。KeyPair对象中包括公钥Pub… [`references/使用RSA非对称密钥分段加解密(ArkTS).md`](<references/使用RSA非对称密钥分段加解密(ArkTS).md>)
- **使用RSA非对称密钥分段加解密(C/C++)** — 对应的算法规格请查看 非对称密钥加解密算法规格：RSA 。 **加密** 1. 调用 OH_CryptoAsymKeyGenerator_Create 、 OH_CryptoAsymKeyGenerator_Generate ，生成RSA密钥类型为RSA1024、素数个数为2的非对称密钥对（keyPair）。keyPair对象中包括公钥PubKey、私钥Pr… [`references/使用RSA非对称密钥分段加解密(C_C++).md`](<references/使用RSA非对称密钥分段加解密(C_C++).md>)
- **使用RSA非对称密钥（PKCS1_OAEP模式）加解密** — 对应的算法规格请查看 非对称密钥加解密算法规格：RSA 。 **加密** 1. 调用 cryptoFramework.createAsyKeyGeneratorBySpec 、 AsyKeyGeneratorBySpec.generateKeyPair ，指定密钥参数，生成RSA非对称密钥对（KeyPair）。 如何生成RSA非对称密钥对，开发者可参考下文示… [`references/使用RSA非对称密钥（PKCS1_OAEP模式）加解密.md`](<references/使用RSA非对称密钥（PKCS1_OAEP模式）加解密.md>)
- **使用RSA非对称密钥（PKCS1模式）加解密(ArkTS)** — 对应的算法规格请查看 非对称密钥加解密算法规格：RSA 。 **加密** 1. 调用 cryptoFramework.createAsyKeyGenerator 、 AsyKeyGenerator.generateKeyPair ，生成RSA密钥类型为RSA1024、素数个数为2的非对称密钥对（KeyPair）。KeyPair对象中包括公钥PubKey、私钥… [`references/使用RSA非对称密钥（PKCS1模式）加解密(ArkTS).md`](<references/使用RSA非对称密钥（PKCS1模式）加解密(ArkTS).md>)
- **使用RSA非对称密钥（PKCS1模式）加解密(C/C++)** — 对应的算法规格请查看 非对称密钥加解密算法规格：RSA 。 **加密** 1. 调用 OH_CryptoAsymKeyGenerator_Create 、 OH_CryptoAsymKeyGenerator_Generate ，生成RSA密钥类型为RSA1024、素数个数为2的非对称密钥对（keyPair）。keyPair对象中包括公钥PubKey、私钥Pr… [`references/使用RSA非对称密钥（PKCS1模式）加解密(C_C++).md`](<references/使用RSA非对称密钥（PKCS1模式）加解密(C_C++).md>)
- **使用SCRYPT进行密钥派生(ArkTS)** — 对应的算法规格请查看 密钥派生算法规格：SCRYPT 。 #### 开发步骤 1. 构造 ScryptSpec 对象，作为密钥派生参数进行密钥派生。 ScryptSpec是 KdfSpec 的子类，需要指定： - algName：指定算法名为'SCRYPT'。 - passphrase：用于生成派生密钥的原始密码。 如果使用string类型，需要直接传入用于… [`references/使用SCRYPT进行密钥派生(ArkTS).md`](<references/使用SCRYPT进行密钥派生(ArkTS).md>)
- **使用SCRYPT进行密钥派生(C/C++)** — 对应的算法规格请查看 密钥派生算法规格：SCRYPT 。 #### 开发步骤 1. 调用 OH_CryptoKdfParams_Create ，指定字符串参数'SCRYPT'，创建密钥派生参数对象。 2. 调用 OH_CryptoKdfParams_SetParam ，设置Scrypt所需的参数。 密钥派生失败原因：下列参数未设置。 - CRYPTO_KDF… [`references/使用SCRYPT进行密钥派生(C_C++).md`](<references/使用SCRYPT进行密钥派生(C_C++).md>)
- **使用SM2密文格式转换(ArkTS)** — 当前支持的SM2密文格式为国密标准的ASN.1格式，其中各参数组合顺序为C1C3C2，具体参数含义请参考 转换SM2密文格式 。 开发者可指定SM2密文的参数，将其转换成符合国密标准的ASN.1格式密文。反之，也可以从国密标准的ASN.1格式密文中取出具体的SM2密文参数，便于开发者自行组合成其他格式的SM2密文。 **指定密文参数，生成标准ASN.1密文*… [`references/使用SM2密文格式转换(ArkTS).md`](<references/使用SM2密文格式转换(ArkTS).md>)
- **使用SM2密文格式转换(C/C++)** — 当前支持的SM2密文格式为国密标准的ASN.1格式，其中各参数组合顺序为C1C3C2，具体参数含义请参考 转换SM2密文格式 。 开发者可指定SM2密文的参数，将其转换成符合国密标准的ASN.1格式密文。反之，也可以从国密标准的ASN.1格式密文中取出具体的SM2密文参数，便于开发者自行组合成其他格式的SM2密文。 **指定密文参数，生成标准ASN.1密文*… [`references/使用SM2密文格式转换(C_C++).md`](<references/使用SM2密文格式转换(C_C++).md>)
- **使用SM2密钥对签名验签 (C/C++)** — 对应的算法规格请查看 签名验签算法规格：SM2 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 签名开发步骤 1. 调用 OH_CryptoSign_Create ，指定字符串参数'SM2_256|SM3'，创建非对称密钥类型为SM2_256、摘要… [`references/使用SM2密钥对签名验签 (C_C++).md`](<references/使用SM2密钥对签名验签 (C_C++).md>)
- **使用SM2密钥对签名验签(ArkTS)** — 对应的算法规格请查看 签名验签算法规格：SM2 。 **签名** 1. 调用 cryptoFramework.createAsyKeyGenerator 、 AsyKeyGenerator.generateKeyPair ，生成非对称密钥算法为SM2、密钥长度为256位的密钥对（KeyPair）。 如何生成SM2非对称密钥，开发者可参考下文示例，并结合 非对… [`references/使用SM2密钥对签名验签(ArkTS).md`](<references/使用SM2密钥对签名验签(ArkTS).md>)
- **使用SM2非对称密钥加解密(ArkTS)** — 对应的算法规格请查看 非对称密钥加解密算法规格：SM2 。 **加密** 1. 调用 cryptoFramework.createAsyKeyGenerator 、 AsyKeyGenerator.generateKeyPair ，生成SM2密钥类型为SM2_256的非对称密钥对（KeyPair）。KeyPair对象中包括公钥PubKey、私钥PriKey。… [`references/使用SM2非对称密钥加解密(ArkTS).md`](<references/使用SM2非对称密钥加解密(ArkTS).md>)
- **使用SM2非对称密钥加解密(C/C++)** — 对应的算法规格请查看 非对称密钥加解密算法规格：SM2 。 **加密** 1. 调用 OH_CryptoAsymKeyGenerator_Create 、 OH_CryptoAsymKeyGenerator_Generate ，生成SM2密钥类型为SM2_256的非对称密钥对（keyPair）。keyPair对象中包括公钥PubKey、私钥PriKey。 如… [`references/使用SM2非对称密钥加解密(C_C++).md`](<references/使用SM2非对称密钥加解密(C_C++).md>)
- **使用SM4对称密钥（CBC模式）加解密(ArkTS)** — 对应的算法规格请查看 对称密钥加解密算法规格：SM4 。 **加密** 1. 调用 cryptoFramework.createSymKeyGenerator 、 SymKeyGenerator.generateSymKey ，生成密钥算法为SM4、密钥长度为128位的对称密钥（SymKey）。 如何生成SM4对称密钥，开发者可参考下文示例，并结合 对称密钥… [`references/使用SM4对称密钥（CBC模式）加解密(ArkTS).md`](<references/使用SM4对称密钥（CBC模式）加解密(ArkTS).md>)
- **使用SM4对称密钥（CBC模式）加解密(C/C++)** — 对应的算法规格请查看 对称密钥加解密算法规格：SM4 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) **加密** 1. 调用 OH_CryptoSymKeyGenerator_Create 、 OH_CryptoSymKeyGenerator_Genera… [`references/使用SM4对称密钥（CBC模式）加解密(C_C++).md`](<references/使用SM4对称密钥（CBC模式）加解密(C_C++).md>)
- **使用SM4对称密钥（ECB模式）加解密(ArkTS)** — 对应的算法规格请查看 对称密钥加解密算法规格：SM4 。 **加密** 1. 调用 cryptoFramework.createSymKeyGenerator 、 SymKeyGenerator.generateSymKey ，生成密钥算法为SM4、密钥长度为128位的对称密钥（SymKey）。 如何生成SM4对称密钥，开发者可参考下文示例，并结合 对称密钥… [`references/使用SM4对称密钥（ECB模式）加解密(ArkTS).md`](<references/使用SM4对称密钥（ECB模式）加解密(ArkTS).md>)
- **使用SM4对称密钥（ECB模式）加解密(C/C++)** — 对应的算法规格请查看 对称密钥加解密算法规格：SM4 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) **加密** 1. 调用 OH_CryptoSymKeyGenerator_Create 、 OH_CryptoSymKeyGenerator_Genera… [`references/使用SM4对称密钥（ECB模式）加解密(C_C++).md`](<references/使用SM4对称密钥（ECB模式）加解密(C_C++).md>)
- **使用SM4对称密钥（GCM模式）分段加解密(ArkTS)** — 对应的算法规格请查看 对称密钥加解密算法规格：SM4 。 **加密** 1. 调用 cryptoFramework.createSymKeyGenerator 、 SymKeyGenerator.generateSymKey ，生成密钥算法为SM4、密钥长度为128位的对称密钥（SymKey）。 如何生成SM4对称密钥，开发者可参考下文示例，并结合 对称密钥… [`references/使用SM4对称密钥（GCM模式）分段加解密(ArkTS).md`](<references/使用SM4对称密钥（GCM模式）分段加解密(ArkTS).md>)
- **使用SM4对称密钥（GCM模式）分段加解密(C/C++)** — 对应的算法规格请查看 对称密钥加解密算法规格：SM4 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) **加密** 1. 调用 OH_CryptoSymKeyGenerator_Create 、 OH_CryptoSymKeyGenerator_Genera… [`references/使用SM4对称密钥（GCM模式）分段加解密(C_C++).md`](<references/使用SM4对称密钥（GCM模式）分段加解密(C_C++).md>)
- **使用SM4对称密钥（GCM模式）加解密(ArkTS)** — 对应的算法规格请查看 对称密钥加解密算法规格：SM4 。 **加密** 1. 调用 cryptoFramework.createSymKeyGenerator 、 SymKeyGenerator.generateSymKey ，生成密钥算法为SM4、密钥长度为128位的对称密钥（SymKey）。 如何生成SM4对称密钥，开发者可参考下文示例，并结合 对称密钥… [`references/使用SM4对称密钥（GCM模式）加解密(ArkTS).md`](<references/使用SM4对称密钥（GCM模式）加解密(ArkTS).md>)
- **使用SM4对称密钥（GCM模式）加解密(C/C++)** — 对应的算法规格请查看 对称密钥加解密算法规格：SM4 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) **加密** 1. 调用 OH_CryptoSymKeyGenerator_Create 、 OH_CryptoSymKeyGenerator_Genera… [`references/使用SM4对称密钥（GCM模式）加解密(C_C++).md`](<references/使用SM4对称密钥（GCM模式）加解密(C_C++).md>)
- **使用X25519进行密钥协商(ArkTS)** — 对应的算法规格请查看 密钥协商算法规格：X25519 。 #### 开发步骤 1. 调用 cryptoFramework.createAsyKeyGenerator 、 AsyKeyGenerator.generateKeyPair 、 AsyKeyGenerator.convertKey 生成密钥算法为X25519的非对称密钥（KeyPair）。 如何生成… [`references/使用X25519进行密钥协商(ArkTS).md`](<references/使用X25519进行密钥协商(ArkTS).md>)
- **使用X25519进行密钥协商(C/C++)** — 对应的算法规格请查看 密钥协商算法规格：X25519 。 #### 开发步骤 1. 调用 OH_CryptoAsymKeyGenerator_Create 、 OH_CryptoAsymKeyGenerator_Generate 、 OH_CryptoAsymKeyGenerator_Convert 生成密钥算法为X25519的非对称密钥（keyPair）。… [`references/使用X25519进行密钥协商(C_C++).md`](<references/使用X25519进行密钥协商(C_C++).md>)
- **使用X963KDF进行密钥派生(ArkTS)** — 从API version 22开始，算法库支持使用该算法进行密钥派生操作。 对应的算法规格请查看 密钥派生算法规格：X963KDF 。 #### 开发步骤 1. 构造 X963KdfSpec 对象，作为密钥派生参数进行密钥派生。 X963KdfSpec是 KdfSpec 的子类，需要指定： - algName：指定算法'X963Kdf'。 - key：原始密… [`references/使用X963KDF进行密钥派生(ArkTS).md`](<references/使用X963KDF进行密钥派生(ArkTS).md>)
- **使用X963KDF进行密钥派生(C/C++)** — 从API version 22开始，算法库支持使用该算法进行密钥派生操作。 对应算法规格请查看 密钥派生算法规格：X963KDF 。 #### 开发步骤 1. 调用 OH_CryptoKdfParams_Create ，指定字符串参数'X963KDF'，创建密钥派生参数对象。 2. 调用 OH_CryptoKdfParams_SetParam ，设置X963… [`references/使用X963KDF进行密钥派生(C_C++).md`](<references/使用X963KDF进行密钥派生(C_C++).md>)
- **使用硬件熵源生成安全随机数(ArkTS)** — 从API version 21开始，可以选择使用硬件熵源生成安全随机数。 随机数主要用于临时会话密钥生成和非对称加密算法密钥生成等场景。在加解密场景中，安全随机数生成器需要具备随机性、不可预测性和不可重现性。 使用更安全的熵源，对随机数而言，就意味着 “结果难以被猜测或复现”，是 “真随机性” 的量化体现。 当前硬件熵源通过调用 HUKS 接口实现。 开发者… [`references/使用硬件熵源生成安全随机数(ArkTS).md`](<references/使用硬件熵源生成安全随机数(ArkTS).md>)
- **使用硬件熵源生成安全随机数(C/C++)** — 从API version 21开始，可以选择使用硬件熵源生成安全随机数。 随机数主要用于临时会话密钥生成和非对称加密算法密钥生成等场景。在加解密场景中，安全随机数生成器需要具备随机性、不可预测性和不可重现性。 使用更安全的熵源，对随机数而言，就意味着 “结果难以被猜测或复现”，是 “真随机性” 的量化体现。 当前硬件熵源通过调用 HUKS 接口实现。 开发者… [`references/使用硬件熵源生成安全随机数(C_C++).md`](<references/使用硬件熵源生成安全随机数(C_C++).md>)
- **使用私钥对象获取公钥对象(ArkTS)** — 从API version 23开始，算法库支持从私钥对象中获取公钥对象的操作。 以RSA为例，根据私钥对象获取公钥对象。 对应的算法规格请查看 非对称密钥加解密算法规格：RSA 。 #### 开发步骤 1. 调用 cryptoFramework.createAsyKeyGenerator ，指定字符串参数'RSA1024'，创建RSA密钥类型为RSA1024… [`references/使用私钥对象获取公钥对象(ArkTS).md`](<references/使用私钥对象获取公钥对象(ArkTS).md>)
- **使用私钥对象获取公钥对象(C/C++)** — 从API version 23开始，算法库支持从私钥对象中获取公钥对象的操作。 以RSA为例，根据私钥对象获取公钥对象。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) 对应的算法规格请查看 非对称密钥生成和转换规格：RSA 。 #### 开发步骤 1. 调用 … [`references/使用私钥对象获取公钥对象(C_C++).md`](<references/使用私钥对象获取公钥对象(C_C++).md>)
- **分段加解密说明** — 在加解密的过程中，算法库没有对单次或累计的传入数据量设置大小限制，但在传入的数据量较大时（如数据量大于2M），建议开发者将数据分段，完成分段加解密，提高效率。 #### 对称加解密 对称密钥的分段加解密，通过调用 Cipher.update 实现。 开发者可自定义单次传入的数据量（示例中的updateLength），多次调用update传入数据。 当前单次支… [`references/分段加解密说明.md`](<references/分段加解密说明.md>)
- **加解密介绍** — 在数据存储或传输场景中，可以使用加解密操作用于保证数据的机密性，防止敏感数据泄露。 使用加解密操作时，典型的场景有： 1. 使用对称密钥的加解密操作。 2. 使用非对称密钥的加解密操作。 3. 使用RSA（PKCS1_OAEP填充模式）时，获取、设置CipherSpecItem参数。 [`references/加解密介绍.md`](<references/加解密介绍.md>)
- **安全随机数生成(ArkTS)** — ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/68/v3/AKCh_xj_SbOO7e14n1gpHg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111057Z&HW-CC-Ex… [`references/安全随机数生成(ArkTS).md`](<references/安全随机数生成(ArkTS).md>)
- **安全随机数生成(C/C++)** — ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/ltcdK_9OS8C_sFbOWTvZXA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111058Z&HW-CC-Ex… [`references/安全随机数生成(C_C++).md`](<references/安全随机数生成(C_C++).md>)
- **密钥协商介绍及算法规格** — 在非安全通道环境中，需要不共享任何秘密的情况下，协商出一个安全的共享密钥，可以使用密钥协商算法。 接下来将说明系统目前支持的算法及其对应的规格。 #### ECDH ECDH（Elliptic Curve Diffie–Hellman key exchange），算法库框架提供了多种椭圆曲线的ECDH能力。 当创建密钥协商时，需要使用表中“字符串参数”一列，… [`references/密钥协商介绍及算法规格.md`](<references/密钥协商介绍及算法规格.md>)
- **密钥派生介绍及算法规格** — 密钥派生函数（key derivation function）是指使用伪随机函数从秘密值中导出一个或多个密钥。密钥派生函数可用于将密钥扩展到更长的密钥或获得所需格式的密钥。 #### PBKDF2算法 PBKDF（Password-Based Key Derivation Function）是具有可变计算成本的密钥派生函数，PBKDF2是PKCS系列的标准之… [`references/密钥派生介绍及算法规格.md`](<references/密钥派生介绍及算法规格.md>)
- **密钥生成与转换介绍** — 在以下场景中，经常需要使用密钥生成操作： 1. 随机生成算法库密钥对象。该对象可用于后续的加解密等操作。 2. 根据指定数据生成算法库密钥对象（即从外部源或存储系统中获取的二进制数据转换为算法库的密钥对象）。该对象可用于后续的加解密等操作。 3. 根据密钥参数生成指定的算法库密钥对象。该对象可用于后续的加解密等操作。 4. 获取算法库密钥对象的二进制数据，用… [`references/密钥生成与转换介绍.md`](<references/密钥生成与转换介绍.md>)
- **对称密钥加解密算法规格** — 当前章节将说明系统目前支持的算法及其对应的规格。 对于每种算法采用支持的加密模式，将会在具体的每个算法规格中介绍。 #### AES 算法库当前提供了 AES 加解密常用的7种加密模式：ECB、CBC、OFB、CFB、CTR、GCM和CCM。不同的加密模式适用的加解密参数不同，具体请参考 ParamsSpec 。 由于AES为分组加密算法，分组长度为128位… [`references/对称密钥加解密算法规格.md`](<references/对称密钥加解密算法规格.md>)
- **对称密钥生成和转换规格** — 当前章节将说明系统目前支持的算法及其对应的规格。 开发者可以通过字符串参数承载密钥规格，来生成对应的密钥。对于每种算法支持的字符串参数，将会在具体的每个算法规格中介绍。 #### AES AES（Advanced Encryption Standard），最常见的对称加密算法。 基本特点： - 分组密码算法，分组长度为128位。 - 密钥长度为128位、19… [`references/对称密钥生成和转换规格.md`](<references/对称密钥生成和转换规格.md>)
- **指定PEM格式字符串数据转换非对称密钥对(ArkTS)** — 以RSA为例，根据指定的非对称密钥字符串数据，生成非对称密钥对（KeyPair）。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c1/v3/TFFwdCuGQyiA980_Lu8DgQ/note_3.0-zh-cn.png?HW-CC-… [`references/指定PEM格式字符串数据转换非对称密钥对(ArkTS).md`](<references/指定PEM格式字符串数据转换非对称密钥对(ArkTS).md>)
- **指定PEM格式字符串数据转换非对称密钥对(C/C++)** — 以RSA为例，根据指定的非对称密钥字符串数据，生成非对称密钥对（OH_CryptoKeyPair）。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e1/v3/a9yAqBQ9RPWKFWF5W3fbcA/note_3.0-zh-cn.p… [`references/指定PEM格式字符串数据转换非对称密钥对(C_C++).md`](<references/指定PEM格式字符串数据转换非对称密钥对(C_C++).md>)
- **指定二进制数据转换对称密钥(ArkTS)** — 以3DES和HMAC为例，根据指定的对称密钥二进制数据，生成对称密钥对象（SymKey），即将外部或存储的二进制数据转换为算法库的密钥对象，该对象可用于后续的加解密等操作。 #### 指定二进制数据转换3DES密钥 对应的算法规格请查看 对称密钥生成和转换规格：3DES 。 1. 获取3DES二进制密钥数据，封装成 DataBlob 对象。 2. 调用 cr… [`references/指定二进制数据转换对称密钥(ArkTS).md`](<references/指定二进制数据转换对称密钥(ArkTS).md>)
- **指定二进制数据转换对称密钥(C/C++)** — 以3DES和HMAC为例，根据指定的对称密钥二进制数据生成密钥（OH_CryptoSymKey），将外部或存储的二进制数据转换为算法库的密钥对象，该对象可用于后续的加解密操作。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 指定二进制数据转换3DES… [`references/指定二进制数据转换对称密钥(C_C++).md`](<references/指定二进制数据转换对称密钥(C_C++).md>)
- **指定二进制数据转换非对称密钥对(ArkTS)** — 以RSA、ECC、SM2为例，根据指定的非对称密钥二进制数据，生成非对称密钥对（KeyPair），即将外部或存储的二进制数据转换为算法库的密钥对象，该对象可用于后续的加解密等操作。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/97/v3… [`references/指定二进制数据转换非对称密钥对(ArkTS).md`](<references/指定二进制数据转换非对称密钥对(ArkTS).md>)
- **指定二进制数据转换非对称密钥对(C/C++)** — 以RSA、ECC、SM2为例，根据指定的非对称密钥二进制数据，生成非对称密钥对（OH_CryptoKeyPair），即将外部或存储的二进制数据转换为算法库的密钥对象，该对象可用于后续的加解密等操作。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_10… [`references/指定二进制数据转换非对称密钥对(C_C++).md`](<references/指定二进制数据转换非对称密钥对(C_C++).md>)
- **指定密钥参数生成非对称密钥对(ArkTS)** — 以RSA、ECC、SM2为例，根据指定的密钥参数，生成非对称密钥对（KeyPair），并获取密钥参数属性。 该对象可用于后续的加解密等操作。获取的密钥参数属性可用于存储或传输。 #### 指定密钥参数生成RSA公钥 对应的算法规格请查看 非对称密钥生成和转换规格：RSA 。 1. 构造 RSACommonParamsSpec 对象，用于指定RSA算法中公私钥… [`references/指定密钥参数生成非对称密钥对(ArkTS).md`](<references/指定密钥参数生成非对称密钥对(ArkTS).md>)
- **指定密钥参数生成非对称密钥对(C/C++)** — 以RSA、ECC、SM2为例，根据指定的密钥参数，生成非对称密钥对（KeyPair），并获取密钥参数属性。 该对象可用于后续的加解密等操作。获取的密钥参数属性可用于存储或传输。 #### 指定密钥参数生成RSA密钥对 对应的算法规格请查看 非对称密钥生成和转换规格：RSA 。 1. 调用 OH_CryptoAsymKeySpec_Create ，指定算法名为… [`references/指定密钥参数生成非对称密钥对(C_C++).md`](<references/指定密钥参数生成非对称密钥对(C_C++).md>)
- **消息摘要计算MD5(ArkTS)** — 对应的算法规格请查看 消息摘要计算算法规格 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/90/v3/VXrPEpHAR4WkvKXIvyGS0Q/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=2… [`references/消息摘要计算MD5(ArkTS).md`](<references/消息摘要计算MD5(ArkTS).md>)
- **消息摘要计算MD5(C/C++)** — 对应的算法规格请查看 消息摘要计算算法规格 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 在调用update接口传入数据时，可以 一次性传入所有数据 ，也可以把数据人工分段，然后 分段update 。对于同一段数据而言，计算结果没有差异… [`references/消息摘要计算MD5(C_C++).md`](<references/消息摘要计算MD5(C_C++).md>)
- **消息摘要计算SHA256(ArkTS)** — 对应的算法规格请查看 消息摘要计算算法规格 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c8/v3/SKrakTXSTWCotggn_55ywQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=2… [`references/消息摘要计算SHA256(ArkTS).md`](<references/消息摘要计算SHA256(ArkTS).md>)
- **消息摘要计算SHA256(C/C++)** — 对应的算法规格请查看 消息摘要计算算法规格 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 在调用update接口传入数据时，可以 一次性传入所有数据 ，也可以把数据人工分段，然后 分段update 。对于同一段数据而言，计算结果没有差异… [`references/消息摘要计算SHA256(C_C++).md`](<references/消息摘要计算SHA256(C_C++).md>)
- **消息摘要计算SHA3(ArkTS)** — 从API version 22开始，算法库支持使用该算法进行摘要计算操作。 对应的算法规格请查看 消息摘要计算算法规格 。 #### 开发步骤 在调用update接口传入数据时，可以 一次性传入所有数据 ，也可以把数据人工分段，然后 分段update 。对于同一段数据而言，计算结果没有差异。对于数据量较大的数据，开发者可以根据实际需求选择是否分段传入。 下面… [`references/消息摘要计算SHA3(ArkTS).md`](<references/消息摘要计算SHA3(ArkTS).md>)
- **消息摘要计算SHA3-256(C/C++)** — 从API version 22开始，算法库支持使用该算法进行摘要计算操作。 对应的算法规格请查看 消息摘要计算算法规格 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 开发步骤 在调用update接口传入数据时，可以 摘要算法一次性传入 ，也可以把… [`references/消息摘要计算SHA3-256(C_C++).md`](<references/消息摘要计算SHA3-256(C_C++).md>)
- **消息摘要计算介绍及算法规格** — 消息摘要算法是一种能将任意长度的输入消息，通过特定运算生成固定长度摘要的算法。消息摘要算法也被称为哈希算法或单向散列算法。 在摘要算法相同时，生成的摘要值主要有下列特点： - 当输入消息相同时，生成摘要序列相同。 - 当输入消息的长度不一致时，生成摘要序列长度固定（摘要长度由算法决定）。例如SHA256会生成256位，即32字节。 #### 支持的算法与规格… [`references/消息摘要计算介绍及算法规格.md`](<references/消息摘要计算介绍及算法规格.md>)
- **消息认证码计算CMAC(ArkTS)** — CMAC通过使用分组密码（如AES）和一个密钥生成认证码，确保消息在传输过程中未被篡改。 #### 开发步骤 在调用update接口传入数据时，可以 一次性传入所有数据 ，也可以把数据人工分段，然后 分段update 。对于同一段数据而言，是否分段，计算结果没有差异。对于数据量较大的数据，开发者可以根据实际需求选择是否分段传入。 下面分别提供两种方式的示例代… [`references/消息认证码计算CMAC(ArkTS).md`](<references/消息认证码计算CMAC(ArkTS).md>)
- **消息认证码计算CMAC(C/C++)** — CMAC通过使用分组密码（如AES）和一个密钥来生成认证码，确保消息在传输过程中未被篡改。 #### 开发步骤 在调用update接口传入数据时，可以 一次性传入 ，也可以把数据人工 分段传入 。对于同一段数据而言，是否分段，计算结果没有差异。对于数据量较大的数据，开发者可以根据实际需求选择是否分段传入。 下面分别提供两种方式的示例代码。 #### CMAC… [`references/消息认证码计算CMAC(C_C++).md`](<references/消息认证码计算CMAC(C_C++).md>)
- **消息认证码计算HMAC(ArkTS)** — HMAC使用指定的摘要算法，以共享密钥和消息作为输入，生成固定长度的消息认证码，用于检验报文的完整性。HMAC在消息摘要算法基础上增加密钥输入，确保信息正确性。 #### 开发步骤 在调用update接口传入数据时，可以 一次性传入所有数据 ，也可以把数据人工分段，然后 分段update 。对于同一段数据而言，是否分段，计算结果没有差异。对于数据量较大的数据… [`references/消息认证码计算HMAC(ArkTS).md`](<references/消息认证码计算HMAC(ArkTS).md>)
- **消息认证码计算HMAC(C/C++)** — HMAC通过指定摘要算法，以通信双方共享密钥与消息作为输入，生成消息认证码用于检验传递报文的完整性。HMAC在消息摘要算法的基础上增加了密钥的输入，确保了信息的正确性。生成的消息认证码为固定长度。 #### 开发步骤 在调用update接口传入数据时，可以 一次性传入 ，也可以把数据人工 分段传入 。对于同一段数据而言，是否分段，计算结果没有差异。对于数据量… [`references/消息认证码计算HMAC(C_C++).md`](<references/消息认证码计算HMAC(C_C++).md>)
- **消息认证码计算介绍及算法规格** — MAC（Message Authentication Code，消息认证码）可以对消息进行完整性校验，通过使用双方共享的密钥，识别出信息伪装篡改等行为。 接下来将说明系统目前支持的算法及其对应的规格。 #### HMAC HMAC（Hash-based Message Authentication Code）是一种基于哈希的消息认证码算法。 HMAC通过指定… [`references/消息认证码计算介绍及算法规格.md`](<references/消息认证码计算介绍及算法规格.md>)
- **签名验签介绍及算法规格** — 当需要判断接收的数据是否被篡改、数据是否为指定对象发送的数据时，可以使用签名验签操作。 接下来将说明系统目前支持的算法及其对应的规格。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/53/v3/eDQyj0IbR6apRxs6rvnciA… [`references/签名验签介绍及算法规格.md`](<references/签名验签介绍及算法规格.md>)
- **跨平台数据兼容实践指导** — 开发者可以参考以下开发实践，学习相关场景开发，在HarmonyOS平台上更高效、准确地开发加解密的功能。 #### 加解密跨平台数据兼容性开发实践 为确保数据安全，在数据传输过程中对数据进行加解密操作至关重要。为确保跨平台数据兼容，实现加密和解密操作在不同环境下的一致性和互操作性，同样极为关键。加解密跨平台数据兼容性开发实践将从以下两方面讲解如何适配差异： … [`references/跨平台数据兼容实践指导.md`](<references/跨平台数据兼容实践指导.md>)
- **随机生成对称密钥(ArkTS)** — 以AES和SM4为例，随机生成对称密钥（SymKey），并获得二进制数据。 对称密钥对象可用于后续加解密操作，二进制数据可用于存储或传输。 #### 随机生成AES密钥 对应的算法规格请查看 对称密钥生成和转换规格：AES 。 1. 调用 cryptoFramework.createSymKeyGenerator ，指定字符串参数'AES256'，创建密钥算… [`references/随机生成对称密钥(ArkTS).md`](<references/随机生成对称密钥(ArkTS).md>)
- **随机生成对称密钥(C/C++)** — 以AES和SM4为例，随机生成对称密钥（OH_CryptoSymKey）。 对称密钥对象可用于后续加解密操作，二进制数据可用于存储或传输。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 随机生成AES密钥 对应的算法规格请查看 对称密钥生成和转换规格… [`references/随机生成对称密钥(C_C++).md`](<references/随机生成对称密钥(C_C++).md>)
- **随机生成非对称密钥对(ArkTS)** — 以RSA和SM2为例，随机生成非对称密钥对（KeyPair），并获得二进制数据。 非对称密钥对可用于后续加解密等操作，二进制数据可用于存储或传输。 #### 随机生成RSA密钥对 对应的算法规格请查看 非对称密钥生成和转换规格：RSA 。 1. 调用 cryptoFramework.createAsyKeyGenerator ，指定字符串参数'RSA1024… [`references/随机生成非对称密钥对(ArkTS).md`](<references/随机生成非对称密钥对(ArkTS).md>)
- **随机生成非对称密钥对(C/C++)** — 以RSA和SM2为例，随机生成非对称密钥对（OH_CryptoKeyPair），并获得二进制数据。 非对称密钥对可用于后续加解密等操作，二进制数据可用于存储或传输。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libohcrypto.so) #### 随机生成RSA密钥对 对应的算法规格请… [`references/随机生成非对称密钥对(C_C++).md`](<references/随机生成非对称密钥对(C_C++).md>)
- **非对称密钥加解密算法规格** — 本章说明系统支持的算法及其规格。 每种算法支持的加密模式在具体规格中介绍。 #### RSA RSA 为非对称加密算法，加密长度需要在固定长度进行，在实际应用中，如果数据量无法达到固定的长度要求，可以通过不同的填充模式进行数据填充。 算法库目前提供了RSA加解密常用的三种模式。 - NoPadding ：不带填充，输入的数据必须与RSA密钥字节长度一样长；输… [`references/非对称密钥加解密算法规格.md`](<references/非对称密钥加解密算法规格.md>)
- **非对称密钥生成和转换规格** — 当前章节说明系统支持的算法及其对应规格。密钥生成指定规格的方式有两种： - 字符串参数：以字符串的形式描述开发者需要生成的密钥规格。 - 密钥参数：使用密钥的详细密码学信息，构造密钥对象。 对于每种算法采用哪种方式，将会在具体的每个算法规格中介绍。 #### RSA RSA（Rivest–Shamir–Adleman），当前支持使用字符串参数和密钥参数两种方… [`references/非对称密钥生成和转换规格.md`](<references/非对称密钥生成和转换规格.md>)
