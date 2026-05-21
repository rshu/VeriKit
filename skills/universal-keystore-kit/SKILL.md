---
name: universal-keystore-kit
description: 提供统一的密钥管理服务，支持通过ArkTS和C/C++ API进行密钥生成、导入、加密解密、签名验签、密钥协商、HMAC/CMAC、密钥证明及访问控制。
---

## 功能说明

Universal Keystore Kit（密钥管理服务，HUKS）向应用提供各类密钥的统一安全操作能力，涵盖密钥管理全生命周期。核心功能包括密钥生成/销毁、密钥导入（明文导入、安全导入、数字信封导入）、密钥证明、密钥协商、密钥派生、加密/解密、签名/验签、HMAC/CMAC以及密钥访问控制等。HUKS支持ArkTS和C/C++两种API。

HUKS管理的密钥在具备安全环境（TEE）的设备上，其明文仅在安全环境中进行访问操作，确保密钥安全。HUKS架构分为SDK层、服务层和核心层三大部分，其中核心层承载密钥的密码学运算、明文密钥加解密和密钥访问控制等核心功能。

此外，HUKS还提供加密导出导入密钥、群组密钥管理、外部密钥管理扩展（Provider机制）、CryptoExtensionAbility扩展能力、Ukey PIN码认证以及应用真实性证明等高级功能，满足企业级安全需求。

## 使用场景

当你的应用需要对敏感数据进行加密存储或传输时使用本Kit，例如加密用户密码、保护本地文件、实现安全通信等场景。当需要使用数字签名验证数据完整性或身份认证时，应使用签名/验签能力。

当应用需要基于用户身份认证（人脸、指纹、口令）来控制密钥访问权限时，HUKS提供了与User Authentication Kit联动的密钥访问控制能力。当需要在应用端和服务器端之间进行安全密钥协商、派生会话密钥时，也应使用本Kit的相关能力。

## 典型场景

- 如何生成AES、RSA、ECC等不同算法类型的密钥？
- 如何使用明文导入、安全导入或数字信封方式导入外部密钥？
- 如何使用AES或RSA进行数据的加密和解密操作？
- 如何使用密钥对数据进行签名和验签？
- 如何使用ECDH进行密钥协商，或使用HKDF进行密钥派生？
- 如何配置基于用户身份认证的密钥访问控制？
- 如何进行密钥证明以验证密钥的合法性？
- 如何查询密钥是否存在、获取密钥属性、导出和删除密钥？
- 如何使用HMAC和CMAC进行消息认证码计算？
- 如何集成外部密钥管理Provider和使用CryptoExtensionAbility？

## 使用指南

**重要提示：** 本Kit的references目录下包含大量详细参考文档。在查询时，请根据用户的具体问题，仅加载references中与问题相关的MD文件进行阅读，不要一次性加载所有文件，以免上下文过长影响回答质量。先通过标题和描述判断哪些文件与当前问题相关，再针对性地读取。

## 参考文档

### 简介

- [Universal Keystore Kit简介](references/Universal%20Keystore%20Kit%E7%AE%80%E4%BB%8B.md) - 介绍HUKS整体架构、核心功能和与相关Kit的关系
- [本地密钥管理基础概念](references/%E6%9C%AC%E5%9C%B0%E5%AF%86%E9%92%A5%E7%AE%A1%E7%90%86%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5.md) - 介绍TEE、密钥材料格式、密钥对材料格式等基础概念
- [密钥使用介绍及通用流程](references/%E5%AF%86%E9%92%A5%E4%BD%BF%E7%94%A8%E4%BB%8B%E7%BB%8D%E5%8F%8A%E9%80%9A%E7%94%A8%E6%B5%81%E7%A8%8B.md) - 介绍密钥使用的通用流程
- [个人数据处理说明](references/%E4%B8%AA%E4%BA%BA%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86%E8%AF%B4%E6%98%8E.md) - 列举HUKS处理的个人数据清单及数据控制指导

### 密钥生成

- [密钥生成介绍及算法规格](references/%E5%AF%86%E9%92%A5%E7%94%9F%E6%88%90%E4%BB%8B%E7%BB%8D%E5%8F%8A%E7%AE%97%E6%B3%95%E8%A7%84%E6%A0%BC.md) - 介绍密钥生成的算法规格和支持的算法
- [生成密钥(ArkTS)](references/%E7%94%9F%E6%88%90%E5%AF%86%E9%92%A5(ArkTS).md) - 介绍使用ArkTS接口生成密钥的开发指导
- [生成密钥(C/C++)](references/%E7%94%9F%E6%88%90%E5%AF%86%E9%92%A5(C_C%2B%2B).md) - 介绍使用C/C++接口生成密钥的开发指导

### 密钥导入

- [密钥导入介绍及算法规格](references/%E5%AF%86%E9%92%A5%E5%AF%BC%E5%85%A5%E4%BB%8B%E7%BB%8D%E5%8F%8A%E7%AE%97%E6%B3%95%E8%A7%84%E6%A0%BC.md) - 介绍密钥导入的算法规格和支持的导入方式
- [明文导入密钥(ArkTS)](references/%E6%98%8E%E6%96%87%E5%AF%BC%E5%85%A5%E5%AF%86%E9%92%A5(ArkTS).md) - 介绍使用ArkTS接口明文导入密钥
- [明文导入密钥(C/C++)](references/%E6%98%8E%E6%96%87%E5%AF%BC%E5%85%A5%E5%AF%86%E9%92%A5(C_C%2B%2B).md) - 介绍使用C/C++接口明文导入密钥
- [安全导入密钥(ArkTS)](references/%E5%AE%89%E5%85%A8%E5%AF%BC%E5%85%A5%E5%AF%86%E9%92%A5(ArkTS).md) - 介绍使用ArkTS接口安全导入密钥
- [安全导入密钥(C/C++)](references/%E5%AE%89%E5%85%A8%E5%AF%BC%E5%85%A5%E5%AF%86%E9%92%A5(C_C%2B%2B).md) - 介绍使用C/C++接口安全导入密钥
- [数字信封导入密钥(ArkTS)](references/%E6%95%B0%E5%AD%97%E4%BF%A1%E5%B0%81%E5%AF%BC%E5%85%A5%E5%AF%86%E9%92%A5(ArkTS).md) - 介绍使用ArkTS接口数字信封方式导入密钥
- [数字信封密钥(C/C++)](references/%E6%95%B0%E5%AD%97%E4%BF%A1%E5%B0%81%E5%AF%86%E9%92%A5(C_C%2B%2B).md) - 介绍使用C/C++接口数字信封方式导入密钥

### 加密/解密

- [加密/解密介绍及算法规格](references/%E5%8A%A0%E5%AF%86_%E8%A7%A3%E5%AF%86%E4%BB%8B%E7%BB%8D%E5%8F%8A%E7%AE%97%E6%B3%95%E8%A7%84%E6%A0%BC.md) - 介绍加解密算法规格和支持的算法
- [加解密(ArkTS)](references/%E5%8A%A0%E8%A7%A3%E5%AF%86(ArkTS).md) - 介绍使用ArkTS接口进行加解密的开发指导
- [加解密(C/C++)](references/%E5%8A%A0%E8%A7%A3%E5%AF%86(C_C%2B%2B).md) - 介绍使用C/C++接口进行加解密的开发指导

### 签名/验签

- [签名/验签介绍及算法规格](references/%E7%AD%BE%E5%90%8D_%E9%AA%8C%E7%AD%BE%E4%BB%8B%E7%BB%8D%E5%8F%8A%E7%AE%97%E6%B3%95%E8%A7%84%E6%A0%BC.md) - 介绍签名验签的算法规格
- [签名/验签(ArkTS)](references/%E7%AD%BE%E5%90%8D_%E9%AA%8C%E7%AD%BE(ArkTS).md) - 介绍使用ArkTS接口进行签名验签的开发指导
- [签名/验签(C/C++)](references/%E7%AD%BE%E5%90%8D_%E9%AA%8C%E7%AD%BE(C_C%2B%2B).md) - 介绍使用C/C++接口进行签名验签的开发指导
- [签名/验签介绍及算法规格（补充）](references/%E7%AD%BE%E5%90%8D_%E9%AA%8C%E7%AD%BE%E4%BB%8B%E7%BB%8D%E5%8F%8A%E7%AE%97%E6%B3%95%E8%A7%84%E6%A0%BC-1.md) - 签名验签算法规格补充说明
- [签名/验签(ArkTS)（补充）](references/%E7%AD%BE%E5%90%8D_%E9%AA%8C%E7%AD%BE(ArkTS)-1.md) - ArkTS接口签名验签的补充开发指导
- [签名/验签(C/C++)（补充）](references/%E7%AD%BE%E5%90%8D_%E9%AA%8C%E7%AD%BE(C_C%2B%2B)-1.md) - C/C++接口签名验签的补充开发指导

### 密钥派生

- [密钥派生介绍及算法规格](references/%E5%AF%86%E9%92%A5%E6%B4%BE%E7%94%9F%E4%BB%8B%E7%BB%8D%E5%8F%8A%E7%AE%97%E6%B3%95%E8%A7%84%E6%A0%BC.md) - 介绍密钥派生的算法规格
- [密钥派生(ArkTS)](references/%E5%AF%86%E9%92%A5%E6%B4%BE%E7%94%9F(ArkTS).md) - 介绍使用ArkTS接口进行密钥派生的开发指导
- [密钥派生(C/C++)](references/%E5%AF%86%E9%92%A5%E6%B4%BE%E7%94%9F(C_C%2B%2B).md) - 介绍使用C/C++接口进行密钥派生的开发指导

### 密钥协商

- [密钥协商介绍及算法规格](references/%E5%AF%86%E9%92%A5%E5%8D%8F%E5%95%86%E4%BB%8B%E7%BB%8D%E5%8F%8A%E7%AE%97%E6%B3%95%E8%A7%84%E6%A0%BC.md) - 介绍密钥协商的算法规格
- [密钥协商(ArkTS)](references/%E5%AF%86%E9%92%A5%E5%8D%8F%E5%95%86(ArkTS).md) - 介绍使用ArkTS接口进行密钥协商的开发指导
- [密钥协商(C/C++)](references/%E5%AF%86%E9%92%A5%E5%8D%8F%E5%95%86(C_C%2B%2B).md) - 介绍使用C/C++接口进行密钥协商的开发指导

### HMAC/CMAC

- [HMAC介绍及算法规格](references/HMAC%E4%BB%8B%E7%BB%8D%E5%8F%8A%E7%AE%97%E6%B3%95%E8%A7%84%E6%A0%BC.md) - 介绍HMAC的算法规格
- [HMAC(ArkTS)](references/HMAC(ArkTS).md) - 介绍使用ArkTS接口进行HMAC的开发指导
- [HMAC(C/C++)](references/HMAC(C_C%2B%2B).md) - 介绍使用C/C++接口进行HMAC的开发指导
- [CMAC(ArkTS)](references/CMAC(ArkTS).md) - 介绍使用ArkTS接口进行CMAC的开发指导
- [CMAC(C/C++)](references/CMAC(C_C%2B%2B).md) - 介绍使用C/C++接口进行CMAC的开发指导

### 密钥管理

- [查询密钥是否存在(ArkTS)](references/%E6%9F%A5%E8%AF%A2%E5%AF%86%E9%92%A5%E6%98%AF%E5%90%A6%E5%AD%98%E5%9C%A8(ArkTS).md) - 介绍使用ArkTS接口查询密钥是否存在
- [查询密钥是否存在(C/C++)](references/%E6%9F%A5%E8%AF%A2%E5%AF%86%E9%92%A5%E6%98%AF%E5%90%A6%E5%AD%98%E5%9C%A8(C_C%2B%2B).md) - 介绍使用C/C++接口查询密钥是否存在
- [查询密钥别名集(ArkTS)](references/%E6%9F%A5%E8%AF%A2%E5%AF%86%E9%92%A5%E5%88%AB%E5%90%8D%E9%9B%86(ArkTS).md) - 介绍使用ArkTS接口查询密钥别名集合
- [查询密钥别名集(C/C++)](references/%E6%9F%A5%E8%AF%A2%E5%AF%86%E9%92%A5%E5%88%AB%E5%90%8D%E9%9B%86(C_C%2B%2B).md) - 介绍使用C/C++接口查询密钥别名集合
- [获取密钥属性(ArkTS)](references/%E8%8E%B7%E5%8F%96%E5%AF%86%E9%92%A5%E5%B1%9E%E6%80%A7(ArkTS).md) - 介绍使用ArkTS接口获取密钥属性
- [获取密钥属性(C/C++)](references/%E8%8E%B7%E5%8F%96%E5%AF%86%E9%92%A5%E5%B1%9E%E6%80%A7(C_C%2B%2B).md) - 介绍使用C/C++接口获取密钥属性
- [密钥导出(ArkTS)](references/%E5%AF%86%E9%92%A5%E5%AF%BC%E5%87%BA(ArkTS).md) - 介绍使用ArkTS接口导出密钥
- [密钥导出(C/C++)](references/%E5%AF%86%E9%92%A5%E5%AF%BC%E5%87%BA(C_C%2B%2B).md) - 介绍使用C/C++接口导出密钥
- [密钥删除(ArkTS)](references/%E5%AF%86%E9%92%A5%E5%88%A0%E9%99%A4(ArkTS).md) - 介绍使用ArkTS接口安全删除密钥
- [密钥删除(C/C++)](references/%E5%AF%86%E9%92%A5%E5%88%A0%E9%99%A4(C_C%2B%2B).md) - 介绍使用C/C++接口安全删除密钥

### 加密导出导入

- [加密导出导入密钥介绍](references/%E5%8A%A0%E5%AF%86%E5%AF%BC%E5%87%BA%E5%AF%BC%E5%85%A5%E5%AF%86%E9%92%A5%E4%BB%8B%E7%BB%8D.md) - 介绍加密导出导入密钥的整体方案
- [加密导出导入密钥(ArkTS)](references/%E5%8A%A0%E5%AF%86%E5%AF%BC%E5%87%BA%E5%AF%BC%E5%85%A5%E5%AF%86%E9%92%A5(ArkTS).md) - 介绍使用ArkTS接口进行加密导出导入密钥
- [加密导出导入密钥(C/C++)](references/%E5%8A%A0%E5%AF%86%E5%AF%BC%E5%87%BA%E5%AF%BC%E5%85%A5%E5%AF%86%E9%92%A5(C_C%2B%2B).md) - 介绍使用C/C++接口进行加密导出导入密钥

### 密钥证明

- [密钥证明介绍及算法规格](references/%E5%AF%86%E9%92%A5%E8%AF%81%E6%98%8E%E4%BB%8B%E7%BB%8D%E5%8F%8A%E7%AE%97%E6%B3%95%E8%A7%84%E6%A0%BC.md) - 介绍密钥证明的算法规格说明
- [匿名密钥证明(ArkTS)](references/%E5%8C%BF%E5%90%8D%E5%AF%86%E9%92%A5%E8%AF%81%E6%98%8E(ArkTS).md) - 介绍使用ArkTS接口进行匿名密钥证明
- [匿名密钥证明(C/C++)](references/%E5%8C%BF%E5%90%8D%E5%AF%86%E9%92%A5%E8%AF%81%E6%98%8E(C_C%2B%2B).md) - 介绍使用C/C++接口进行匿名密钥证明

### 访问控制

- [用户身份认证访问控制简介](references/%E7%94%A8%E6%88%B7%E8%BA%AB%E4%BB%BD%E8%AE%A4%E8%AF%81%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6%E7%AE%80%E4%BB%8B.md) - 介绍基于用户身份认证的密钥访问控制概述
- [用户身份认证访问控制开发指导](references/%E7%94%A8%E6%88%B7%E8%BA%AB%E4%BB%BD%E8%AE%A4%E8%AF%81%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC.md) - 介绍用户身份认证访问控制的开发指导
- [细粒度用户身份认证访问控制开发指导](references/%E7%BB%86%E7%B2%92%E5%BA%A6%E7%94%A8%E6%88%B7%E8%BA%AB%E4%BB%BD%E8%AE%A4%E8%AF%81%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC.md) - 介绍细粒度访问控制的开发指导

### 群组密钥

- [群组密钥介绍](references/%E7%BE%A4%E7%BB%84%E5%AF%86%E9%92%A5%E4%BB%8B%E7%BB%8D.md) - 介绍群组密钥管理概念
- [群组密钥(ArkTS)](references/%E7%BE%A4%E7%BB%84%E5%AF%86%E9%92%A5(ArkTS).md) - 介绍使用ArkTS接口进行群组密钥开发
- [群组密钥(C/C++)](references/%E7%BE%A4%E7%BB%84%E5%AF%86%E9%92%A5(C_C%2B%2B).md) - 介绍使用C/C++接口进行群组密钥开发

### 应用端与服务器端开发

- [应用端开发](references/%E5%BA%94%E7%94%A8%E7%AB%AF%E5%BC%80%E5%8F%91.md) - 介绍应用端开发指导
- [应用端开发（补充）](references/%E5%BA%94%E7%94%A8%E7%AB%AF%E5%BC%80%E5%8F%91-1.md) - 应用端开发指导补充说明
- [服务器端开发](references/%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E5%BC%80%E5%8F%91.md) - 介绍服务器端开发指导
- [服务器端开发（补充）](references/%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E5%BC%80%E5%8F%91-1.md) - 服务器端开发指导补充说明

### 应用真实性证明

- [应用真实性证明简介](references/%E5%BA%94%E7%94%A8%E7%9C%9F%E5%AE%9E%E6%80%A7%E8%AF%81%E6%98%8E%E7%AE%80%E4%BB%8B.md) - 介绍应用真实性证明概念
- [验证应用请求真实性集成设计实践](references/%E9%AA%8C%E8%AF%81%E5%BA%94%E7%94%A8%E8%AF%B7%E6%B1%82%E7%9C%9F%E5%AE%9E%E6%80%A7%E9%9B%86%E6%88%90%E8%AE%BE%E8%AE%A1%E5%AE%9E%E8%B7%B5.md) - 介绍验证应用请求真实性的集成设计实践

### CryptoExtensionAbility

- [CryptoExtensionAbility扩展能力介绍](references/CryptoExtensionAbility%E6%89%A9%E5%B1%95%E8%83%BD%E5%8A%9B%E4%BB%8B%E7%BB%8D.md) - 介绍CryptoExtensionAbility扩展框架
- [CryptoExtensionAbility适配开发指导](references/CryptoExtensionAbility%E9%80%82%E9%85%8D%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC.md) - 介绍CryptoExtensionAbility的适配开发指导

### 通用查询与资源管理

- [通用查询介绍及规格](references/%E9%80%9A%E7%94%A8%E6%9F%A5%E8%AF%A2%E4%BB%8B%E7%BB%8D%E5%8F%8A%E8%A7%84%E6%A0%BC.md) - 介绍通用查询能力
- [通用查询(ArkTS)](references/%E9%80%9A%E7%94%A8%E6%9F%A5%E8%AF%A2(ArkTS).md) - 介绍使用ArkTS接口进行通用查询
- [通用查询(C/C++)](references/%E9%80%9A%E7%94%A8%E6%9F%A5%E8%AF%A2(C_C%2B%2B).md) - 介绍使用C/C++接口进行通用查询
- [资源管理介绍及规格](references/%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E4%BB%8B%E7%BB%8D%E5%8F%8A%E8%A7%84%E6%A0%BC.md) - 介绍资源管理能力
- [打开资源/关闭资源(C/C++)](references/%E6%89%93%E5%BC%80%E8%B5%84%E6%BA%90_%E5%85%B3%E9%97%AD%E8%B5%84%E6%BA%90(C_C%2B%2B).md) - 介绍使用C/C++接口打开和关闭资源

### 外部密钥管理

- [外部密钥管理扩展简介](references/%E5%A4%96%E9%83%A8%E5%AF%86%E9%92%A5%E7%AE%A1%E7%90%86%E6%89%A9%E5%B1%95%E7%AE%80%E4%BB%8B.md) - 介绍外部密钥管理扩展框架
- [Provider管理介绍及规格](references/Provider%E7%AE%A1%E7%90%86%E4%BB%8B%E7%BB%8D%E5%8F%8A%E8%A7%84%E6%A0%BC.md) - 介绍Provider管理能力
- [注册/注销Provider(ArkTS)](references/%E6%B3%A8%E5%86%8C_%E6%B3%A8%E9%94%80Provider(ArkTS).md) - 介绍使用ArkTS接口注册和注销Provider
- [注册/注销Provider(C/C++)](references/%E6%B3%A8%E5%86%8C_%E6%B3%A8%E9%94%80Provider(C_C%2B%2B).md) - 介绍使用C/C++接口注册和注销Provider

### Ukey

- [Ukey PIN码认证介绍及规格](references/Ukey%20PIN%E7%A0%81%E8%AE%A4%E8%AF%81%E4%BB%8B%E7%BB%8D%E5%8F%8A%E8%A7%84%E6%A0%BC.md) - 介绍Ukey PIN码认证能力
- [查询认证状态(ArkTS)](references/%E6%9F%A5%E8%AF%A2%E8%AE%A4%E8%AF%81%E7%8A%B6%E6%80%81(ArkTS).md) - 介绍使用ArkTS接口查询认证状态
- [查询认证状态(C/C++)](references/%E6%9F%A5%E8%AF%A2%E8%AE%A4%E8%AF%81%E7%8A%B6%E6%80%81(C_C%2B%2B).md) - 介绍使用C/C++接口查询认证状态
- [Ukey流程示例指导](references/Ukey%E6%B5%81%E7%A8%8B%E7%A4%BA%E4%BE%8B%E6%8C%87%E5%AF%BC.md) - 介绍Ukey完整使用流程示例

<!-- verikit:references-index -->

## References / 参考文档索引

_Auto-generated by VeriKit from this Kit's reference manifest — `77` document(s) shipped under `references/`. Each link points at a real file in the plugin tree; load any with the agent's file-read tool._

- **CMAC(ArkTS)** — CMAC是基于对称密钥分组加密算法的消息认证码（Cipher-based Message Authentication Code），目前支持3DES加密算法的消息认证方法。 仅支持在智能穿戴设备（Wearable）使用。 #### 开发步骤 **生成密钥** 1. 获取生成密钥算法参数配置。 2. 调用 generateKeyItem 生成密钥，支持的规格是… [`references/CMAC(ArkTS).md`](<references/CMAC(ArkTS).md>)
- **CMAC(C/C++)** — CMAC是基于对称密钥分组加密算法的消息认证码（Cipher-based Message Authentication Code），目前支持3DES加密算法的消息认证方法。 仅支持在智能穿戴设备（Wearable）使用。 #### 开发步骤 **生成密钥** 1. 获取生成密钥算法参数配置。 2. 调用 OH_Huks_GenerateKeyItem 生成密… [`references/CMAC(C_C++).md`](<references/CMAC(C_C++).md>)
- **CryptoExtensionAbility扩展能力介绍** — CryptoExtensionAbility是Stage模型中扩展组件 ExtensionAbility 的派生类。 CryptoExtensionAbility给驱动厂商提供外部密钥管理扩展能力所需接口定义，包括打开/关闭资源、PIN码认证、签名验签、导出证书等接口。 CryptoExtensionAbility可以隔离底层硬件（Ukey驱动）厂商实现差异… [`references/CryptoExtensionAbility扩展能力介绍.md`](<references/CryptoExtensionAbility扩展能力介绍.md>)
- **CryptoExtensionAbility适配开发指导** — 本文档旨在指导驱动厂商如何继承实现 CryptoExtensionAbility 需要的接口能力，此处给出实现参考，其他实现依照业务需要依次调用driver封装的底层驱动函数。 在DevEco Studio工程中手动新建一个CryptoExtensionAbility组件，具体步骤如下： 1. 在工程Module对应的ets目录下，右键选择“New > Di… [`references/CryptoExtensionAbility适配开发指导.md`](<references/CryptoExtensionAbility适配开发指导.md>)
- **HMAC(ArkTS)** — HMAC是密钥相关的哈希运算消息认证码（Hash-based Message Authentication Code）。具体的场景介绍及支持的算法规格，请参考 HMAC介绍及算法规格 。 #### 开发步骤 **生成密钥** 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。 2. 初始化密钥属性集。 3. 调用 generateKeyIt… [`references/HMAC(ArkTS).md`](<references/HMAC(ArkTS).md>)
- **HMAC(C/C++)** — HMAC是密钥相关的哈希运算消息认证码（Hash-based Message Authentication Code）。具体的场景介绍及支持的算法规格，请参考 HMAC介绍及算法规格 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) #### 开发步骤 *… [`references/HMAC(C_C++).md`](<references/HMAC(C_C++).md>)
- **HMAC介绍及算法规格** — MAC（Message Authentication Code）提供了一种在不可靠介质上检验传输或存储信息完整性的方法，HMAC是密钥相关的哈希运算消息认证码（Hash-based Message Authentication Code），是一种基于Hash函数和密钥进行消息认证的方法。HMAC可以与任何加密哈希函数（例如SHA256、SM3等）结合使用，H… [`references/HMAC介绍及算法规格.md`](<references/HMAC介绍及算法规格.md>)
- **Provider管理介绍及规格** — HUKS提供外部密钥管理扩展能力（简称Ukey Extension）注册和注销接口。三方驱动HAP检测到Ukey存在时，调用Provider注册接口，将驱动HAP应用提供的外部密钥管理能力注册到系统中来。当检测到所有Ukey被拔出时，通过调用Provider注销接口，将其提供的外部密钥管理能力从系统中注销。 1. Provider名称建议包含厂商信息，全局唯… [`references/Provider管理介绍及规格.md`](<references/Provider管理介绍及规格.md>)
- **Ukey PIN码认证介绍及规格** — PIN（Personal Identification Number）码是Ukey设备的安全访问凭证，采用“硬件设备+PIN码”的双因子认证模式。用户必须同时拥有物理Ukey设备和正确的PIN码才能访问设备内的密钥材料。 PIN码作用如下： 1. 防暴力破解：连续错误输入达到一定次数（与驱动应用实现的外部密钥管理扩展能力相关）后自动锁定。 2. 硬件级安全：… [`references/Ukey PIN码认证介绍及规格.md`](<references/Ukey PIN码认证介绍及规格.md>)
- **Ukey流程示例指导** — 当前针对双向SSL认证场景，通常有以下两种开发模式。 #### 浏览器使用系统ArkWeb能力并自定义客户端 1. 端侧应用调用证书管理能力，拉起证书选择弹框，等待用户选择证书，获得 keyUri 作为resourceId。 2. 端侧应用监听PIN认证回调，处理事件，调用证书管理能力拉起PIN认证弹窗。 3. 此时证书管理会返回认证结果给端侧应用，端侧应用… [`references/Ukey流程示例指导.md`](<references/Ukey流程示例指导.md>)
- **Universal Keystore Kit简介** — Universal Keystore Kit（密钥管理服务，下述简称为HUKS）向业务/应用提供各类密钥的统一安全操作能力，包括密钥管理（密钥生成/销毁、密钥导入、密钥证明、密钥协商、密钥派生）及密钥使用（加密/解密、签名/验签、访问控制）等功能。 HUKS管理的密钥可以由业务/应用导入或调用HUKS的接口生成。同时，HUKS提供了密钥访问控制能力，确保存储… [`references/Universal Keystore Kit简介.md`](<references/Universal Keystore Kit简介.md>)
- **个人数据处理说明** — 华为是数据处理者，不是数据控制者，数据使用目的和方式由开发者决定。 此文档针对华为作为最终用户数据处理者，开发者作为最终用户数据控制者的数据处理进行说明，包括： - 华为处理的个人数据清单 - 指导开发者如何帮助最终用户实现对数据的控制 #### 华为处理的个人数据清单 #### 指导开发者如何帮助最终用户实现对数据的控制 开发者通过HUKS获取的用户数据，… [`references/个人数据处理说明.md`](<references/个人数据处理说明.md>)
- **加密/解密介绍及算法规格** — 在HUKS中已经有密钥，需要对一段数据加密或是解密，均可以使用HUKS完成加密/解密操作。 从API 23开始支持 群组密钥 特性。 #### 支持的算法 以下为密钥加密/解密支持的规格说明。 **手机、平板、PC/2in1设备、TV、智能穿戴规格** **轻量级智能穿戴规格** [`references/加密_解密介绍及算法规格.md`](<references/加密_解密介绍及算法规格.md>)
- **加密导出导入密钥(ArkTS)** — 从API 20开始，支持加密导出导入密钥。 当前指导提供以下加密导出导入密钥示例： - 加密导出导入密钥(ArkTS) - 开发步骤 - 开发案例 - 加密导出导入普通密钥 - 普通密钥导入为群组密钥 #### 开发步骤 1. 初始化生成密钥属性集，需要设置 HUKS_TAG_IS_ALLOWED_WRAP ，指定密钥允许导出。 2. 调用 generate… [`references/加密导出导入密钥(ArkTS).md`](<references/加密导出导入密钥(ArkTS).md>)
- **加密导出导入密钥(C/C++)** — 从API 20开始，支持加密导出导入密钥。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) #### 开发步骤 1. 初始化生成密钥属性集，需要设置 OH_HUKS_TAG_IS_ALLOWED_WRAP ，指定密钥允许导出。 2. 调用 OH_Huks_G… [`references/加密导出导入密钥(C_C++).md`](<references/加密导出导入密钥(C_C++).md>)
- **加密导出导入密钥介绍** — 为支持应用在卸载后仍能保留密钥，从API 20开始，HUKS新增了加密导出密钥与加密导入密钥的功能。 由于应用卸载时，其在HUKS中存储的密钥会被清除，通过加密导出导入密钥功能，开发者可在应用卸载前将密钥加密导出保存，并在应用重新安装后将加密密钥导入恢复，从而实现应用卸载后保留密钥。 - 仅在手机、平板、PC/2in1、智能穿戴上支持加密导出导入密钥功能。 … [`references/加密导出导入密钥介绍.md`](<references/加密导出导入密钥介绍.md>)
- **加解密(ArkTS)** — 以AES128、RSA2048、SM2和DES64为例，完成加解密。具体的场景介绍及支持的算法规格，请参考 加解密支持的算法 。 #### 开发步骤 **生成密钥** 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。 2. 初始化密钥属性集。 3. 调用 generateKeyItem 生成密钥，具体请参考 密钥生成 。 除此之外，开发者… [`references/加解密(ArkTS).md`](<references/加解密(ArkTS).md>)
- **加解密(C/C++)** — 以AES256、RSA1024、SM2和DES64为例，完成加解密。具体的场景介绍及支持的算法规格，请参考 加解密支持的算法 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) #### 开发步骤 **生成密钥** 1. 指定密钥别名，密钥别名命名规范参考 … [`references/加解密(C_C++).md`](<references/加解密(C_C++).md>)
- **匿名密钥证明(ArkTS)** — 在使用本功能时，需确保网络通畅。 #### 开发步骤 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。 2. 初始化参数集。 HuksOptions 中的properties字段中的参数必须包含 HUKS_TAG_ATTESTATION_CHALLENGE 属性,可选参数包含 HUKS_TAG_ATTESTATION_ID_VERSION… [`references/匿名密钥证明(ArkTS).md`](<references/匿名密钥证明(ArkTS).md>)
- **匿名密钥证明(C/C++)** — 在使用本功能时，需确保网络通畅。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) #### 开发步骤 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。 2. 初始化参数集：通过 OH_Huks_InitParamSet 、 OH_Huks… [`references/匿名密钥证明(C_C++).md`](<references/匿名密钥证明(C_C++).md>)
- **外部密钥管理扩展简介** — HUKS提供统一的Ability扩展接口，驱动HAP可基于此实现外部密钥管理扩展，注册、注销自定义的硬件密钥管理模块，满足金融领域Ukey证书的浏览器双向SSL认证等场景的身份认证需求。 Ukey：USB key，基于USB接口的硬件设备，可用于存储用户私钥、证书及身份认证等信息。 本指南将介绍应用如何基于Ukey证书的浏览器双向SSL认证等场景，完成身份认… [`references/外部密钥管理扩展简介.md`](<references/外部密钥管理扩展简介.md>)
- **安全导入密钥(ArkTS)** — 以安全导入ECDH密钥对为例，涉及业务侧加密密钥的 密钥生成 、 协商 等操作不在本示例中体现。 具体的场景介绍及支持的算法规格，请参考 密钥导入支持的算法 。 #### 开发步骤 1. 设备A（导入设备）将待导入密钥转换成 HUKS密钥材料格式 To_Import_Key（仅针对非对称密钥，若待导入密钥是对称密钥则可省略此步骤）。 2. 设备B（被导入设备… [`references/安全导入密钥(ArkTS).md`](<references/安全导入密钥(ArkTS).md>)
- **安全导入密钥(C/C++)** — 以安全导入ECDH密钥对为例，涉及业务侧加密密钥的 密钥生成 、 协商 等操作不在本示例中体现。 具体的场景介绍及支持的算法规格，请参考 密钥导入支持的算法 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) #### 开发步骤 1. 设备A（导入设备）将待… [`references/安全导入密钥(C_C++).md`](<references/安全导入密钥(C_C++).md>)
- **密钥使用介绍及通用流程** — 为了实现对数据机密性、完整性等保护，可使用生成/导入的密钥，对数据进行密钥操作，比如： - 加密/解密 。 - 签名/验签 。 - 密钥协商 。 - 密钥派生 。 本章节提供了以上常用密钥操作的示例，这部分示例均没有设置二次身份访问控制，如设置了密钥访问控制请参考 用户身份认证访问控制 。 从API 23开始支持 群组密钥 特性。 #### 通用开发流程 H… [`references/密钥使用介绍及通用流程.md`](<references/密钥使用介绍及通用流程.md>)
- **密钥删除(ArkTS)** — 为保证数据安全性，当不需要使用该密钥时，应该删除密钥。 从API 23开始支持 群组密钥 特性。 #### 开发步骤 以删除DH密钥为例。 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。 2. 初始化密钥属性集。用于删除时指定密钥的属性，删除单个密钥或者非群组密钥，可传空。 3. 调用接口 deleteKeyItem ，删除密钥。 /*… [`references/密钥删除(ArkTS).md`](<references/密钥删除(ArkTS).md>)
- **密钥删除(C/C++)** — 为保证数据安全性，当不需要使用该密钥时，应该删除密钥。 从API 23开始支持 群组密钥 特性。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) #### 开发步骤 以删除ECC密钥为例。 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。… [`references/密钥删除(C_C++).md`](<references/密钥删除(C_C++).md>)
- **密钥协商(ArkTS)** — 以X25519，DH和ECDH三个协商密钥类型为例，在密钥由HUKS管理的情况下，完成密钥协商。具体的场景介绍及支持的算法规格，请参考 密钥协商支持的算法 。 #### 开发步骤 **生成密钥** 设备A、设备B各自生成一个非对称密钥，具体请参考 密钥生成 或 密钥导入 。 密钥生成时，可指定参数 HUKS_TAG_DERIVED_AGREED_KEY_ST… [`references/密钥协商(ArkTS).md`](<references/密钥协商(ArkTS).md>)
- **密钥协商(C/C++)** — 以X25519、DH和ECDH协商密钥类型为例，在密钥由HUKS管理的情况下，完成密钥协商。具体的场景介绍及支持的算法规格，请参考 密钥协商支持的算法 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) #### 开发步骤 **生成密钥** 设备A、设备B各… [`references/密钥协商(C_C++).md`](<references/密钥协商(C_C++).md>)
- **密钥协商介绍及算法规格** — 为了避免恶意第三方获取到保密信息，密钥本身是不可以直接在设备间传输的。一般情况下，会采取密钥协商的方式，安全地在双方（或多方）间共享密钥。密钥协商只会传输密钥的公钥部分，私钥仍存留在设备内，以保护数据的安全性和机密性。 两台设备间进行密钥协商，双方各准备一个非对称密钥，并互换非对称密钥的公钥，以对端公钥与己端私钥协商出一个密钥，该密钥在两台设备相同。 - 轻… [`references/密钥协商介绍及算法规格.md`](<references/密钥协商介绍及算法规格.md>)
- **密钥导入介绍及算法规格** — 如果业务在HUKS外部生成密钥（比如应用间协商生成、服务器端生成），业务可以将密钥导入到HUKS中由HUKS进行管理。密钥一旦导入到HUKS中，在密钥的生命周期内，其明文仅在安全环境中进行访问操作，不会传递出安全环境。 密钥导入的方式包含明文导入和安全导入两种方式。 使用现有密钥别名作为导入的密钥别名会把现有密钥覆盖。 从API 23开始支持 群组密钥 特性… [`references/密钥导入介绍及算法规格.md`](<references/密钥导入介绍及算法规格.md>)
- **密钥导出(ArkTS)** — 业务需要获取持久化存储的非对称密钥的公钥时使用，当前支持ECC/RSA/ED25519/X25519/SM2的公钥导出。 轻量级智能穿戴仅支持RSA公钥导出。 从API 23开始支持 群组密钥 特性。 #### 开发步骤 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。 2. 调用接口 exportKeyItem ，传入参数keyAlia… [`references/密钥导出(ArkTS).md`](<references/密钥导出(ArkTS).md>)
- **密钥导出(C/C++)** — 业务需要获取持久化存储的非对称密钥的公钥时使用，当前支持ECC/RSA/ED25519/X25519/SM2的公钥导出。 轻量级智能穿戴仅支持RSA公钥导出。 从API 23开始支持 群组密钥 特性。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) ####… [`references/密钥导出(C_C++).md`](<references/密钥导出(C_C++).md>)
- **密钥派生(ArkTS)** — 以PBKDF2和HKDF256密钥为例，完成密钥派生。具体的场景介绍及支持的算法规格，请参考 密钥派生支持的算法 。 #### 开发步骤 **生成密钥** 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。 2. 初始化密钥属性集，可指定参数HUKS_TAG_DERIVED_AGREED_KEY_STORAGE_FLAG（可选），用于标识基… [`references/密钥派生(ArkTS).md`](<references/密钥派生(ArkTS).md>)
- **密钥派生(C/C++)** — 以HKDF256和PBKDF2密钥为例，完成密钥派生。具体的场景介绍及支持的算法规格，请参考 密钥派生支持的算法 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) #### 开发步骤 **生成密钥** 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍… [`references/密钥派生(C_C++).md`](<references/密钥派生(C_C++).md>)
- **密钥派生介绍及算法规格** — 在密码学中，密钥派生函数（Key derivation function，KDF）使用伪随机函数从诸如主密码或密码的秘密值中派生出一个或多个密钥。 - 在HUKS中只能通过HUKS托管的密钥进行密钥派生。 - 轻量级智能穿戴不支持密钥派生功能。 - 使用现有密钥别名作为派生结果密钥别名会把现有密钥覆盖。 从API 23开始支持 群组密钥 特性。 #### 支… [`references/密钥派生介绍及算法规格.md`](<references/密钥派生介绍及算法规格.md>)
- **密钥生成介绍及算法规格** — 当业务需要使用HUKS生成随机密钥，并由HUKS进行安全保存时，可以调用HUKS的接口生成密钥。 - 密钥别名长度最大为128字节。 - 密钥别名中禁止包含个人数据等敏感信息。不建议包含加密算法、密钥长度、加密模式等信息。 - 使用当前业务已有的密钥别名作为生成的密钥别名默认会把现有密钥覆盖，可以使用HUKS_TAG_KEY_OVERRIDE指定当密钥别名冲… [`references/密钥生成介绍及算法规格.md`](<references/密钥生成介绍及算法规格.md>)
- **密钥证明介绍及算法规格** — HUKS为密钥提供合法性证明能力，主要应用于非对称密钥的公钥的证明。 基于PKI证书链技术，HUKS可以为存储在HUKS中的非对称密钥对的公钥签发证书，证明其公钥的合法性。业务可以通过系统提供的根CA证书，逐级验证HUKS签发的密钥证明证书，来确保证书中的公钥以及对应的私钥，确实来自合法的硬件设备，且存储管理在HUKS中。 - 当调用方为系统服务且APL等级… [`references/密钥证明介绍及算法规格.md`](<references/密钥证明介绍及算法规格.md>)
- **应用真实性证明简介** — 您可以利用应用真实性证明能力在服务器验证来自应用的请求，具体包括验证请求是否源自真实应用、真实设备，以及请求内容是否未经篡改。 为方便您理解此功能的应用场景，提高接入效率，特此更新该文档，原《设备真实性证明》文档更改为《应用真实性证明》。 #### 基础概念 - 应用公私钥对：用于验证应用请求真实性的非对称算法密钥对，包含应用公钥和应用私钥，比如RSA、EC… [`references/应用真实性证明简介.md`](<references/应用真实性证明简介.md>)
- **应用端开发** — 接口能力由 Universal Keystore Kit 提供，涉及的功能指导请参考： - Universal Keystore Kit简介 - 查询密钥是否存在(ArkTS) - 查询密钥是否存在(C/C++) - 生成密钥(ArkTS) - 生成密钥(C/C++) - 匿名密钥证明(ArkTS) - 匿名密钥证明(C/C++) - 签名/验签(ArkTS… [`references/应用端开发-1.md`](<references/应用端开发-1.md>)
- **应用端开发** — 接口能力由 Universal Keystore Kit 提供，涉及的功能指导请参考： - Universal Keystore Kit简介 - 查询密钥是否存在(ArkTS) - 查询密钥是否存在(C/C++) - 生成密钥(ArkTS) - 生成密钥(C/C++) - 匿名密钥证明(ArkTS) - 匿名密钥证明(C/C++) - 签名/验签(ArkTS… [`references/应用端开发.md`](<references/应用端开发.md>)
- **打开资源/关闭资源(C/C++)** — 从API 22开始，huksExternalCrypto提供打开/关闭资源功能接口。应用在密钥操作之前（密钥操作、通用操作、PIN码认证等），需要先调用 OH_Huks_OpenResource 打开资源。打开资源需要获取resourceId，resourceId通过调用证书管理系统能力提供的 证书选择接口 获取。 #### 在CMake脚本中链接相关动态库… [`references/打开资源_关闭资源(C_C++).md`](<references/打开资源_关闭资源(C_C++).md>)
- **数字信封密钥(C/C++)** — 从API 23开始支持 数字信封 特性。 以数字信封导入RSA密钥和AES密钥为例。具体的场景介绍及支持的算法规格，请参考 密钥导入支持的算法 ，其中 **数字信封导入密钥不支持DSA算法** 。 使用数字信封导入密钥需要使用 OH_HUKS_TAG_UNWRAP_ALGORITHM_SUITE ，该标签值为 OH_HUKS_UNWRAP_SUITE_SM2… [`references/数字信封密钥(C_C++).md`](<references/数字信封密钥(C_C++).md>)
- **数字信封导入密钥(ArkTS)** — 从API 23开始支持 数字信封 特性。 以数字信封导入RSA密钥和AES密钥为例。具体的场景介绍及支持的算法规格，请参考 密钥导入支持的算法 ，其中 **数字信封导入密钥不支持DSA算法** 。 使用数字信封导入密钥需要使用 HUKS_TAG_UNWRAP_ALGORITHM_SUITE 标签，该标签值为 HUKS_UNWRAP_SUITE_SM2_SM4… [`references/数字信封导入密钥(ArkTS).md`](<references/数字信封导入密钥(ArkTS).md>)
- **明文导入密钥(ArkTS)** — 分别以导入AES256、RSA2048和X25519密钥为例。具体的场景介绍及支持的算法规格，请参考 密钥导入支持的算法 。 #### 开发步骤 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。 2. 封装密钥属性集和密钥材料。 - 密钥属性集同样与密钥生成中指定的密钥属性一致，须包含HuksKeyAlg、HuksKeySize、Huks… [`references/明文导入密钥(ArkTS).md`](<references/明文导入密钥(ArkTS).md>)
- **明文导入密钥(C/C++)** — 以明文导入ECC密钥为例。具体的场景介绍及支持的算法规格，请参考 密钥导入支持的算法 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) #### 开发步骤 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。 2. 封装密钥属性集和密钥材料… [`references/明文导入密钥(C_C++).md`](<references/明文导入密钥(C_C++).md>)
- **服务器端开发** — 使用应用公钥对业务请求进行验签的前提是服务器已经完成对密钥证明证书链进行校验和保存应用公钥，相关开发指南请参考： - 对密钥证明证书链进行校验 - 保存应用公钥 #### 使用应用公钥对业务请求进行验签 应用服务器首先校验挑战值Challenge，然后根据应用公钥ID查找应用公钥。 安全建议：如果应用服务器在保存应用公钥时关联了用户ID，在使用应用公钥对业务… [`references/服务器端开发-1.md`](<references/服务器端开发-1.md>)
- **服务器端开发** — 您的应用服务器接收到来自应用的请求，其中包含的密钥证明证书链采用X509标准格式，证书链（证书数组）中的第一本证书为 **密钥证明证书** ，最后一本证书为根CA证书，中间的为子CA证书。 应用服务器对密钥证明证书链的校验步骤如下： 1. 使用官网提供的可信的根CA证书对证书链合法性进行校验。（ 根CA证书下载地址 ） 请勿在应用服务器中使用子CA证书对密钥… [`references/服务器端开发.md`](<references/服务器端开发.md>)
- **本地密钥管理基础概念** — 在使用通用密钥库完成应用开发前，开发者需要了解以下相关概念，以下概念将贯穿整个开发过程。 #### 可信执行环境（TEE） 可信执行环境（Trusted Execution Environment），简称TEE，是存在于智能手机、平板或任意移动设备主处理器中的一个安全区域，确保各种敏感数据在一个可信环境中被存储、处理和受到保护。TEE为授权安全软件，也称为“… [`references/本地密钥管理基础概念.md`](<references/本地密钥管理基础概念.md>)
- **查询密钥别名集(ArkTS)** — HUKS提供了接口供应用查询密钥别名集。 轻量级智能穿戴不支持查询密钥别名集功能。 从API 23开始支持 群组密钥 特性。 #### 开发步骤 1. 初始化密钥属性集，用于查询指定密钥别名集TAG。TAG仅支持 HUKS_TAG_AUTH_STORAGE_LEVEL 。 2. 调用接口 listAliases ，查询密钥别名集。 /* * 以下查询密钥别名… [`references/查询密钥别名集(ArkTS).md`](<references/查询密钥别名集(ArkTS).md>)
- **查询密钥别名集(C/C++)** — HUKS提供了接口供应用查询密钥别名集。 轻量级智能穿戴不支持查询密钥别名集功能。 从API 23开始支持 群组密钥 特性。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) #### 开发步骤 1. 初始化密钥属性集。用于查询指定密钥别名集TAG，TAG仅支… [`references/查询密钥别名集(C_C++).md`](<references/查询密钥别名集(C_C++).md>)
- **查询密钥是否存在(ArkTS)** — HUKS提供了接口供应用查询指定密钥是否存在。 从API 23开始支持 群组密钥 特性。 #### 开发步骤 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。 2. 初始化密钥属性集。用于查询时指定密钥的属性，查询单个密钥或者非群组密钥，可传空。 3. 调用接口 hasKeyItem ，查询密钥是否存在。 import { huks } … [`references/查询密钥是否存在(ArkTS).md`](<references/查询密钥是否存在(ArkTS).md>)
- **查询密钥是否存在(C/C++)** — HUKS提供了接口供应用查询指定密钥是否存在。 从API 23开始支持 群组密钥 特性。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) #### 开发步骤 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。 2. 初始化密钥属性集。用于查… [`references/查询密钥是否存在(C_C++).md`](<references/查询密钥是否存在(C_C++).md>)
- **查询认证状态(ArkTS)** — 从API 22开始，huksExternalCrypto提供PIN码认证状态查询功能接口。应用可以通过该接口查询PIN码是否认证通过。具体的场景介绍及规格，请参考 Ukey PIN码认证介绍及规格 。 #### 开发步骤 1. 通过证书管理系统能力提供的 证书选择接口 获取 keyUri ，并将其作为resourceId。 2. 调用查询认证状态接口 get… [`references/查询认证状态(ArkTS).md`](<references/查询认证状态(ArkTS).md>)
- **查询认证状态(C/C++)** — 从API 22开始，huksExternalCrypto提供PIN码认证状态查询功能接口。应用可以通过该接口查询PIN码是否认证通过。具体的场景介绍及规格，请参考 Ukey PIN码认证介绍及规格 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so libhu… [`references/查询认证状态(C_C++).md`](<references/查询认证状态(C_C++).md>)
- **注册/注销Provider(ArkTS)** — 从API 22开始，huksExternalCrypto提供Provider注册和注销功能接口。 #### 注册Provider #### 开发步骤 1. 构造注册参数，需要传入 HUKS_EXT_CRYPTO_TAG_ABILITY_NAME 。 2. 调用注册接口 registerProvider 。 #### 开发案例 import { huksExt… [`references/注册_注销Provider(ArkTS).md`](<references/注册_注销Provider(ArkTS).md>)
- **注册/注销Provider(C/C++)** — 从API 22开始，huksExternalCrypto提供Provider注册和注销功能接口。 #### 注册Provider #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so libhuks_external_crypto.z.so) #### 开发步骤 1… [`references/注册_注销Provider(C_C++).md`](<references/注册_注销Provider(C_C++).md>)
- **生成密钥(ArkTS)** — 以DH算法为例，生成随机密钥。具体的场景介绍及支持的算法规格，请参考 密钥生成支持的算法 。 密钥别名中禁止包含个人数据等敏感信息。 #### 开发步骤 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍及算法规格 。 2. 初始化密钥属性集。 - 通过HuksParam封装密钥属性，搭配Array组成密钥属性集，并赋值给HuksOptions中的pro… [`references/生成密钥(ArkTS).md`](<references/生成密钥(ArkTS).md>)
- **生成密钥(C/C++)** — 以ECC算法为例，生成随机密钥。具体的场景介绍及支持的算法规格，请参考 密钥生成支持的算法 。 密钥别名中禁止包含个人数据等敏感信息。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) #### 开发步骤 1. 指定密钥别名，密钥别名命名规范参考 密钥生成介绍… [`references/生成密钥(C_C++).md`](<references/生成密钥(C_C++).md>)
- **用户身份认证访问控制开发指导** — 场景介绍及相关概念说明请参考 用户身份认证访问控制简介 。 #### 开发步骤 #### 生成密钥 指定指纹访问控制类型及相关属性。 生成或导入密钥时，在密钥属性集中需指定三个参数：用户认证类型 HuksUserAuthType 、授权访问类型 HuksAuthAccessType 、挑战值类型 HuksChallengeType 。 #### 开发案例 i… [`references/用户身份认证访问控制开发指导.md`](<references/用户身份认证访问控制开发指导.md>)
- **用户身份认证访问控制简介** — HUKS提供了完备的密钥访问控制能力，以保证存储在HUKS中的密钥被合法正确地访问： - 业务只能访问属于自己的密钥，即只能访问业务自身通过HUKS生成或导入的密钥。 - 支持密钥的用户身份认证访问控制，对于高安全级别、保护敏感数据的业务密钥，需要在使用密钥的时候，再次要求用户即时地验证锁屏密码或生物特征，验证通过后，才能使用业务密钥。 - 支持严格限制密钥… [`references/用户身份认证访问控制简介.md`](<references/用户身份认证访问控制简介.md>)
- **签名/验签(ArkTS)** — 当前指导提供以下示例，供开发者参考完成签名、验签开发： - 密钥算法为ECC256、摘要算法为SHA256，请见开发案例：ECC256/SHA256 - 密钥算法为SM2、摘要算法为SM3，请见开发案例：SM2/SM3 - 密钥算法为SM2、摘要算法为NoDigest，请见开发案例：SM2/NoDigest - 密钥算法为RSA、摘要算法为SHA256、填充… [`references/签名_验签(ArkTS)-1.md`](<references/签名_验签(ArkTS)-1.md>)
- **签名/验签(ArkTS)** — 当前指导提供以下示例，供开发者参考完成签名、验签开发： - 密钥算法为RSA、摘要算法为SHA256、填充模式为PSS 具体的场景介绍及支持的算法规格，请参考 签名/验签介绍及算法规格 。 #### 开发步骤 **签名** 1. 通过证书管理系统能力提供的 证书选择接口 获取 keyUri 作为resourceId，并作为密钥别名， 打开资源 后完成PIN码… [`references/签名_验签(ArkTS).md`](<references/签名_验签(ArkTS).md>)
- **签名/验签(C/C++)** — 当前指导提供以下示例，供开发者参考完成签名、验签开发： - 密钥算法为ECC256、摘要算法为SHA256，请见开发案例：ECC256/SHA256 - 密钥算法为SM2、摘要算法为SM3，请见开发案例：SM2/SM3 - 密钥算法为SM2、摘要算法为NoDigest，请见开发案例：SM2/NoDigest - 密钥算法为RSA、摘要算法为SHA256、填充… [`references/签名_验签(C_C++)-1.md`](<references/签名_验签(C_C++)-1.md>)
- **签名/验签(C/C++)** — 以密钥算法为RSA、摘要算法为SHA384、填充模式为PSS的密钥为例，完成签名、验签： - 密钥算法为RSA、摘要算法为SHA384、填充模式为PSS 具体的场景介绍及支持的算法规格，请参考 签名/验签介绍及算法规格 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk… [`references/签名_验签(C_C++).md`](<references/签名_验签(C_C++).md>)
- **签名/验签介绍及算法规格** — 为实现数据完整性保护和防抵赖，可使用生成/导入的密钥，对数据进行签名验签操作。 从API 23开始支持 群组密钥 特性。 #### 支持的算法 以下为密钥签名/验签支持的规格说明。 **手机、平板、PC/2in1设备、TV、智能穿戴规格** **轻量级智能穿戴规格** **智能穿戴设备规格** #### 携带认证信息的签名类型 适用场景：当使用含有数字盾密码… [`references/签名_验签介绍及算法规格-1.md`](<references/签名_验签介绍及算法规格-1.md>)
- **签名/验签介绍及算法规格** — Ukey PIN码认证之后，应用可以通过resourceId操作对应密钥执行签名操作。该能力通过HUKS提供的三段式接口实现，应用指定相应的算法参数即可(包括算法类型，目的，填充，摘要等)。 1. 通过HUKS_TAG_KEY_CLASS指定是外部密钥管理扩展中管理的密钥。 2. 三段式操作执行相关的签名操作过程中，keyAlias参数需指定为resourc… [`references/签名_验签介绍及算法规格.md`](<references/签名_验签介绍及算法规格.md>)
- **细粒度用户身份认证访问控制开发指导** — 细粒度用户身份认证访问控制是基于已有用户身份认证访问控制的扩展，提供了基于生物特征和锁屏密码二次身份认证的细粒度访问控制能力，允许设置密钥在加密、解密、签名、验签、密钥协商、密钥派生的单个或多个场景时是否需要进行身份验证。 比如，业务需要使用HUKS密钥加密保存账号密码信息等数据，要求在加密的时候不进行指纹等身份认证，解密的时候需要进行指纹等身份认证，这时就… [`references/细粒度用户身份认证访问控制开发指导.md`](<references/细粒度用户身份认证访问控制开发指导.md>)
- **群组密钥(ArkTS)** — 从API 23开始，HUKS支持群组密钥功能。群组密钥支持的HUKS密钥操作及详细介绍参考 群组密钥介绍 ，本文档以 AES/CBC/PKCS7加解密 、 X25519非对称密钥协商 、 PBKDF2派生密钥 为例展示群组密钥使用方法。 **配置文件** 使用群组密钥之前，需要在app.json5文件中配置群组信息，配置方法参考 配置文件示例 中assetA… [`references/群组密钥(ArkTS).md`](<references/群组密钥(ArkTS).md>)
- **群组密钥(C/C++)** — 从API 23开始，HUKS支持群组密钥功能。群组密钥支持的HUKS密钥操作及详细介绍参考 群组密钥介绍 ，本文档以 AES/CBC/PKCS7加解密 、 X25519非对称密钥协商 、 PBKDF2派生密钥 为例展示群组密钥使用方法。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libh… [`references/群组密钥(C_C++).md`](<references/群组密钥(C_C++).md>)
- **群组密钥介绍** — 从API 23开始，HUKS支持群组密钥功能，该功能是针对同一开发者开发的多个HAP应用，提供的跨应用密钥共享能力。 当多个HAP在配置中指定相同的组标识时，可共享同一组密钥资源，实现密钥在开发者自有应用生态内的安全复用，无需重复生成或手动传递密钥，简化跨应用加密场景的密钥管理流程。 - 仅在手机、平板、PC/2in1、智能穿戴上支持群组密钥功能。 - 群组… [`references/群组密钥介绍.md`](<references/群组密钥介绍.md>)
- **获取密钥属性(ArkTS)** — HUKS提供了接口供业务获取指定密钥的相关属性。在获取指定密钥属性前，需要确保已在HUKS中生成或导入持久化存储的密钥。 轻量级智能穿戴不支持获取密钥属性功能。 从API 23开始支持 群组密钥 特性。 #### 开发步骤 1. 指定待查询的密钥别名keyAlias，密钥别名最大长度为128字节。 2. 调用接口 getKeyItemProperties ，… [`references/获取密钥属性(ArkTS).md`](<references/获取密钥属性(ArkTS).md>)
- **获取密钥属性(C/C++)** — HUKS提供了接口供业务获取指定密钥的相关属性。在获取指定密钥属性前，需要确保已在HUKS中生成或导入持久化存储的密钥。 轻量级智能穿戴不支持获取密钥属性功能。 从API 23开始支持 群组密钥 特性。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so) ###… [`references/获取密钥属性(C_C++).md`](<references/获取密钥属性(C_C++).md>)
- **资源管理介绍及规格** — 约定外部密钥管理扩展（例如Ukey）中使用resourceId唯一标识资源。该resourceId目前支持通过 查询证书操作 返回。每个证书链对应1个resourceId。应用拿到resourceId后，需要 打开资源 ，然后才可以进行后续密钥操作。操作完成后需要 关闭资源 。 1. 操作密钥之前，必须先打开资源。如果涉及私钥签名等高权限操作，需要验证完PI… [`references/资源管理介绍及规格.md`](<references/资源管理介绍及规格.md>)
- **通用查询(ArkTS)** — 从API 22开始，huksExternalCrypto提供通用查询功能接口。该接口可以用于从UKey中获取设备标识、App标识以及其他通用属性信息，完成属性查询操作。具体的场景介绍请参考 获取属性介绍及规格 。 #### 开发步骤 **获取属性** 1. 通过证书管理系统能力提供的 证书选择接口 获取 keyUri 作为resourceId，并 打开资源 … [`references/通用查询(ArkTS).md`](<references/通用查询(ArkTS).md>)
- **通用查询(C/C++)** — 从API 22开始，huksExternalCrypto提供通用查询功能接口。从Ukey获取通用属性信息，完成属性查询操作。具体的场景介绍请参考 获取属性介绍及规格 。 #### 在CMake脚本中链接相关动态库 target_link_libraries(entry PUBLIC libhuks_ndk.z.so libhuks_external_cryp… [`references/通用查询(C_C++).md`](<references/通用查询(C_C++).md>)
- **通用查询介绍及规格** — HUKS提供属性查询接口，支持从外部密钥管理执行通用查询操作，例如Ukey设备信息、PIN码信息等。 1. OH_Huks_GetProperty接口和getProperty接口的resourceId是提供者的资源ID，用于标识要查询的远程资源，长度必须介于1-1024字节。接口的属性ID采用定义在 GMT 0016-2023 标准中的SKF函数名称，长度必… [`references/通用查询介绍及规格.md`](<references/通用查询介绍及规格.md>)
- **验证应用请求真实性集成设计实践** — 本文档提供了验证应用请求真实性的集成设计方案实践。 #### 创建密钥确立可信凭证流程 一个登录用户只进行一次创建密钥确立可信凭证流程，触发时机为用户登录成功。 1. **查询应用公私钥对是否存在** ：应用公私钥对的别名Alias取值：固定值“serviceKey”+ 用户ID。 如果应用公私钥对已存在，则说明用户在本设备曾经登录过，“创建密钥确立可信凭证… [`references/验证应用请求真实性集成设计实践.md`](<references/验证应用请求真实性集成设计实践.md>)
